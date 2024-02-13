describe('Inscription et connexion', () => {
  const firstName = 'pabloBatistedu75';
  const lastName = 'LePetitChakib'; 
  const email = 'chakibGoogle@gmail.com';
  const password = 'quelleGrace';
  const passwordConfirmation = 'quelleGrace'; 

  it('Créer un compte si nécessaire', () => {
    cy.visit('/'); 
    cy.get('a.sc-guhxjM').click(); 
    cy.url().should('include', '/login');
    cy.get('input[name="email"]').type(email); 
    cy.get('input[name="password"]').type(password); 
    cy.get('form').submit();
    cy.url().then(url => {
      if (url.includes('login')) {
        cy.visit('/register'); 
        cy.get('input[name="firstName"]').type(firstName);  
        cy.get('input[name="lastName"]').type(lastName);  
        cy.get('input[name="email"]').type(email); 
        cy.get('input[name="plainPassword"]').type(password); 
        cy.get('input[name="password_confirmation"]').type(passwordConfirmation); 
        cy.get('button[type="submit"]').click(); 
      } else {
      }
    });
  });
});

describe('Login Test', () => {
  const email = 'chakibGoogle@gmail.com'; 
  const password = 'quelleGrace';          

  it('Remplir les champs de login et soumettre', () => {
    cy.visit('/login'); 
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('button[type="submit"]').not('[disabled]')
      .click();
      });
});
