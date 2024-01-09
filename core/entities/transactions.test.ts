import Transaction from './transactions';

describe('Transaction entity', () => {
	const transaction = new Transaction(
		'1',
		'Test transaction',
		'Test description',
		'completed',
		100,
		'2021-12-01',
		'Account A',
		'Account B',
	);

	it('should create a transaction with given values', () => {
		expect(transaction.id).toBeDefined();
        expect(transaction.title).toBe('Test transaction');
		expect(transaction.description).toBe('Test description');
		expect(transaction.status).toBe('completed');
		expect(transaction.amount).toBe(100);
		expect(transaction.date).toBe('2021-12-01');
		expect(transaction.from).toBe('Account A');
		expect(transaction.to).toBe('Account B');
	});

	it('should throw an error for empty ID on set', () => {
		expect(() => {
			transaction.id = '';
		}).toThrowError('Property ID cannot be empty');
	});

    it('should throw an error for empty description on set', () => {
		expect(() => {
			transaction.description = '';
		}).toThrowError('Property description cannot be empty');
	});

    it('should throw an error for empty title on set', () => {
		expect(() => {
			transaction.title = '';
		}).toThrowError('Property title cannot be empty');
	});

    it('should throw an error for empty status on set', () => {
		expect(() => {
			transaction.status = '';
		}).toThrowError('Property status cannot be empty');
	});

    it('should throw an error for empty date on set', () => {
		expect(() => {
			transaction.date = '';
		}).toThrowError('Property date cannot be empty');
	});

    it('should throw an error for dates not in the YYYY-MM-DD format', () => {
		expect(() => {
			transaction.date = '09-01-2024';
		}).toThrowError('Invalid date format. Expected format: YYYY-MM-DD');
	});

    it('should throw an error for empty from on set', () => {
		expect(() => {
			transaction.from = '';
		}).toThrowError('Property from cannot be empty');
	});

    it('should throw an error for empty to on set', () => {
		expect(() => {
			transaction.to = '';
		}).toThrowError('Property to cannot be empty');
	});

    it('should throw an error for amounts equal or less than 0 on set', () => {
		expect(() => {
			transaction.amount = 0;
		}).toThrowError('Property amount cannot be less than or equal to 0');
	});
});
