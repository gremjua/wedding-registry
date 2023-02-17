import { priceStringToNumber } from '../../src/utils/price';

describe('full user flow', () => {
	beforeEach(() => {
		cy.visit('/testCouple');
	});
	it('should add some gifts and pay by wire transfer', () => {
		cy.intercept('/api/email', { body: { data: 'success' } }).as('email');
		cy.get('[data-cy="chooseGiftButton"]', { timeout: 20000 }).click();
		cy.get('[data-cy="giftItemPrice"]').then(list => {
			const price2 = priceStringToNumber(list[1].textContent || '-1');
			const price3 = priceStringToNumber(list[2].textContent || '-1');
			cy.wrap({ price2, price3 }).as('prices');
		});
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
		cy.get<{ price2: number; price3: number }>('@prices').then(prices => {
			cy.get('#amount').should('have.value', `${prices.price2 + prices.price3}`);
		});

		cy.get('[data-cy="wireTransferButton"]').click();

		cy.get('[data-cy="transferPageConfirmButton"]').click();

		cy.wait('@email').then(req => {
			const expectedEmail = {
				from: 'pretzels.regalos@gmail.com',
				to: 'test@test.com',
				type: 'GIFTER',
				transaction: {
					tag: 'this is a tag 123@A$%^!"\'',
					buyerName: 'this is my name',
					email: 'test@test.com',
					amount: 16000,
					gifts: [
						{
							id: '2',
							name: 'Perchero nórdico 2',
							price: 5000,
							imageUrl: '/images/gifts/percheroNordico.jpg',
						},
						{
							id: '3',
							name: 'Perchero nórdico 3',
							price: 11000,
							imageUrl: '/images/gifts/percheroNordico.jpg',
						},
					],
				},
				transactionId: 'this-is-a-test-transaction-id',
				couple: {
					id: 'testId',
					slug: 'testCouple',
					title: 'Test 1 and Test 2',
					headerImgUrl: '/images/juanYSol.jpg',
					email: 'test@gmail.com',
					bank: { alias: 'test.alias', cbu: '000022229999', name: 'Test Bank' },
					mp: true,
					rsvpUrl: 'http://google.com',
				},
			};
			expect(req.request.body).to.deep.equal(expectedEmail);
		});
		cy.get('[data-cy="uploadButton"]').selectFile({
			fileName: 'users.json',
			contents: Cypress.Buffer.from('file contents'),
		});
		cy.wait('@email').then(req => {
			const expectedEmail = {
				from: 'pretzels.regalos@gmail.com',
				to: 'test@test.com',
				type: 'COUPLE',
				transaction: {
					id: 'test-id',
					buyerName: 'Test buyer name',
					tag: 'Test tag',
					email: 'test@test.com',
					amount: 500333,
					status: 'pending',
				},
				couple: {
					slug: 'testCouple',
					title: 'Test 1 and Test 2',
					headerImgUrl: '/images/juanYSol.jpg',
					email: 'test@gmail.com',
					bank: { alias: 'test.alias', cbu: '000022229999', name: 'Test Bank' },
					mp: true,
					rsvpUrl: 'http://google.com',
				},
			};
			expect(req.request.body).to.deep.equal(expectedEmail);
		});
		cy.get('[data-cy="thanksPageIcon"]').should('be.visible');
	});
});
