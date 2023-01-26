import { Gift } from '../../src/components/gifts/types';
import { TEST_COUPLE_SLUG } from '../support/constants';

describe('gift tagging - cart - page', () => {
	beforeEach(() => {
		cy.visit('/testCouple/giftTagging/cart');
	});
	it('should load all expected elements', () => {
		cy.get('.headerImage').should('not.be.visible');
		cy.get('#tag').should('be.visible').should('have.text', '');
		cy.get('#buyerName').should('be.visible').and('have.value', '');
		cy.get('#email').should('be.visible').and('have.value', '');
		cy.get('#amount').should('be.visible').and('have.value', '');
		cy
			.get('[data-cy="wireTransferButton"]')
			.should('be.visible')
			.and('be.enabled');
		// TODO: test having mp = false, button should not be visible
		cy
			.get('[data-cy="mercadopagoButton"]')
			.should('be.visible')
			.and('be.enabled');
	});

	it.only('should have fillable fields and lead to appropriate payment pages', () => {
		// TODO: see if we should not be able to fill in amount if cart is empty
		const tag = 'this is a tag 123@A$%^!"\'';
		const name = 'this is my name';
		const email = 'test@test.com';
		const amount = '123';

		cy.get('#tag').type(tag);
		cy.get('#buyerName').type(name);
		cy.get('#email').type(email);
		cy.get('#amount').type(amount);

		cy.get('#tag').focus(); // focus on another element
		cy.get('#tag').should('have.text', tag);
		cy.get('#buyerName').should('have.value', name);
		cy.get('#email').should('have.value', email);
		cy.get('#amount').should('have.value', amount);

		// TODO: test multiple origin, go to mercadopago
		cy.get('[data-cy="wireTransferButton"]').click();
		cy.url().should('contain', '/transfer');
	});

	it('should load all expected elements when there is a cart in local storage', () => {
		let expectedAmount: number;
		cy.task<Gift[]>('fetchItemsDB', TEST_COUPLE_SLUG).then(gifts => {
			const giftCart: Gift[] = [gifts[0], gifts[1], gifts[2]];
			expectedAmount = giftCart.map(g => g.price).reduce((a, b) => a + b);
			cy
				.window()
				.then(win =>
					win.localStorage.setItem('testCouple-giftCart', JSON.stringify(giftCart))
				);
			cy.visit('/testCouple/giftTagging/cart');
			cy.get('#amount').should('have.value', `${expectedAmount}`);
		});
	});
});
