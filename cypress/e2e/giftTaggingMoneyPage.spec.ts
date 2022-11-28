describe('gift tagging - send money - page', () => {
	beforeEach(() => {
		cy.visit('/testCouple/giftTagging/money');
	});
	it('should load all expected elements', () => {
		cy.get('.headerImage').should('not.be.visible');
		cy.get('#tag').should('be.visible').should('have.text', '');
		cy.get('#buyerName').should('be.visible').and('have.value', '');
		cy.get('#email').should('be.visible').and('have.value', '');
		cy.get('#amount').should('be.visible').and('have.value', '');
		cy
			.get('[data-cy="wireTransferButton"]')
			.should('be.visible')
			.and('be.enabled');
		// TODO: test having mp = false, button should not be visible
		cy
			.get('[data-cy="mercadopagoButton"]')
			.should('be.visible')
			.and('be.enabled');
	});

	it('should have fillable fields and lead to appropriate payment pages', () => {
		const tag = 'this is a tag 123@A$%^!"\'';
		const name = 'this is my name';
		const email = 'test@test.com';
		const amount = '123';

		cy.get('#tag').type(tag);
		cy.get('#buyerName').type(name);
		cy.get('#email').type(email);
		cy.get('#amount').type(amount);

		cy.get('#tag').focus(); // focus on another element
		cy.get('#tag').should('have.text', tag);
		cy.get('#buyerName').should('have.value', name);
		cy.get('#email').should('have.value', email);
		cy.get('#amount').should('have.value', amount);

		// TODO: test multiple origin, go to mercadopago
		cy.get('[data-cy="wireTransferButton"]').click();
		cy.url().should('contain', '/transfer');
	});
});
