describe('upload page', () => {
	it('should load all expected elements with an invalid transaction id', () => {
		// TODO: fix upload page to show error message
		cy.visit('/testCouple/upload/');
		cy.get('.headerImage').should('not.be.visible');
	});
	it('should load all expected elements with a valid transaction id', () => {
		cy.visit('/testCouple/upload/test-id');
		cy.get('.headerImage').should('not.be.visible');
		cy.get('[data-cy="uploadPageTransactionInfo"]').should('be.visible');
		cy.get('[data-cy="uploadButton"]').should('be.visible');
	});

	it('should not allow to upload when an upload has already been made', () => {
		cy.visit('/testCouple/upload/test-id-uploaded');
		cy.get('[data-cy="uploadButton"]').should('not.exist');
	});
});
