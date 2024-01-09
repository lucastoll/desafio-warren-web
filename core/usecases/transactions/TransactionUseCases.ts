import axios from 'axios';
import Transaction from '../../entities/transactions/transactions';
import { baseURL } from '../../config';

const api = axios.create({
    baseURL: baseURL,
});

export default class TransactionUseCases {
    async get(): Promise<Transaction[]> {
        try {
            const response = await api.get('/transactions');
            return response.data;
        } catch (error: any) {
            throw new Error(`HTTP error! status: ${error.response.status}`);
        }
    }

    filterByStatus(transactions: Transaction[], status: string): Transaction[] {
        if(status != "created" && status != "processing" && status != "processed"){
            throw new Error("Status must be created, processing or processed")
        } 

        return transactions.filter(transaction => transaction.status === status);
    }
}