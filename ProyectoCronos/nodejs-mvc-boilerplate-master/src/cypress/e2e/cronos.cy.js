/// <reference types="cypress" />

const Cronos_url = "localhost:3000"
const usuario = "Aaron Hernandez"
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

describe('other tests', () => {
    it('proyects', () => {
        cy.get('a[href="/Proyects"]').click({ force: true });
        
        cy.get('body').then(($body) => {
        if ($body.find('.tableForProyects .titlesForTables').length > 0) {
            cy.get('.tableForProyects .titlesForTables').invoke('text').then((text) => {
            const proyectosNumber = parseInt(text.match(/\d+/)[0]);
            for (let i = 0; i < proyectosNumber; i++) {
                cy.visit(`${Cronos_url}/Proyects?projectId=${i}`);
                cy.get('body').then(($innerBody) => {
                if ($innerBody.find('.tableForTasks .titlesForTables').length > 0) {
                    cy.get('.tableForTasks .titlesForTables').invoke('text').then((taskText) => {
                        const tasksNumber = parseInt(taskText.match(/\d+/)[0]);
                    for (let j = 0; j < tasksNumber; j++) {
                        cy.visit(`${Cronos_url}/Proyects?projectId=${i}&taskId=${j}`);
                    }
                    });
                } else {
                    cy.log('No se encontraron tareas para el proyecto con ID ' + i);
                }
                });
            }
            });
        } else {
            cy.log('No se encontraron proyectos.');
        }
        });
    });
    it('Click en eventos y volver al calendario', () => {
        // Ir a la página del calendario
        cy.get('a[href="/calendar"]').click({ force: true });
    
        // Array para almacenar los eventos
        let events = [];
    
        // Verificar la existencia de elementos con la clase fc-event-title
        cy.get('body').then(($body) => {
            if ($body.find('.fc-event-title').length > 0) {
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
            } else {
                cy.log('No se encontraron eventos en el calendario.');
            }
        });
    });
    
});


// describe('chat bot', () => {
//     it('chat bot', () => {
//         cy.get('a[href="/chatMes"]').click({ force: true })
//         cy.get('input[id="userInput"]').type('Hola')
//         cy.contains('button', 'Enviar').click()
//         //esperamos 10s antes de seguir con el siguiente test
//         cy.wait(10000)
//     })
// })

describe('log out', () => {
    it('log out', () => {
        cy.get('a[href="/logout"]').click({ force: true })
    })
})