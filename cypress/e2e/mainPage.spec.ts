describe('Main Page', () => {
	it('should load', () => {
		cy.visit('/testCouple');
		cy
			.get('[data-cy="chooseGiftButton"]', { timeout: 10000 })
			.should('be.visible');
		cy.get('[data-cy="sendMoneyButton"]').should('be.visible');
	});
});
