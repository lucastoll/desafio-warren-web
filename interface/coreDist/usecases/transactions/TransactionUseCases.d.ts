import Transaction from '../../entities/transactions/transactions';
import { ITransactionGateway } from '../../gateways/transactions/TransactionGateway';
export default class TransactionUseCases {
    private transactionGateway;
    constructor(transactionGateway: ITransactionGateway);
    get(): Promise<Transaction[]>;
    getById(id: string): Promise<Transaction>;
    filterByStatus(transactions: Transaction[], status: string): Transaction[];
    filterByDate(transactions: Transaction[]): Transaction[];
    search(transactions: Transaction[], searchTerm: string): Transaction[];
}
