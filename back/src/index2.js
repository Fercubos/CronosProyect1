require("dotenv").config();
const express = require("express");
const http = require('http');
const https = require('https');
const app = express();
const OpenAI = require("openai");
const bodyParser = require("body-parser");
const cors = require("cors");
const port = 443;
const fs = require("fs/promises"); // Import fs/promises para manejar archivos de forma asíncrona
const model1 = "gpt-3.5-turbo"; //modelo de openai a utilizar
const fullCalendar = require('fullcalendar');
const ejs = require('ejs');
const axios = require('axios');


//manejo de la hora y fecha
const { DateTime } = require("luxon");

//manejo de cors y bodyparser para el manejo de datos
app.use(cors());
app.use(bodyParser.json());



const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

//manejo de la respuesta del asistente
let response = "";
let time1 = DateTime.now().toFormat('dd-MM-yyyy');

//funcion pre definida notion
const { Client } = require("@notionhq/client");
const notion = new Client({ auth: process.env.NOTION_KEY });

// http://expressjs.com/en/starter/static-files.html
//app.use(express.static("public")); //para que se pueda acceder a los archivos de la carpeta public
app.use(express.static(__dirname, 'public'));
app.use(express.json()); // for parsing application/json



// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) { //ruta principal
	response.render(__dirname + "/views/index1.ejs");
});

app.post("/databases", async (req, res) => { //ruta para obtener las bases de datos de notion
	console.log(req.body);
	var response = JSON.stringify(req.body)
	try {
		var databases = await fetch("http://localhost:80/databases", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: response,
		});
		databases = await databases.json();
		res.json(databases);
	} catch (error) {
		console.error(error);
		res.status(500).send("Error fetching databases");
	}
});

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});