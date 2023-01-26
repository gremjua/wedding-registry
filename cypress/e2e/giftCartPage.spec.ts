import { Gift } from 'components/gifts/types';
import { TEST_COUPLE_SLUG } from '../support/constants';

describe('gift cart page', () => {
	it('should load all expected elements with no gifts in cart', () => {
		cy.visit('/testCouple/giftCart');
		cy.get('.headerImage').should('not.be.visible');
	});
	it('should load all expected elements with gifts in cart', () => {
		// TODO: use mocks instead, use local storage eventually
		cy.visit('/testCouple/gifts');
		cy.get('[data-cy="giftItem"]').first().click();
		cy.get('[data-cy="goToCartButton"]').click();
		// now in gift cart page
		cy.get('.headerImage').should('not.be.visible');
		cy.get('[data-cy="payButton"]').should('be.visible');
		cy.get('[data-cy="chooseGiftButton"]').should('be.visible');
	});

	describe('with gifts', () => {
		beforeEach(() => {
			cy.task<Gift[]>('fetchItemsDB', TEST_COUPLE_SLUG).then(gifts => {
				const giftCart: Gift[] = [gifts[0], gifts[1], gifts[2]];
				cy.wrap(giftCart).as('giftCart');
				cy
					.window()
					.then(win =>
						win.localStorage.setItem('testCouple-giftCart', JSON.stringify(giftCart))
					);
				cy.visit('/testCouple/giftCart');
			});
		});
		it('should load all expected elements with gifts in local storage', () => {
			cy.get<Gift[]>('@giftCart').then(giftCart => {
				cy.get('[data-cy="giftCartItem"]').should('have.length', giftCart.length);
			});
		});

		it('should remove gifts when clicking remove button', () => {
			cy.get('[data-cy="removeGiftButton"]').first().click();
			cy.get<Gift[]>('@giftCart').then(giftCart => {
				cy
					.get('[data-cy="giftCartItem"]')
					.should('have.length', giftCart.length - 1);
				cy.getAllLocalStorage().then(result => {
					const baseUrl = Cypress.config().baseUrl || 'http://localhost:3000';
					const actualGiftCart = JSON.parse(
						result[baseUrl]['testCouple-giftCart'] as string
					) as Gift[];
					expect(actualGiftCart.length).to.equal(giftCart.length - 1);
				});
			});
		});
	});
});
