import { Couple } from '../../src/context/CoupleContext';
import { TEST_COUPLE_SLUG } from '../support/constants';

describe('couples main page', () => {
	beforeEach(() => {
		cy.visit('/testCouple');
	});
	it('should load all expected elements', () => {
		cy
			.get('[data-cy="chooseGiftButton"]', { timeout: 10000 })
			.should('be.visible');
		cy.get('[data-cy="sendMoneyButton"]').should('be.visible');
		cy.get('[data-cy="rsvpButton"]').should('be.visible');
		cy.get('[data-cy="logo"]').should('be.visible');
		cy.get('.headerImage').should('be.visible');
	});

	it('should lead to the gifts page', () => {
		cy.get('[data-cy="chooseGiftButton"]', { timeout: 10000 }).click();
		cy.url().should('contain', '/gifts');
	});

	it('should lead to the gift tagging - send money - page', () => {
		cy.get('[data-cy="sendMoneyButton"]', { timeout: 10000 }).click();
		cy.url().should('contain', '/giftTagging/money');
	});

	it('should lead to the rsvp page', () => {
		cy.task<Couple>('fetchCoupleBySlugDB', TEST_COUPLE_SLUG).then(couple => {
			cy
				.get('[data-cy="rsvpButton"]', { timeout: 10000 })
				.invoke('removeAttr', 'target')
				.invoke('attr', 'href')
				.should('equal', couple.rsvpUrl);
		});
	});
});
