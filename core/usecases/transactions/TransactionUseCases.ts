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


	filterByStatus(transactions: Transaction[], status: string): Transaction[] {
		if (status != 'created' && status != 'processing' && status != 'processed') {
			throw new Error('Status must be created, processing or processed');
		}

		return transactions.filter(transaction => transaction.status === status);
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
