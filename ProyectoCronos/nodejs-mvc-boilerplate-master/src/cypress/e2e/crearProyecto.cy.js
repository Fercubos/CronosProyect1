/// <reference types="cypress" />

const Cronos_url = "localhost:3000"
const usuario = "cypress"
const email = "cypress2@test.com"
const password = "12345678"

describe('sing in/up', () => {
    it('sign up', () => {
        // visita cronos
        cy.visit(Cronos_url)

        // llena el formulario
        cy.get('input[name="name"]').type(usuario)
        cy.get('input[name="email"]').type(email)
        cy.get('input[name="password"]').type(password)
        cy.get('input[name="password2"]').type(password)
        cy.contains('button', 'Signup').click()
        
        // si detecta que ya esta registrado ese email da click en log in
        cy.get('li').then(($listItems) => {
            const item = $listItems.filter((index, li) => li.innerText.includes('Email already registered'));
            if (item.length > 0) {
                cy.contains('a', 'Login').click();
            } else {
                cy.log('El mensaje "Email already registered" no está presente.');
            }
        });
    })

    it('sign in', () => {
        cy.get('input[name="email"]').type(email)
        cy.get('input[name="password"]').type(password)
        cy.contains('button', 'Signin').click()
    })
})

describe('crear proyecto', () => {
    it('crear proyecto', () => {
        cy.get('textarea[id="dbName"]').type('Proyecto de dos tareas para acabar con el hambre mundial')
        cy.get('input[type="submit"]').click()
        // espera a que termine de cargar el proyecto esto no tiene un tiempo determinado cuando termina de cargar busca el elemento h2 con el texto Detalles de Base de Datos
        cy.get('h2', { timeout: 1000000 }).should('contain', 'Detalles de la Base de Datos').then(() => {
            cy.log('Proyecto creado');
        }, () => {
            cy.log('Proyecto no creado aun');
        });        
    })
})

describe('log out', () => {
    it('log out', () => {
        cy.get('a[href="/logout"]').click({ force: true })
    })
})