describe('transfer page', () => {
	it('should load all expected elements when there is no transfer data', () => {
		cy.visit('/testCouple/transfer');
		cy.get('[data-cy="errorMsgNoTransferData"]').should('be.visible');
		cy.get('[data-cy="chooseGiftButton"]').should('be.visible');
	});

	it('should load all expected elements when there is transfer data', () => {
		// TODO: use mocks in transfer page, or update context in a component test or similar
		cy.visit('/testCouple/giftTagging/money');
		const tag = 'this is a tag 123@A$%^!"\'';
		const name = 'this is my name';
		const email = 'test@test.com';
		const amount = '123';
		cy.get('#tag').type(tag);
		cy.get('#buyerName').type(name);
		cy.get('#email').type(email);
		cy.get('#amount').type(amount);
		cy.get('[data-cy="wireTransferButton"]').click();
		cy.get('[data-cy="transferPageAmountText"]').should('be.visible');
		cy.get('[data-cy="transferPageInstructionsText"]').should('be.visible');
		cy.get('[data-cy="transferPageConfirmButton"]').should('be.visible').click();
		cy.url().should('contain', '/transfer/confirm');
	});
});
