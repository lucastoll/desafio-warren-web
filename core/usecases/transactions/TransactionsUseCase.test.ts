import TransactionUseCases from './TransactionUseCases';
import { mockTransactions } from '../mocks/mockTransactions';
import nock from 'nock';
import { baseURL } from '../../config';

describe('TransactionUseCases', () => {
	let transactionUseCases: TransactionUseCases;

	beforeEach(() => {
		transactionUseCases = new TransactionUseCases();
	});

	it('should return transactions when the response is ok', async () => {
		nock(baseURL).get('/transactions').reply(200, mockTransactions);

		const transactions = await transactionUseCases.getTransactions();

		expect(transactions).toEqual(mockTransactions);
	});

    it('should throw an error when the response is not ok', async () => {
        nock(baseURL).get('/transactions').reply(400);

        await expect(transactionUseCases.getTransactions()).rejects.toThrow(
            'HTTP error! status: 400',
        );
    });
});
