const LocalStrategy = require('passport-local').Strategy;
const { pool } = require('../database');
const bcrypt = require('bcryptjs');

function initialize(passport) {
    console.log("Passport initialized");

    const authenticateUser = (email, password, done) => {


        pool.query('SELECT * FROM users WHERE email = $1', [email], (err, results) => {
            if (err) {
                console.error("Database query error:", err);
                return done(err);
            }

            console.log("Database query results:", results.rows);

            if (results.rows.length > 0) {
                const user = results.rows[0];
                console.log("User found:", user);

                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) {
                        console.error("Bcrypt compare error:", err);
                        return done(err);
                    }

                    if (isMatch) {
                        console.log("Password match");
                        return done(null, user);
                    } else {
                        console.log("Password does not match");
                        return done(null, false, { message: "Password is incorrect" });
                    }
                });
            } else {
                console.log("No user with that email address");
                return done(null, false, {
                    message: "No user with that email address"
                });
            }
        });
    };

    passport.use(
        new LocalStrategy(
            { usernameField: "email", passwordField: "password" },
            authenticateUser
        )
    );

    passport.serializeUser((user, done) => {
        console.log("Serialize user:", user.id);
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        pool.query('SELECT * FROM users WHERE id = $1', [id], (err, results) => {
            if (err) {
                console.error("Deserialize user error:", err);
                return done(err);
            }
            console.log("Deserialize user results:", results.rows[0]);
            done(null, results.rows[0]);
        });
    });
}

module.exports = initialize;
