describe('full user flow', () => {
	beforeEach(() => {
		cy.visit('/testCouple');
	});
	it('should add some gifts and pay by wire transfer', () => {
		cy.intercept('/api/email', { body: { data: 'success' } }).as('email');
		cy.get('[data-cy="chooseGiftButton"]', { timeout: 10000 }).click();
		cy.get('[data-cy="giftItem"]').first().click();
		cy.get('[data-cy="giftItem"]').then(list => {
			list[1].click();
			list[2].click();
		});
		cy.get('[data-cy="navBarGoToCartButton"]').click();
		cy.get('[data-cy="removeGiftButton"]').first().click();
		cy.get('[data-cy="payButton"]').click();

		const tag = 'this is a tag 123@A$%^!"\'';
		const name = 'this is my name';
		const email = 'test@test.com';

		cy.get('#tag').type(tag);
		cy.get('#buyerName').type(name);
		cy.get('#email').type(email);
		cy.get('#amount').should('have.value', '16000');

		cy.get('[data-cy="wireTransferButton"]').click();

		cy.get('[data-cy="transferPageConfirmButton"]').click();

		cy.wait('@email').then(req => {
			const { content: _content, ...payload } = req.request.body;
			const expectedEmail = {
				from: 'pretzels.regalos@gmail.com',
				subject: '🎉 Confirmaste tu regalo para Test 1 and Test 2 🎉 ',
				to: 'test@test.com',
			};
			expect(payload).to.deep.equal(expectedEmail);
		});
		cy.get('[data-cy="uploadButton"]').selectFile({
			fileName: 'users.json',
			contents: Cypress.Buffer.from('file contents'),
		});
		cy.wait('@email').then(req => {
			const { content: _content, ...payload } = req.request.body;
			const expectedEmail = {
				from: 'pretzels.regalos@gmail.com',
				subject: '🎉 Recibiste un regalo 🎉 ',
				to: 'test@gmail.com',
			};
			expect(payload).to.deep.equal(expectedEmail);
		});
		cy.get('[data-cy="thanksPageIcon"]').should('be.visible');
	});
});
