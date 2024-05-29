const express = require('express');
const router = express.Router();
const passport = require('passport');
const pg = require('pg');

router.get('/', (req, res, next) => {
    res.render('index');
});

router.get('/signup', (req, res, next) => {
    res.render('signup');
});

router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup', //NO SE NECESITA EL RENNDER? 
    passReqToCallback: true //Para que se pueda acceder a la peticion
}));


router.get('/signin', (req, res, next) => {
    res.render('signin');
});

router.post('/signin', passport.authenticate('local-signin', {
    successRedirect: '/profile',
    failureRedirect: '/signin',
    passReqToCallback: true //Para que se pueda acceder a la peticion
}));

router.get('/profile', (req, res, next) => { //Aqui poner lo de Este wey
    res.render('profile');
});
module.exports = router;