import axios from 'axios';
import Transaction from '../../entities/transactions/transactions';
import { baseURL } from '../../config';

const api = axios.create({
	baseURL: baseURL,
});

export interface ITransactionGateway {
	getTransactions(): Promise<Transaction[]>;
	getTransactionById(id: string): Promise<Transaction>;
}

export class ApiTransactionGateway implements ITransactionGateway {
	constructor(){}

	async getTransactions(): Promise<Transaction[]> {
		try {
			const response = await api.get('/transactions');
			return response.data;
		} catch (error: any) {
			throw new Error(`HTTP error! status: ${error.response?.status}`);
		}
	}

	async getTransactionById(id: string): Promise<Transaction> {
		try {
			const response = await api.get(`/transactions/${id}`);
			return response.data;
		} catch (error: any) {
			throw new Error(`HTTP error! status: ${error.response.status}`);
		}
	}
}
