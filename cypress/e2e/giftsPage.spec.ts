import { Gift } from 'components/gifts/types';
import { numberToPriceString } from 'utils/price';
import { TEST_COUPLE_SLUG } from '../support/constants';

describe('gifts page', () => {
	beforeEach(() => {
		cy.visit(`/${TEST_COUPLE_SLUG}/gifts`);
	});
	it('should load all expected elements', () => {
		cy.task<Gift[]>('fetchItemsDB', TEST_COUPLE_SLUG).as('gifts');
		cy.get('.headerImage').should('not.be.visible');
		cy.get<Gift[]>('@gifts').then(gifts =>
			gifts.forEach(gift => {
				cy.get(`[data-cy="giftItemCell-${gift.id}"]`).within(_$cell => {
					cy
						.get('[data-cy="giftItemName"]')
						.should('be.visible')
						.should('contain.text', gift.name);
					// testing in AR$
					cy
						.get('[data-cy="giftItemPrice"]')
						.should('be.visible')
						.should('contain.text', numberToPriceString(gift.price, 'AR$'));
				});
			})
		);
	});

	it('should lead to the gift cart page', () => {
		cy.get('[data-cy="giftItem"]').first().click();
		cy.get('[data-cy="goToCartButton"]').click();
		cy.url().should('contain', '/giftCart');
	});

	it('should store selected gifts in local storage', () => {
		cy.task<Gift[]>('fetchItemsDB', TEST_COUPLE_SLUG).as('gifts');
		cy.get('[data-cy="giftItem"]').first().click();
		cy.get('[data-cy="goToCartButton"]').should('be.visible');
		cy.getAllLocalStorage().then(result => {
			const baseUrl = Cypress.config().baseUrl || 'http://localhost:3000';
			cy.get<Gift[]>('@gifts').then(gifts => {
				expect(
					JSON.parse(result[baseUrl]['testCouple-giftCart'] as string)
				).to.deep.equal([gifts[0]]);
			});
		});
	});
});
