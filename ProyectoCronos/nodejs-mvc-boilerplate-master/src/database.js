//credenciales
import dotenv from 'dotenv';
dotenv.config();

import pkg from 'pg';
const { Pool } = pkg;
//
const isProduction = process.env.NODE_ENV === "production";

const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

const pool = new Pool({
    connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
    ssl: isProduction,
});

// Prueba de conexión a la base de datos
pool.connect()
    .then(client => {
        return client.query("SELECT NOW()")
    .then(res => {
        console.log("DB is connected:", res.rows[0]);
        client.release();
    })
    .catch(err => {
        client.release();
        console.error("Error executing query", err.stack);
    });
})
    .catch(err => console.error("Connection error", err.stack));

// Exportar el pool para poder usarlo en otros archivos
export { pool };
