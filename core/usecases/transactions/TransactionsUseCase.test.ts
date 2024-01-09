import TransactionUseCases from './TransactionUseCases';
import { mockTransactions } from '../mocks/mockTransactions';
import nock from 'nock';
import { baseURL } from '../../config';

describe('TransactionUseCases', () => {
	let transactionUseCases: TransactionUseCases;

	beforeEach(() => {
		transactionUseCases = new TransactionUseCases();
	});

	describe('get', () => {
		it('should return transactions when the response is ok', async () => {
			nock(baseURL).get('/transactions').reply(200, mockTransactions);

			const transactions = await transactionUseCases.get();

			expect(transactions).toEqual(mockTransactions);
		});

		it('should throw an error when the response is not ok', async () => {
			nock(baseURL).get('/transactions').reply(400);

			await expect(transactionUseCases.get()).rejects.toThrow('HTTP error! status: 400');
		});
	});

	describe('getById', () => {
		it('should return the transaction with the given id', async () => {
			const id = '5f89f9f257fe42957bf6dbfd';
			nock(baseURL).get(`/transactions/${id}`).reply(200, mockTransactions[0]);
			const transaction = await transactionUseCases.getById(id);
			expect(transaction).toEqual(mockTransactions[0]);
		});
	});

	describe('filterByStatus', () => {
		it('should return transactions with the given status', () => {
			const transactions = transactionUseCases.filterByStatus(mockTransactions, 'created');

			expect(transactions.length).toBe(2);
			expect(transactions[0].status).toBe('created');
			expect(transactions[1].status).toBe('created');
		});

		it('should throw an error when the status is invalid', () => {
			expect(() => {
				transactionUseCases.filterByStatus(mockTransactions, 'invalid');
			}).toThrowError('Status must be created, processing or processed');
		});
	});

	describe('filterByDate', () => {
		it('should return transactions sorted by date', () => {
			const transactions = transactionUseCases.filterByDate(mockTransactions);

			expect(transactions[0].date).toBe('2018-12-22');
			expect(transactions[1].date).toBe('2017-07-23');
			expect(transactions[2].date).toBe('2016-08-25');
		});
	});

	describe('search', () => {
		it('should return transactions that match the search term', () => {
			const transactions = transactionUseCases.search(mockTransactions, 'Resgate');

			expect(transactions.length).toBe(1);
			expect(transactions[0].title).toBe('Resgate');
		});
	});
});
