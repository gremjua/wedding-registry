describe('Couples Main Page', () => {
	it('should load', () => {
		cy.visit('/testCouple');
		cy.contains('Elegí un regalo', { timeout: 10000 }).should('be.visible');
	});
});
