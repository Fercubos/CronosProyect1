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

import indexRoutes from './routes/index.js';


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
app.use(express.static(__dirname + "/views"));
app.use('/', indexRoutes);




var user = "alejandro1";
var proyectosCronos = "1";
var numP = "";
//Routes
//http://expressjs.com/en/starter/basic-routing.html




//Empezando server

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
