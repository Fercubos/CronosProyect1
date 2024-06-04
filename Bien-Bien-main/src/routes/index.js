const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const { pool } = require('../database');

router.get('/', (req, res, next) => {
    res.render('index');
});

router.get('/signup', checkAuthenticated, (req, res) => {
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
        successRedirect: '/dashboard',
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
        return res.redirect('/dashboard');
    }
    next();
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/signin');
}

module.exports = router;
