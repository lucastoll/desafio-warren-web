import Transaction from './transactions';

describe('Transaction entity', () => {
	it('should create a transaction with given values', () => {
		const transaction = new Transaction();
		transaction.id = 1;
		transaction.description = 'Test transaction';
		transaction.status = 'completed';
		transaction.amount = 100;
		transaction.date = '2021-12-01';
		transaction.from = 'Account A';
		transaction.to = 'Account B';
        
		expect(transaction.id).toBe(1);
		expect(transaction.description).toBe('Test transaction');
		expect(transaction.status).toBe('completed');
		expect(transaction.amount).toBe(100);
		expect(transaction.date).toBe('2021-12-01');
		expect(transaction.from).toBe('Account A');
		expect(transaction.to).toBe('Account B');
	});
});
