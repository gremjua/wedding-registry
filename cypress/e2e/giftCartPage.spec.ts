describe('gift cart page', () => {
	it('should load all expected elements with no gifts in cart', () => {
		cy.visit('/testCouple/giftCart');
		cy.get('.headerImage').should('not.be.visible');
	});
	it('should load all expected elements with gifts in cart', () => {
		// TODO: use mocks instead, use local storage eventually
		cy.visit('/testCouple/gifts');
		cy.get('[data-cy="giftItem"]').first().click();
		cy.get('[data-cy="goToCartButton"]').click();
		// now in gift cart page
		cy.get('.headerImage').should('not.be.visible');
		cy.get('[data-cy="payButton"]').should('be.visible');
		cy.get('[data-cy="chooseGiftButton"]').should('be.visible');
	});
});
