import Transaction from '../../entities/transactions/transactions';
import { ITransactionGateway } from '../../gateways/transactions/TransactionGateway';
export default class TransactionUseCases {
    private transactionGateway;
    private originalTransactions;
    constructor(transactionGateway: ITransactionGateway);
    get(): Promise<Transaction[]>;
    getById(id: string): Promise<Transaction>;
    filter(transactions: Transaction[], filterBy: string): Transaction[];
    filterByDate(transactions: Transaction[]): Transaction[];
    search(transactions: Transaction[], searchTerm: string): Transaction[];
}
