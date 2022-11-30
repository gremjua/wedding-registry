describe('thanks page', () => {
	it('should load all expected elements', () => {
		cy.visit('/testCouple/thanks');
		cy.get('.headerImage').should('not.be.visible');
		cy.get('[data-cy="thanksPageMessage"]').should('be.visible');
		cy.get('[data-cy="thanksPageIcon"]').should('be.visible');
	});
});
