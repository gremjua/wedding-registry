describe('transfer confirm page', () => {
	it('should load all expected elements when there is no transfer data', () => {
		cy.visit('/testCouple/transfer/confirm');
		cy.get('.headerImage').should('not.be.visible');
		cy.get('[data-cy="transferConfirmErrorMessage"]').should('be.visible');
		cy.get('[data-cy="chooseGiftButton"]').should('be.visible');
	});

	// TODO: mock data and expect all elements
});
