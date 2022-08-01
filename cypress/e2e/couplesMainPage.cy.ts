describe('Couples Main Page', () => {
	it('should load', () => {
		cy.visit('http://localhost:3000/test');
		cy.contains('Elegí un regalo', { timeout: 10000 }).should('be.visible');
	});
});
