import { Gift } from 'components/gifts/types';
import numberToPriceString from 'utils/price';
import { TEST_COUPLE_SLUG } from '../support/constants';

describe('gifts page', () => {
	before(() => {
		cy.task<Gift[]>('fetchItemsDB', TEST_COUPLE_SLUG).as('gifts');
	});
	beforeEach(() => {
		cy.visit(`/${TEST_COUPLE_SLUG}/gifts`);
	});
	it('should load all expected elements', () => {
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
});
