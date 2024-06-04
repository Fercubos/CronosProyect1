import passport from "passport";
import session from "express-session";
import flash from "connect-flash";
import express from "express";
import cors from "cors";
import fs from "fs/promises"; // Import fs/promises para manejar archivos de forma asíncrona
import ejs from "ejs";
import axios from "axios";
import fetch from "node-fetch";
import path from "path";
import engine from "ejs-mate";
import morgan from "morgan";
import jquery from "jquery";

//Initializations
//manejo de la hora y fecha
const port = process.env.PORT || 443;
const app = express();

//__dirname lo localizamos en

//settings
//app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.engine("ejs", engine);

//Middlewares
//manejo de cors y express para el servidor web
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
//app.use(express.static(path.join(__dirname, 'public'))); //Para que se puedan ver los archivos estaticos
const __dirname = path.resolve(path.dirname(""));
app.use(express.static(__dirname + "/public"));

var user = "alejandro1";
var proyectosCronos = "1";
var numP = "";
//Routes
//http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
	//ruta principal
	response.render(__dirname + "/views/layout/index3.ejs", {
		usuario1: user,
		proyects: "desactive",
	});
});

app.get("/Proyects", async function (request, response) {
	//ruta para los proyectos
	console.log("Proyectos");
	console.log(request.body);
	var proyectosCronos = await fetch("http://localhost:4120/giveProyects", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});
	console.log("fetching");
	
	proyectosCronos = await proyectosCronos.json();

	console.log(proyectosCronos.proyects);

	//si la respuesta es un res status 204 no hay proyectos
	if (proyectosCronos.proyects == "No hay proyectos registrados.") {
		console.log("No hay proyectos registrados. en el if");
		response.render(__dirname + "/views/layout/index3.ejs", {
			usuario1: "1",
			proyects: "active",
			usuario1: "proyectaso",
			proyectosCronos: "",
			numP: "",
			proyectSelected : "",
			taskSelected : "",
			noExistenProyectos : "true",

		});
	} else {
		console.log("NOMBRE: " + proyectosCronos.proyectos[0].nombre);

		console.log("PRUEBA: " + proyectosCronos.proyectos.length);
		var numPer = proyectosCronos.proyectos.length;
			
		console.log("tareas [] " + proyectosCronos.proyectos[0].tareas[0]);
		console.log("tareas [] " + proyectosCronos.proyectos[3].tareas[0]);
		var proyectSelected = 0;
		if(request.query.projectId != undefined){
			proyectSelected = request.query.projectId;
		}
		var taskSelected = 0;
		if(request.query.taskId != undefined){
			taskSelected = request.query.taskId;
		}

		console.log(request.query.projectId);
		console.log(request.query.taskId);
		//como hago para que imprima las tareas de cada proyecto sin imprimir object object
		console.log(proyectosCronos)

		response.render(__dirname + "/views/layout/index3.ejs", {
			proyects: "active",
			usuario1: "proyectaso",
			proyectosCronos: proyectosCronos,
			numP: numPer,
			proyectSelected : proyectSelected,
			taskSelected : taskSelected,
		});
		}
	});






	app.post("/databases", async (req, res) => {
		//ruta para obtener las bases de datos de notion
		console.log(req.body);
		var response = JSON.stringify(req.body);
		try {
			var databases = await fetch("http://localhost:4120/databases", {
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

//Empezando server

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
