import express from 'express';
import passport from 'passport';
import bcrypt from 'bcryptjs';
import { pool } from '../database.js'; // Asegúrate de que la extensión del archivo sea correcta


const router = express.Router();
var user = "alejandro1";
// Ruta principal de la aplicación AAronRespondeporElla
router.get("/cronos1", checkNotAuthenticated ,function (request, response) {
	//ruta principal
	response.render("layout/index3.ejs", {
		usuario1: request.user.name,
		proyects: "desactive",
		user_id1: request.user.id,
	});
});

router.get("/Proyects", checkNotAuthenticated , async function (request, response) {
	//ruta para los proyectos
	console.log("Proyectos");
	console.log(request.query);
	const NameUser = request.query.usuario1; 
	console.log(NameUser);
	//anadimos nameUser para que se sepa cuales proyectos solicitamos
	var proyectosCronos = await fetch("http://localhost:4120/giveProyects", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ NameUser }),
	});
	console.log("fetching");
	
	proyectosCronos = await proyectosCronos.json();

	console.log(proyectosCronos.proyects);

	//si la respuesta es un res status 204 no hay proyectos
	if (proyectosCronos.proyects == "No hay proyectos registrados.") {
		console.log("No hay proyectos registrados. en el if");
		response.render("layout/index3.ejs", {
			proyects: "active",
			usuario1: request.user.name,
			user_id1: request.user.id,
			proyectosCronos: "",
			numP: "",
			proyectSelected : "",
			taskSelected : "",
			noExistenProyectos : "true",
			notion_url : "",

		});
	} else {
		console.log("NOMBRE: " + proyectosCronos.proyectos[0].nombre);

		console.log("PRUEBA: " + proyectosCronos.proyectos.length);
		var numPer = proyectosCronos.proyectos.length;

		//console.log("tareas [] " + proyectosCronos.proyectos[0].tareas[0]);
		//console.log("tareas [] " + proyectosCronos.proyectos[3].tareas[0]);
		var proyectSelected = 0;
		if(request.query.projectId != undefined && request.query.projectId != null){
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
		console.log(proyectSelected);
		console.log(taskSelected);
		try{
			
			if (proyectosCronos.proyectos[proyectSelected].proyect_notion_url != null){
				var notion_url = proyectosCronos.proyectos[proyectSelected].proyect_notion_url || "";
				console.log(notion_url);		
			}
		}catch(e){
			console.log("No hay url de notion");
		}
		

		response.render("layout/index3.ejs", {
			proyects: "active",
			proyectosCronos: proyectosCronos,
			usuario1: request.user.name,
			user_id1: request.user.id,
			noExistenProyectos : "false",
			numP: numPer,
			proyectSelected : proyectSelected,
			taskSelected : taskSelected,
			notion_url : notion_url || "",
			
		});
		}
	});






router.post("/databases", async (req, res) => {
		//ruta para obtener las bases de datos de notion
		console.log(req.body);
		var response = JSON.stringify(req.body);
		console.log("heydwadwadwadwa");
		console.log(response);
		
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
// Endpoint para manejar el formulario de registro

router.get('/signup', checkAuthenticated, (req, res) => {
    res.render('signup');
});

router.get("/",checkAuthenticated ,function (req, res) {
	//ruta principal
     res.render('signup');
});

// Endpoint para manejar el formulario de registro
router.post('/signup', async (req, res) => {
    let { name, email, password, password2 } = req.body;
    let errors = [];

    console.log({
        name,
        email
    });

    // Validaciones
    if (!name || !email || !password || !password2) {
        errors.push({ message: 'Please enter all fields' });
    }
    if (password.length < 8) {
        errors.push({ message: 'Password must be at least 8 characters long' });
    }
    if (password !== password2) {
        errors.push({ message: 'Passwords do not match' });
    }

    if (errors.length > 0) {
        res.render('signup', { errors });
    } else {
        try {
            // Encriptar la contraseña
            const hashedPassword = await bcrypt.hash(password, 10);
            console.log('Hashed Password:', hashedPassword);

            // Verificar si el usuario ya existe
            const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
            console.log('User lookup result:', result.rows);
            if (result.rows.length > 0) {
                errors.push({ message: 'Email already registered' });
                return res.render('signup', { errors });
            }

            // Insertar el nuevo usuario en la base de datos
            const insertResult = await pool.query(
                'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, password',
                [name, email, hashedPassword]
            );
            console.log('Insert result:', insertResult.rows);
            req.flash('success_msg', 'You are now registered. Please log in');
            res.redirect('/signin');
        } catch (err) {
            console.error('Error during signup:', err);
            errors.push({ message: 'An error occurred during signup' });
            res.render('signup', { errors });
        }
    }
});

router.get('/signin', checkAuthenticated, (req, res) => {
    res.render('signin');
});

router.post('/signin', (req, res, next) => {
    let { email, password } = req.body;
    console.log({
        email
    });
    passport.authenticate("local", {
        successRedirect: '/cronos1',
        failureRedirect: '/signin',
        failureFlash: true
    })(req, res, next);
});

router.get("/dashboard", checkNotAuthenticated, (req, res) => {
    console.log(req.isAuthenticated());
    res.render("dashboard", { user: req.user.name });
});

router.get("/logout", (req, res, next) => {
    req.logOut((err) => {
        if (err) { return next(err); }
        req.flash("success_msg", "You have successfully logged out.");
        res.redirect("/signin");
    });
});

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/cronos1');
    }
    next();
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/signin');
}

export default router;
