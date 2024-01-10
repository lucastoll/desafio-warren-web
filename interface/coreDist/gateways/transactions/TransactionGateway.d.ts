import Transaction from '../../entities/transactions/transactions';
export interface ITransactionGateway {
    getTransactions(): Promise<Transaction[]>;
    getTransactionById(id: string): Promise<Transaction>;
}
export declare class ApiTransactionGateway implements ITransactionGateway {
    constructor();
    getTransactions(): Promise<Transaction[]>;
    getTransactionById(id: string): Promise<Transaction>;
}
