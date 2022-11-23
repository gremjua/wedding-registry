import { gifts } from 'context/mocks';
import numberToPriceString from 'utils/price';

describe('gifts page', () => {
	beforeEach(() => {
		cy.visit('/testCouple/gifts');
	});
	it('should load all expected elements', () => {
		cy.get('.headerImage').should('not.be.visible');
		gifts.forEach(gift => {
			cy.get(`[data-cy="giftItemCell-${gift.id}"]`).within($cell => {
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
		});
	});
});
