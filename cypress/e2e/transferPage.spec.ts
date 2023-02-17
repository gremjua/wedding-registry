import { Gift } from '../../src/components/gifts/types';
import { TEST_COUPLE_SLUG } from '../support/constants';

describe('transfer page', () => {
	beforeEach(() => {
		cy.intercept('/api/email', { body: { data: 'success' } }).as('email');
	});
	it('should load all expected elements when there is no transfer data', () => {
		cy.visit('/testCouple/transfer');
		cy.get('.headerImage').should('not.be.visible');
		cy.get('[data-cy="errorMsgNoTransferData"]').should('be.visible');
		cy.get('[data-cy="chooseGiftButton"]').should('be.visible');
	});

	it('should load all expected elements when there is transfer data', () => {
		// TODO: use mocks in transfer page, or update context in a component test or similar
		cy.visit('/testCouple/giftTagging/money');
		const tag = 'this is a tag 123@A$%^!"\'';
		const name = 'this is my name';
		const email = 'test@test.com';
		const amount = '123';
		cy.get('#tag').type(tag);
		cy.get('#buyerName').type(name);
		cy.get('#email').type(email);
		cy.get('#amount').type(amount);
		cy.get('[data-cy="wireTransferButton"]').click();
		cy.get('[data-cy="transferPageAmountText"]').should('be.visible');
		cy.get('[data-cy="transferPageInstructionsText"]').should('be.visible');
		cy.get('[data-cy="transferPageConfirmButton"]').should('be.visible').click();
		cy.wait('@email').its('request').its('body.type').should('equal', 'GIFTER');
		cy.url().should('contain', '/transfer/confirm');
	});

	it('should clear cart on confirm - money transfer', () => {
		cy.task<Gift[]>('fetchItemsDB', TEST_COUPLE_SLUG).then(gifts => {
			const giftCart: Gift[] = [gifts[0], gifts[1], gifts[2]];
			cy.wrap(giftCart).as('giftCart');
			cy
				.window()
				.then(win =>
					win.localStorage.setItem('testCouple-giftCart', JSON.stringify(giftCart))
				);
			cy.visit('/testCouple/giftTagging/money');
		});
		const tag = 'this is a tag 123@A$%^!"\'';
		const name = 'this is my name';
		const email = 'test@test.com';
		const amount = '123';
		cy.get('#tag').type(tag);
		cy.get('#buyerName').type(name);
		cy.get('#email').type(email);
		cy.get('#amount').type(amount);
		cy.get('[data-cy="wireTransferButton"]').click();
		cy.get('[data-cy="transferPageAmountText"]').should('be.visible');
		cy.get('[data-cy="transferPageInstructionsText"]').should('be.visible');
		cy.get('[data-cy="transferPageConfirmButton"]').should('be.visible').click();
		cy.wait('@email');
		cy.get('[data-cy="uploadButton"]').should('be.visible');
		cy.getAllLocalStorage().then(result => {
			const baseUrl = Cypress.config().baseUrl || 'http://localhost:3000';
			const actualGiftCart = JSON.parse(
				result[baseUrl]['testCouple-giftCart'] as string
			) as Gift[];
			expect(actualGiftCart.length).to.equal(0);
		});
		cy.url().should('contain', '/transfer/confirm');
	});

	it('should clear cart on confirm - buying gifts', () => {
		cy.task<Gift[]>('fetchItemsDB', TEST_COUPLE_SLUG).then(gifts => {
			const giftCart: Gift[] = [gifts[0], gifts[1], gifts[2]];
			cy.wrap(giftCart).as('giftCart');
			cy
				.window()
				.then(win =>
					win.localStorage.setItem('testCouple-giftCart', JSON.stringify(giftCart))
				);
			cy.visit('/testCouple/giftTagging/cart');
		});
		const tag = 'this is a tag 123@A$%^!"\'';
		const name = 'this is my name';
		const email = 'test@test.com';
		cy.get('#tag').type(tag);
		cy.get('#buyerName').type(name);
		cy.get('#email').type(email);
		cy.get('[data-cy="wireTransferButton"]').click();
		cy.get('[data-cy="transferPageAmountText"]').should('be.visible');
		cy.get('[data-cy="transferPageInstructionsText"]').should('be.visible');
		cy.get('[data-cy="transferPageConfirmButton"]').should('be.visible').click();
		cy.wait('@email');
		cy.get('[data-cy="uploadButton"]').should('be.visible');
		cy.getAllLocalStorage().then(result => {
			const baseUrl = Cypress.config().baseUrl || 'http://localhost:3000';
			const actualGiftCart = JSON.parse(
				result[baseUrl]['testCouple-giftCart'] as string
			) as Gift[];
			expect(actualGiftCart.length).to.equal(0);
		});
		cy.url().should('contain', '/transfer/confirm');
	});
});
