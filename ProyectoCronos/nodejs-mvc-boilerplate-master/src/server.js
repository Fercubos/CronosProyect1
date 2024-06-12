dotenv.config();
//import engine from "ejs-mate";
//import morgan from "morgan";
//import passport from "passport";
//import session from "express-session";
//import flash from "connect-flash";
//import { error } from "console";
import express from "express";
import cors from "cors";
import fs from "fs/promises"; // Import fs/promises para manejar archivos de forma asíncrona
//import ejs from "ejs";
//import axios from "axios";
//import path from "path";
//import ejsLayouts from "express-ejs-layouts";
import OpenAI from "openai";
import pg from "pg";
///home/aypierre225/ProyectoCronos06/CronosProyect1/ProyectoCronos/nodejs-mvc-boilerplate-master/postgres-cronos-image.tar

const port = 4120;
const app = express();
const model1 = "gpt-3.5-turbo"; //modelo de openai a utilizar

const pool = new pg.Pool({
	user: "postgres",
	host: "localhost",
	database: "Proyecto_Cronos1",
	password: "3312",
	port: 5432,
});

//manejo de la hora y fecha
import { DateTime } from "luxon";
//manejo de cors y bodyparser para el manejo de datos
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

//manejo de la respuesta del asistente
//let response = "";
let time1 = DateTime.now().toFormat("dd-MM-yyyy");

//funcion pre definida notion
import { Client } from "@notionhq/client";
import dotenv from "dotenv";
const notion = new Client({ auth: process.env.NOTION_KEY });

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public")); //para que se pueda acceder a los archivos de la carpeta public
app.use(express.json()); // for parsing application/json

//esto es para generar una interfaz de usuario para poder visualizar lo que va mandar a notion
var projectDetails = {
	DatabaseName: [],
	NumberOfTasks: [],
	Steps: [],
	dateOfSteps: [],
	completionOfSteps: [],
	StepsInsideResume: [],
};

app.post("/getUserIdbyName", async function (req, res) {
	const NameUser = req.body.NameUser;
	console.log(NameUser);
	try {
		const userId = await getUserIdByName(NameUser);
		console.log(userId);
		res.status(200).json({ message: "success!", userId: userId });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Error retrieving user id." });
	}
});

app.post("/calendar", async function (req, res) {
	console.log("Calendario");
	var NameUser = req.body.userId;
	console.log(NameUser);
  
	try {
	  const userId = NameUser
	  const steps = await getUserSteps(userId);
	  //console.log(steps);
	  res.status(200).json({ message: "success!", steps: steps , userId: userId});
	} catch (error) {
	  console.error(error);
	  res.status(500).json({ message: "Error retrieving user steps." });
	}
  });
  
async function getUserIdByName(name) {
	const query = `
	  SELECT id 
	  FROM users 
	  WHERE name = $1;
	`;
	const result = await executeQuery(query, [name]);
	if (result.rows.length === 0) {
	  throw new Error('User not found');
	}
	return result.rows[0].id;
  }


  async function getUserSteps(userId) {
    const query = `
        SELECT t.tarea_id, p.proyecto_id, p.nombre as proyecto_nombre, t.fecha_de_los_pasos, ps.descripcion
        FROM pasos ps
        JOIN tareas t ON ps.tarea_id = t.tarea_id
        JOIN proyectos p ON t.proyecto_id = p.proyecto_id
        WHERE p.user_id = $1
        ORDER BY t.fecha_de_los_pasos, ps.paso_id;
    `;
    const result = await executeQuery(query, [userId]);
    return JSON.stringify(result.rows); // Convierte el resultado a JSON correctamente formateado
}




app.post("/giveProyects", async function (req, res) {
	//ruta para obtener los proyectos
	console.log("Entregando Proyectos");
	console.log(req.body.NameUser); //aqui se recibe el user_id	
  var user_id1s = req.body.NameUser;
  console.log(user_id1s); //aqui se recibe el user_id
	try {
		const proyectos = await getProjectsDetails(user_id1s);
		//console.log(proyectos);
		if (proyectos[0] === "No hay proyectos registrados.") {
			res.status(200).json({ proyects: "No hay proyectos registrados." });
		} else {
			res.status(200).json({ proyectos });
		}
	} catch (error) {
		console.error("Error al obtener proyectos:", error);
		res.status(500).json({ error: "Error interno del servidor" });
	}
});

async function getProjectsDetails(userId) {
  const query = `
    SELECT p.proyecto_id, p.nombre, p.proyect_notion_url, t.tarea_id, t.numero_de_tareas, t.fecha_de_los_pasos, t.completitud, ps.paso_id, ps.descripcion, ps.steps_inside_resume
    FROM proyectos p
    JOIN tareas t ON p.proyecto_id = t.proyecto_id
    JOIN pasos ps ON t.tarea_id = ps.tarea_id
    WHERE p.user_id = $1
    ORDER BY p.proyecto_id, t.tarea_id, ps.paso_id;
  `;

  const client = await pool.connect();
  try {
    const result = await client.query(query, [userId]);
    if (result.rows.length === 0) {
      return ["No hay proyectos registrados."];
    } else {
      return formatProjectDetails(result.rows);
    }
  } finally {
    client.release();
  }
}

function formatProjectDetails(rows) {
  const projects = {};

  rows.forEach((row) => {
    if (!projects[row.proyecto_id]) {
      projects[row.proyecto_id] = {
        id: row.proyecto_id,
        nombre: row.nombre,
        proyect_notion_url: row.proyect_notion_url, // Añadimos la URL de Notion aquí
        tareas: [],
      };
    }

    const task = projects[row.proyecto_id].tareas.find(
      (t) => t.id === row.tarea_id
    );
    if (!task) {
      projects[row.proyecto_id].tareas.push({
        id: row.tarea_id,
        numero_de_tareas: row.numero_de_tareas,
        fecha_de_los_pasos: row.fecha_de_los_pasos,
        completitud: row.completitud,
        pasos: [],
      });
    }

    const currentTask = projects[row.proyecto_id].tareas.find(
      (t) => t.id === row.tarea_id
    );
    currentTask.pasos.push({
      id: row.paso_id,
      descripcion: row.descripcion,
      steps_inside_resume: row.steps_inside_resume,
    });
  });

  return Object.values(projects);
}


async function executeQuery(query, params) {
  const client = await pool.connect();
  try {
    const result = await client.query(query, params);
    return result;
  } finally {
    client.release();
  }
}


// Create new database. The page ID is set in the environment variables.
app.post("/databases", async function (req, res) {
	resetProjectDetails();
	const pageId = process.env.NOTION_PAGE_ID;
	//const title = request.body.dbName;
	//necesitamos añadir un proceso para pedir el pageId ###
	const name = req.body.name;
	var id_user1 = req.body.userId3; // Aquí se recibe el user_id del request
	

	console.log("este es el id del usuario: " + id_user1);
	console.log(time1.toString());


	//formato para generar la base de datos
	let messages = [
		{
			role: "system",
			content:
				"eres un asistente que planifica y acomoda eventos o gestiona proyectos en la agenda al igual que tienes capacidades de todas las profeciones el dia de hoy es " +
				time1 +
				" haz todo para que dure 1 semana a no ser que se te indique lo contrario y da lo que se te solicite sobre el contexto para el siguiente proyecto: " +
				name +
				"lo que no sepas imaginalo o generalo nunca digas lo siento no puedo!",
		},
	];
	await writeMessages(messages);

	//generamos la database con el nombre del proyecto ########################################
	var prompts = "Genera y dime unica y exclusivamente el titulo del proyecto resumido sin otras cosas ni nada de contexto extra o preguntas, UNICAMENTE el titulo del proyecto tiene que ser menor a 255 caracteres, es el que te propongo acontinuacion si te digo numero de tareas IGNORAME ESO:";
	const response1 = await DBsd1(name, prompts);
	const responseFromDB = await dbGenerator(response1, pageId);
	//console.log(ded.data.id); //this is the id of the database
	var database_id = responseFromDB.data.id;
	//hasta aqui se genera la base de datos ########################################


	//generamos las paginas de las tareas del proyecto ########################################
	var promptNumberOfTasks =
		"Genera y dime cuantas tareas tiene el proyecto unicamente genera el numero de tareas nada mas, generalo en formato numerico sin otra palabra!";
	var NumberOfTasks = await DBsd(readMessages(), promptNumberOfTasks); //numero de tareas del proyecto
	projectDetails.NumberOfTasks.push(NumberOfTasks);

	//generamos la primera tarea del proyecto ########################################
	var promptsPages =
		"Genera y dime unica y exclusivamente el nombre de la primera tarea sin otras cosas ni nada de contexto extra o preguntas, UNICAMENTE el nombre de la primer tarea para llevar a cabo ese proyecto y el numero 1!";
	var response2 = await DBsd(readMessages(), promptsPages); //nombre de la tarea 1
	projectDetails.Steps.push(response2);

	//generamos los pasos de la primera tarea del proyecto ########################################
	var response_T1 = await DBsd(readMessages(),"Genera o imagina o investiga, pero hazlo! y dime los pasos a seguir para hacer la primer tarea del proyecto: " + name + "llamada "+ response2 + "!");
	projectDetails.StepsInsideResume.push(response_T1); //pasos de la tarea 1
	var response_dueDate = await DBsd(
		readMessages(),
		"Genera y dime la fecha de vencimiento de la tarea numero 1 del proyecto en formato AAAA-MM-DD!"
	);
	projectDetails.dateOfSteps.push(response_dueDate); //fecha de vencimiento de la tarea 1
	var page1 = pageGenerator(
		response2,
		database_id,
		response_T1,
		response_dueDate
	);

	//var cronosShow(response2, database_id, response_T1, response_dueDate);

	//for (let i = 2; i <= NumberOfTasks; i++) {
	for (let i = 2; i <= NumberOfTasks; i++) {
		var promptsPages =
			"Genera y dime unica y exclusivamente el nombre de la tarea numero " +
			i +
			" sin otras cosas ni nada de contexto extra o preguntas, UNICAMENTE el nombre de la tarea para llevar a cabo ese proyecto y sin verbos como realizar o hacer!";
		var response2 = await DBsd(readMessages(), promptsPages); //nombre de la tarea i
		projectDetails.Steps.push(response2); //metemos el nombre de la tarea i en el arreglo de tareas
		var response_T1 = await DBsd(readMessages(),"Genera o imagina o investiga, pero hazlo! y dime los pasos a seguir para hacer la primer tarea del proyecto: " + name + "llamada "+ response2 + "!");
		projectDetails.StepsInsideResume.push(response_T1); //metemos los pasos de la tarea i en el arreglo de pasos
		var response_dueDate = await DBsd(
			readMessages(),
			"Genera y dime la fecha de vencimiento de la tarea numero " +
				i +
				" del proyecto en formato AAAA-MM-DD!"
		);
		projectDetails.dateOfSteps.push(response_dueDate); //metemos la fecha de vencimiento de la tarea i en el arreglo de fechas
		var page1 = pageGenerator(
			response2,
			database_id,
			response_T1,
			response_dueDate
		);

		//var cronos1 = cronosShow(response2, database_id, response_T1, response_dueDate);
	}
	//mandamos las cosas a la base de datos postgresSQL
	//to create the database we need to create a table with the name of the project and the tasks

	console.log(
		"fin de la creacion de la base de datos y las paginas de las tareas"
	);

	var database_id_whitout_dash = database_id.replace(/-/g, "");
	console.log("https://www.notion.so/" + database_id_whitout_dash);

	var sortedRows1 = await sortedRows(database_id);

	var sorts = await sorts1(database_id);
	console.log("this is the data base");
	//console.log(responseFromDB);
  console.log(responseFromDB.data.public_url);
  var proyect_Notion_url = responseFromDB.data.public_url;
	//we need to add to responseFromDB a json for show the details of the project task and steps, and the insides of the project
	insertProjectAndTasks(projectDetails, id_user1, proyect_Notion_url);

	// Add project details to the responseFromDB JSON
	responseFromDB.projectDetails = projectDetails;
	//console.log(projectDetails);

	// Add the modified responseFromDB to the response
	res.json(responseFromDB);
});

async function insertProjectAndTasks(projectDetails, id_user1, proyect_Notion_url) {
  try {
    const projectInsertResult = await executeQuery(
      "INSERT INTO proyectos (nombre, user_id, proyect_notion_url) VALUES ($1, $2, $3) RETURNING proyecto_id;",
      [projectDetails.DatabaseName[0], id_user1, proyect_Notion_url]
    );
    const projectId = projectInsertResult.rows[0].proyecto_id;

    for (const [index, step] of projectDetails.Steps.entries()) {
      const taskInsertResult = await executeQuery(
        "INSERT INTO tareas (proyecto_id, numero_de_tareas, fecha_de_los_pasos, completitud) VALUES ($1, $2, $3, $4) RETURNING tarea_id;",
        [projectId, projectDetails.NumberOfTasks[index], projectDetails.dateOfSteps[index], false]
      );
      const taskId = taskInsertResult.rows[0].tarea_id;

      await executeQuery(
        "INSERT INTO pasos (tarea_id, descripcion, steps_inside_resume) VALUES ($1, $2, $3);",
        [taskId, step, projectDetails.StepsInsideResume[index]]
      );
    }

    console.log('Proyecto y tareas insertadas correctamente.');
  } catch (err) {
    console.error('Error al insertar proyecto y tareas:', err);
  }
}



const resetProjectDetails = () => {
	projectDetails = {
		DatabaseName: [],
		NumberOfTasks: [],
		Steps: [],
		dateOfSteps: [],
		completionOfSteps: [],
		StepsInsideResume: [],
	};
};

const sortedRows = async (database_id) => {
	const response = await notion.databases.query({
		database_id: database_id,
		sorts: [
			{
				property: "Name",
				direction: "ascending",
			},
		],
	});
	return response;
};

async function sorts1(database_id1) {
	const response = await notion.databases.query({
		database_id: database_id1,
		sorts: [
			{
				property: "DueDate",
				direction: "ascending",
			},
		],
	});
	//console.log(response);
	return response;
}

//funcion para en cronos mostrar las tareas, pasos proyecto etc.
async function cronosShow(
	response2,
	database_id,
	response_T1,
	response_dueDate
) {
	//necesitamos hacer que esta la muestre en la pagina web
	//console.log(response2);
	//console.log(response_T1);
	//console.log(response_dueDate);
	//console.log(database_id);
	return { message: "success!" };
}

//funcion para generar la base de datos
async function dbGenerator(response1, pageId, ded) {
	projectDetails.DatabaseName.push(response1);
	try {
		const newDb = await notion.databases.create({
			parent: {
				type: "page_id",
				page_id: pageId,
			},
			title: [
				{
					type: "text",
					text: {
						content: response1,
					},
				},
			],
			properties: {
				Name: {
					title: {},
				},
				DueDate: {
					date: {},
				},
				Completed: {
					checkbox: {},
				},
			},
			sorts: [
				{
					property: "DueDate",
					direction: "ascending",
				},
			],
		});
		return { message: "success!", data: newDb };
	} catch (error) {
		return { message: "error", error };
	}
}

//funcion para generar las paginas de las tareas
async function pageGenerator(response2, pageId, response_T1, dueDate) {
	try {
		const newPage = await notion.pages.create({
			parent: {
				type: "database_id",
				database_id: pageId,
			},
			properties: {
				Name: {
					title: [
						{
							text: {
								content: response2,
							},
						},
					],
				},
				DueDate: {
					date: {
						start: dueDate, // Formato esperado "AAAA-MM-DD"
					},
				},
			},
			children: [
				{
					object: "block",
					paragraph: {
						rich_text: [
							{
								text: {
									content: response_T1,
								},
							},
						],
					},
				},
			],
		});
		return { message: "success!", data: newPage };
	} catch (error) {
		return { message: "error", error };
	}
}

//funcion para generar el nombre de la base de datos a partir de la respuesta del usuario + ?
async function DBsd(response1, prompts) {
	//funcion para generar el nombre de la base de datos a partir de la respuesta del usuario
	let messages = await readMessages(); // Leer mensajes del archivo JSON
	let userQuestion = response1 || messages;

	//generate the response with the user question
	messages.push({ role: "user", content: prompts + userQuestion }); // Agregar la nueva pregunta del usuario
	const completion = await openai.chat.completions.create({
		model: model1,
		messages: messages,
	});

	messages.push({
		role: "assistant",
		content: completion.choices[0].message.content,
	}); // Agregar la respuesta del asistente
	//await writeMessages(messages); // Guardar los mensajes actualizados en el archivo JSON
	await writeMessages(messages); // Guardar los mensajes actualizados en el archivo JSON

	console.log(completion.choices[0].message);
	console.log(completion.choices[0].message.content);
	return completion.choices[0].message.content;
}

async function DBsd1(response1, prompts) {
	//funcion para generar el nombre de la base de datos a partir de la respuesta del usuario
	let messages = await readMessages(); // Leer mensajes del archivo JSON
	let userQuestion = response1 || messages;

	//generate the response with the user question
	messages.push({ role: "user", content: prompts + userQuestion }); // Agregar la nueva pregunta del usuario
	const completion = await openai.chat.completions.create({
		model: model1,
		messages: messages,
	});

	messages.push({
		role: "assistant",
		content: completion.choices[0].message.content,
	}); // Agregar la respuesta del asistente
	//await writeMessages(messages); // Guardar los mensajes actualizados en el archivo JSON
	await writeMessages(messages); // Guardar los mensajes actualizados en el archivo JSON

	console.log(completion.choices[0].message);
	console.log(completion.choices[0].message.content);
	return completion.choices[0].message.content;
}


async function readMessages() {
	const data = await fs.readFile("messages.json", "utf8");
	return JSON.parse(data);
}

// Create new page. The database ID is provided in the web form.
app.post("/pages", async function (request, response) {
	const { dbID, pageName, header } = request.body;

	try {
		const newPage = await notion.pages.create({
			parent: {
				type: "database_id",
				database_id: dbID,
			},
			properties: {
				Name: {
					title: [
						{
							text: {
								content: pageName,
							},
						},
					],
				},
			},
			children: [
				{
					object: "block",
					heading_2: {
						rich_text: [
							{
								text: {
									content: header,
								},
							},
						],
					},
				},
			],
		});
		response.json({ message: "success!", data: newPage });
	} catch (error) {
		response.json({ message: "error", error });
	}
});

const listener = app.listen(port, function () {
	console.log("Your app is listening on port " + listener.address().port);
});

async function writeMessages(messages) {
	await fs.writeFile(
		"messages.json",
		JSON.stringify(messages, null, 2),
		"utf8"
	);
}
