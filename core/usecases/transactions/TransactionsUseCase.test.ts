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
    
            await expect(transactionUseCases.get()).rejects.toThrow(
                'HTTP error! status: 400',
            );
        });
    })

    describe('filterByStatus', () => {
        it('should return transactions with the given status', () => {
            const transactions = transactionUseCases.filterByStatus(
                mockTransactions,
                'created',
            );
    
            expect(transactions.length).toBe(2);
            expect(transactions[0].status).toBe('created');
            expect(transactions[1].status).toBe('created');
        });

        it('should throw an error when the status is invalid', () => {
            expect(() => {
                transactionUseCases.filterByStatus(mockTransactions, 'invalid');
            }).toThrowError('Status must be created, processing or processed');
        });
    })
});
