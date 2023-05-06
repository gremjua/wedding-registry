import { priceStringToNumber } from '../../src/utils/price';
import { DBCouple } from '../../src/context/CoupleContext';
import { TEST_COUPLE_SLUG } from '../support/constants';
import { DBTransaction } from '../../src/context/TransactionContext';
import { EmailData } from '../../src/net/email';

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
		const email = 'test@gifter.com';

		cy.get('#tag').type(tag);
		cy.get('#buyerName').type(name);
		cy.get('#email').type(email);
		cy.get<{ price2: number; price3: number }>('@prices').then(prices => {
			cy.get('#amount').should('have.value', `${prices.price2 + prices.price3}`);
		});

		cy.get('[data-cy="wireTransferButton"]').click();

		cy.get('[data-cy="transferPageConfirmButton"]').click();

		cy
			.get('[data-cy="transactionId"]')
			.invoke('text')
			.then(_transactionId => {
				cy.task<DBCouple>('fetchCoupleBySlugDB', TEST_COUPLE_SLUG).then(couple => {
					cy.wrap(couple).as('couple');
					cy
						.task<DBTransaction>('fetchTransactionDB', {
							transactionId: 'test-id',
							coupleId: couple.id,
						})
						.then(transaction => {
							cy.wrap(transaction).as('transaction');
						});
				});
			});

		cy.wait('@email').then(req => {
			cy.get<DBCouple>('@couple').then(({ id: _id, ...couple }) => {
				cy
					.get<DBTransaction>('@transaction')
					.then(
						({
							id: transactionId,
							status: _status,
							timestamp: _timestamp,
							...transaction
						}) => {
							const expectedEmail = {
								// from: process.env.REACT_APP_EMAIL,
								to: email,
								type: 'GIFTER',
								transaction,
								transactionId,
								couple,
							};
							cy.wrap(expectedEmail).as('gifterEmail');
							const { from, ...actualEmail } = req.request.body;
							expect(actualEmail).to.deep.equal(expectedEmail);
						}
					);
			});
		});
		cy.get('[data-cy="uploadButton"]').selectFile({
			fileName: 'users.json',
			contents: Cypress.Buffer.from('file contents'),
		});
		cy.wait('@email').then(req => {
			cy.get<EmailData>('@gifterEmail').then(gifterEmail => {
				const { transactionId: _transactionId, ...prunedEmail } = gifterEmail;
				const coupleEmail = gifterEmail.couple.email;
				const expectedEmail = {
					...prunedEmail,
					to: coupleEmail,
					type: 'COUPLE',
				};
				const { from: _from, ...actualEmail } = req.request.body;
				expect(actualEmail).to.deep.equal(expectedEmail);
			});
		});
		cy.get('[data-cy="thanksPageIcon"]').should('be.visible');
	});
});
