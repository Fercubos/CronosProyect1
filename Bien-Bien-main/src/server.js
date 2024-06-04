const express = require('express');
const engine = require('ejs-mate');
const path = require('path');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');
const flash = require('express-flash');
require('dotenv').config(); // para las variables de entorno

// Initializations
const app = express();
const initializePassport = require('./lib/local-auth'); // Para que se conecte a la autenticacion
initializePassport(passport); // Para que se inicie la autenticacion

// Settings
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(morgan('dev')); // Para ver las peticiones que llegan al servidor
app.use(express.urlencoded({ extended: false })); // Para que el servidor entienda los datos que envia el usuario
app.use(session({ // Para que se inicie la sesion
    secret: 'mysecret',
    resave: false, // Para que no se guarde la sesion cada vez que se haga una peticion
    saveUninitialized: false // Para que no se guarde la sesion si no se ha inicializado
}));
app.use(passport.initialize()); // Para que passport se inicie
app.use(passport.session()); // Para que passport se inicie en sesion
app.use(flash()); // Para que se puedan enviar mensajes entre vistas    
app.use(express.static(path.join(__dirname, 'public'))); // Para que se puedan ver los archivos estaticos

// Routes
app.use('/', require('./routes/index')); // Para que se conecte a las rutas

// Starting the server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});
