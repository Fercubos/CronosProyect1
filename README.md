## Tecnologías utilizadas

| Tecnología | Versión |
|---|---|
| Node.js (ES Modules) | 18+ |
| Express | 4.19 |
| EJS / ejs-mate | 3.1 / 4.0 |
| PostgreSQL (vía Docker) | imagen oficial `postgres` |
| API de Notion (`@notionhq/client`) | 2.2 |
| API de OpenAI (`openai`, modelo `gpt-3.5-turbo`) | 4.42 |
| Ollama + Mixtral (chatbot local, expuesto con ngrok) | dolphin-2.7-mixtral-8x7b |
| FullCalendar | 6.1 |
| Bootstrap | 5.3 |
| Passport (local + Google OAuth2) | 0.7 |
| Cypress (pruebas E2E) | 13.11 |

**Última actualización del sistema:** 7 de julio de 2024

---

# Cronos

### De una idea a un plan de trabajo en segundos.

**[Pruébalo en AaronProjects.xyz](https://aaronprojects.xyz)**

¿Tienes un proyecto enorme y no sabes por dónde empezar? Cronos convierte una simple descripción en un plan completo: tareas, pasos y fechas, listo para seguir en un calendario y para llevarlo a Notion con un clic. Deja de organizar y empieza a hacer.

## ¿Qué puedes hacer con Cronos?

- **Del prompt al plan:** describe tu idea y Cronos, con IA, genera automáticamente tareas detalladas y ordenadas.
![Cronos Interface 1](/doc/Cronos4.png)
- **Ve tu progreso de un vistazo:** un calendario interactivo muestra fechas de entrega y avance de cada proyecto.
![Cronos Interface 2](/doc/Cronos3.png)
- **Llévalo a Notion:** duplica tus proyectos en Notion y sigue trabajando en la herramienta que ya usas.
![Cronos Interface 3](/doc/Cronos2.png)
- **Tu información, segura:** cada proyecto y tarea queda guardado en tu cuenta, listo cuando lo necesites.
![Cronos Interface 4](/doc/Cronos1.png)
- **Un asistente siempre a mano:** el chatbot integrado responde tus dudas en tiempo real. Funciona con OpenAI o con un modelo local (Ollama) expuesto mediante ngrok.
![Cronos Interface 5](/doc/CronosChat.png)

## Por qué Cronos

Los proyectos grandes se abandonan porque abruman. Cronos los divide en partes pequeñas y manejables, para que siempre sepas cuál es el siguiente paso. Menos tiempo planeando, más tiempo avanzando.

## Míralo en acción

[Ver video de funcionalidad de Cronos](https://youtu.be/GleGaoD43pQ) · [Presentación de Cronos](https://www.aaronprojects.xyz/what_is_cronos)

## Empieza en minutos

**Requisitos:** Node.js, PostgreSQL (o Docker) y tus claves de Notion y OpenAI.

1. Clona el repositorio.
2. Entra a `ProyectoCronos/nodejs-mvc-boilerplate-master` e instala dependencias con `npm install`.
3. Crea un archivo `.env` con `NOTION_KEY`, `NOTION_PAGE_ID` y `OPENAI_API_KEY` (y `URL_OF_NGROK` si usas el chatbot local).
4. Levanta la base de datos con Docker (`docker-compose up`).
5. Inicia los servidores con `node src/server.js` y `node src/Front.js`.
6. Abre `localhost:3000`, regístrate y crea tu primer proyecto.

## Arquitectura

![Diagrama de cronos y chatbot](/doc/CronosDiagrama.jpeg)

## Base de datos

![Diagrama Unicamente de Cronos](/doc/BaseDeDatosCronos.png)

## Calidad probada

Cronos cuenta con pruebas end-to-end con Cypress: [ver video de pruebas](https://youtu.be/UCheOnIpXiM).

## Contribuciones

¿Quieres sumarte? Abre un pull request describiendo los cambios o nuevas funcionalidades que propones.

## Licencia

Este proyecto está licenciado bajo la Cronos License; consulta el archivo `LICENSE`.

## Créditos

Cronos fue desarrollado por sus **desarrolladores principales, Aaron Hernández y Fernando Cuevas Arroyo**: Aaron dio forma a la plataforma, la integración con Notion y OpenAI y el chatbot; Fernando, al sistema de acceso y registro de usuarios. Gracias también a quienes aportaron ideas y pruebas en el camino.

## Contacto

¿Preguntas o ideas? Escríbenos:

- Aaron Hernández: correo en su perfil de GitHub o [www.aaronhernandez.me](http://www.aaronhernandez.me)
- Fernando Cuevas Arroyo: [fernandoyiuuu@gmail.com](mailto:fernandoyiuuu@gmail.com)
