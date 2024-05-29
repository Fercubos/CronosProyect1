const express = require('express');
const engine = require('ejs-mate');
const path = require('path');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
const { error } = require('console');


//Initializations
const app = express();
require('./database'); //Para que se conecte a la base de datos
require('./passport/local-auth'); //Para que se conecte a la autenticacion
//settings
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3000);

//Middlewares
app.use(session({ //Para que se inicie la sesion
    secret:'mysecret',
    resave: false, //Para que no se guarde la sesion cada vez que se haga una peticion
    saveUninitialized: false //Para que no se guarde la sesion si no se ha inicializado
}));
app.use(flash()); //Para que se puedan enviar mensajes entre vistas
app.use(passport.initialize()); //Para que passport se inicie
app.use(passport.session()); //Para que passport se inicie en sesion    
app.use(morgan('dev'));    //Para ver las peticiones que llegan al servidor
app.use(express.urlencoded({extended: false})); //Para que el servidor entienda los datos que envia el usuario

app.use((req, res, next) => {
    app.locals.signinMessage = req.flash('signinMessage');
    app.locals.signupMessage = req.flash('signupMessage');
    app.locals.user = req.user;
    console.log(app.locals)
    next();
});
app.use(express.static(path.join(__dirname, 'public'))); //Para que se puedan ver los archivos estaticos
//configuraciones para recibir otros tipos de datos que necesitaremos es el json



//Routes
app.use('/', require('./routes/index'));
//Empezando server

app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});