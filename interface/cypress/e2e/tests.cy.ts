import { mockTransactions } from '../mocks/mockTransaction';

describe('HeaderWarren', () => {
	beforeEach(() => {
		cy.visit('/');
	});

	it('should render the header', () => {
		cy.get('header.header').should('be.visible');
	});

	it('should render the logo', () => {
		cy.get('header.header > img.header__logo').should('be.visible');
	});

	it('should have correct alt text for the logo', () => {
		cy.get('header.header > img.header__logo').should('have.attr', 'alt').and('equal', 'Warren investimentos');
	});
});

describe('TransactionTable', () => {
	beforeEach(() => {
		cy.visit('/');
	});

	it('renders the table when there are transactions', () => {
		cy.get('.transactions__table').should('be.visible');
	});

	describe('Modal', () => {
		it('opens a modal when a transaction is clicked', () => {
			cy.get('.transactions__table tbody tr').first().click();
			cy.get('.transactions__overlay').should('be.visible');
		});

		it('closes the modal when the overlay is clicked', () => {
			cy.get('.transactions__table tbody tr').first().click();
			cy.get('.transactions__overlay').should('be.visible');
			cy.get('.transactions__overlay').click(0, 0);
			cy.get('.transactions__overlay').should('not.exist');
		});

		it('closes the modal when the close button is clicked', () => {
			cy.get('.transactions__table tbody tr').first().click();
			cy.get('.transactions__overlay').should('be.visible');
			cy.get('.transactions__overlay__modal__button').click();
			cy.get('.transactions__overlay').should('not.exist');
		});

		it('closes the modal when the escape key is pressed', () => {
			cy.get('.transactions__table tbody tr').first().click();
			cy.get('body').trigger('keydown', { key: 'Escape' });
			cy.get('.transactions__overlay').should('not.exist');
		});

		it('focuses the close button when after opening the modal', () => {
			cy.get('.transactions__table tbody tr').first().click();
			cy.get('.transactions__overlay').should('be.visible');
			cy.get('.transactions__overlay__modal__button').focus();
			cy.get('.transactions__overlay__modal__button').should('have.focus');
		});
	});

	describe('Filters', () => {
		it('renders the search bar and select filter', () => {
			cy.get('.transactions__filters__searchBar').should('be.visible');
			cy.get('.transactions__filters__selectFilter').should('be.visible');
		});

		it('accepts input in the search bar', () => {
			const inputText = 'Test input';
			cy.get('.transactions__filters__searchBar').type(inputText);
			cy.get('.transactions__filters__searchBar').should('have.value', inputText);
		});

		it('accepts changes in the select filter', () => {
			const filterValue = 'date';
			cy.get('.transactions__filters__selectFilter').select(filterValue);
			cy.get('.transactions__filters__selectFilter').should('have.value', filterValue);
		});

		it('updates the UI correctly when a filter is applied', () => {
			const filterValue = 'processed';
			cy.intercept('GET', '/api/transactions', mockTransactions);
			cy.get('.transactions__filters__selectFilter').select(filterValue);
			const expectedTransactions = 1;
			cy.get('.transactions__table tbody tr').should('have.length', expectedTransactions);
		});

		it('updates the UI correctly when a search is applied', () => {
			const searchValue = 'Resgate';
			cy.intercept('GET', '/api/transactions', mockTransactions);
			cy.get('.transactions__filters__searchBar').type(searchValue);
			cy.get('.transactions__filters__searchBar').should('have.value', searchValue);
			const expectedTransactions = 1;
			cy.get('.transactions__table tbody tr').should('have.length', expectedTransactions);
		});
	});
});
