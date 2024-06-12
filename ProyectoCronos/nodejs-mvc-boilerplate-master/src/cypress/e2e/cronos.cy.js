/// <reference types="cypress" />

const Cronos_url = "localhost:3000"

describe('sing in/up', () => {
    it('sign up', () => {
        // visita cronos
        cy.visit(Cronos_url)

        // llena el formulario
        cy.get('input[name="name"]').type('cypress')
        cy.get('input[name="email"]').type('cypress@test.com')
        cy.get('input[name="password"]').type('12345678')
        cy.get('input[name="password2"]').type('12345678')
        cy.contains('button', 'Signup').click()
        
        // si detecta que ya esta registrado ese email da click en log in
        cy.contains('li', 'Email already registered').then(($el) => {
            if ($el.length) {
            cy.contains('a', 'Login').click()
        }})
    })

    it('sign in', () => {
        cy.get('input[name="email"]').type('cypress@test.com')
        cy.get('input[name="password"]').type('12345678')
        cy.contains('button', 'Signin').click()
    })
})

describe('other tests', () => {
    it('proyects', () => {
        cy.get('a[href="/Proyects"]').click({ force: true });
        cy.get('.tableForProyects .titlesForTables').invoke('text').then((text) => {
            const proyectosNumber = parseInt(text.match(/\d+/)[0]);
            for(let i = 0; i < proyectosNumber; i++){
                cy.visit(Cronos_url + `/Proyects?projectId=${i}`)
                cy.get('.tableForTasks .titlesForTables').invoke('text').then((text) => {
                    const proyectosNumber = parseInt(text.match(/\d+/)[0]);
                    for(let j = 0; j < proyectosNumber; j++){
                        cy.visit(Cronos_url + `/Proyects?projectId=${i}&taskId=${j}`)
                    }
                });
            }
        });
    })

    it('Click en eventos y volver al calendario', () => {
        // Ir a la página del calendario
        cy.get('a[href="/calendar"]').click({ force: true });
        // Array para almacenar los eventos
        let events = [];
        // Obtener todos los elementos con la clase fc-event-title y almacenarlos en un array
        cy.get('.fc-event-title').each(($event) => {
        cy.wrap($event).invoke('text').then((text) => {
            events.push(text);
        });
        }).then(() => {
          // Iterar sobre el array de eventos
        events.forEach((eventText) => {
            // Volver a la página del calendario
            cy.get('a[href="/calendar"]').click({ force: true });
            // Esperar a que la página del calendario se cargue completamente antes de continuar
            cy.get('.fc-event-title').should('exist');
            // Hacer clic en el evento específico
            cy.contains('.fc-event-title', eventText).click();
            // Realizar alguna verificación en la nueva página si es necesario
            // Puedes realizar más acciones en la nueva página aquí
            // Después de realizar las acciones necesarias, no necesitas volver manualmente,
            // ya que el siguiente evento en el ciclo volverá automáticamente.
        });
        });
    });
});


describe('log out', () => {
    it('log out', () => {
        cy.get('a[href="/logout"]').click({ force: true })
    })
})