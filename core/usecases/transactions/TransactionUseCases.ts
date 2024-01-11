import Transaction from '../../entities/transactions/transactions';
import { ITransactionGateway } from '../../gateways/transactions/TransactionGateway';

export default class TransactionUseCases {
	private originalTransactions: Transaction[] = [];

	constructor(private transactionGateway: ITransactionGateway) {}

    async get(): Promise<Transaction[]> {
		this.originalTransactions = await this.transactionGateway.getTransactions();
        return [...this.originalTransactions];
    }

    async getById(id: string): Promise<Transaction> {
        return this.transactionGateway.getTransactionById(id);
    }


	filter(transactions: Transaction[], filterBy: string): Transaction[] {
		if (filterBy != 'created' && filterBy != 'processing' && filterBy != 'processed' && filterBy != "date" && filterBy != "none") {
			throw new Error('Filterby must be created, processing, processed, date or none');
		}

		if(filterBy == "date"){
			return transactions.sort((a, b) => {
				return new Date(b.date).getTime() - new Date(a.date).getTime();
			});
		}else if(filterBy == "none"){
			return transactions;
		}else{
			return transactions.filter(transaction => transaction.status === filterBy);
		}

	}

	filterByDate(transactions: Transaction[]): Transaction[] {
		return transactions.sort((a, b) => {
			return new Date(b.date).getTime() - new Date(a.date).getTime();
		});
	}

	search(transactions: Transaction[], searchTerm: string): Transaction[] {
		if (searchTerm.trim() === "") {
            return [...this.originalTransactions];
        }

		return transactions.filter(transaction => {
			return (
				transaction.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
				transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
			);
		});
	}
}
