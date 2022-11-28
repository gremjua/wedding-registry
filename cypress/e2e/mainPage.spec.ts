describe('couples main page', () => {
	beforeEach(() => {
		cy.visit('/testCouple');
	});
	it('should load all expected elements', () => {
		cy
			.get('[data-cy="chooseGiftButton"]', { timeout: 10000 })
			.should('be.visible');
		cy.get('[data-cy="sendMoneyButton"]').should('be.visible');
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
});
