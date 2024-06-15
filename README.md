# Cronos

**Visita [Cronos en AaronProjects.xyz](https://aaronprojects.xyz) para ver la plataforma en acción.**

Cronos es una plataforma web que automatiza la creación y gestión de proyectos, transformando ideas complejas en tareas manejables y organizadas. Esta herramienta utiliza tecnologías como JavaScript, EJS, CSS, Node.js, Express, y PostgreSQL, aprovechando las APIs de Notion y OpenAI para optimizar la planificación y ejecución de proyectos.

## Características Principales

- **Automatización de Proyectos:** Ingrese un prompt descriptivo y Cronos generará automáticamente un conjunto de tareas detalladas, facilitando la gestión de proyectos complejos.
![Cronos Interface 1](/doc/Cronos4.png)
- **Gestión Visual:** Visualiza tus proyectos en un calendario interactivo, lo que facilita el seguimiento de las fechas de entrega y el progreso general.
![Cronos Interface 2](/doc/Cronos3.png)
- **Integración con Notion:** Duplica tus proyectos directamente en Notion para una gestión más fluida y un acceso más amplio a herramientas de productividad.
![Cronos Interface 3](/doc/Cronos2.png)
- **Almacenamiento Seguro:** Cada proyecto y tarea se guarda en una base de datos relacionada a tu usuario, permitiendo un acceso fácil y seguro a tu información.
![Cronos Interface 4](/doc/Cronos1.png)


## Beneficios de Cronos

Cronos simplifica la gestión de proyectos dividiendo tareas complejas en partes más pequeñas y manejables. Esta segmentación ayuda a mejorar la eficiencia, facilitando la supervisión y la ejecución de cada paso del proyecto.

## Requisitos del Sistema

- Node.js
- Express
- PostgreSQL (Opción de usar Docker para manejar la base de datos)
- Recomendado: Entorno de desarrollo como Visual Studio Code

## Instalación

1. Clona el repositorio en tu sistema.
2. Instala las dependencias necesarias ejecutando `npm install`.
3. Inicia los servidores con `node server.js` y `node Front.js`.
4. Para la base de datos, usa Docker ejecutando el Dockerfile proporcionado.

## Uso

Accede a Cronos navegando a `localhost:3000` en tu navegador, regístrate y comienza a crear y gestionar tus proyectos de forma inmediata.

### Ejemplo de Uso

Simplemente sigue los pasos de instalación y utiliza la interfaz web para comenzar a desglosar tus proyectos en tareas.

## Diagra de la arquitectura de Chatbot y Cronos

![Diagrama de cronos y chatbot](/doc/CronosDiagrama.jpeg)

## Diagrama de la base de datos de Cronos y Chatbot

base de datos de cronos
![Diagrama Unicamente de Cronos](/doc/BaseDeDatosCronos.png)

base de datos del chatbot
![Diagrama de el Chatbot](/doc/ChatbotDiagrama.png)

## Contribuciones

¿Interesado en contribuir? ¡Las contribuciones son bienvenidas! Para contribuir, realiza un pull request describiendo los cambios o nuevas funcionalidades que propones.

## Video de pruebas Cypress

este es el video de pruebas con cypress [Link al video](https://youtu.be/UCheOnIpXiM)

## Licencia

Este proyecto está licenciado bajo la Cronos License, cuya copia puedes encontrar en el archivo `LICENSE` del repositorio.

## Contacto

Si tienes preguntas o problemas con Cronos, puedes contactarme directamente en mi correo disponible en mi perfil de GitHub o en mi sitio web [www.aaronhernandez.me](http://www.aaronhernandez.me).

## Créditos y Agradecimientos

Agradecimientos especiales a Fernando Cuevas Arroyo por su participación activa en el desarrollo del sistema de login y su apoyo continuo en el proyecto.

