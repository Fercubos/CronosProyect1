//dotenv.config();
import express from "express";
import cors from "cors";
import fs from "fs/promises"; // Import fs/promises para manejar archivos de forma asíncrona
import pg from "pg";
import morgan from "morgan";
import axios from "axios";  // Importa axios para realizar peticiones HTTP



const port = 4102;
const app = express();
const url_of_ngrok = "https://0f46-2806-2f0-5021-fcaa-7cb2-34ac-9755-b738.ngrok-free.app";


const pool = new pg.Pool({
	user: "postgres",
	host: "localhost",
	database: "ChatCronos",
	password: "3312",
	port: 4101,
});


app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.post("/chatMessages", async (req, res) => {
    const { userId } = req.body; // id_cronos del usuario

    try {
        // Buscar el id interno del usuario usando id_cronos
        const userResult = await pool.query('SELECT id FROM users WHERE id_cronos = $1', [userId]);
        if (userResult.rows.length === 0) {
            return res.status(404).json({ error: "Usuario sin mensajes" });
        }
        const internalUserId = userResult.rows[0].id;

        // Recuperar mensajes del usuario ordenados de más nuevo a más viejo
        const messagesResult = await pool.query('SELECT * FROM messages WHERE user_id = $1 ORDER BY message_id DESC', [internalUserId]);
        
        res.json({ messages: messagesResult.rows });
    } catch (error) {
        console.error("Error en la consulta a la base de datos:", error);
        res.status(500).json({ error: "Error al procesar la solicitud" });
    }
});



app.post("/chat", async (req, res) => {
    const { userId, message } = req.body;
    console.log("Mensaje recibido:", message);
    console.log("ID de usuario:", userId);

    try {
        // Buscar el id interno del usuario usando id_cronos
        let userResult = await pool.query('SELECT id FROM users WHERE id_cronos = $1', [userId]);
        let internalUserId;

        // Si no encuentra el usuario, crea uno nuevo
        if (userResult.rows.length === 0) {
            const insertUserResult = await pool.query('INSERT INTO users (id_cronos) VALUES ($1) RETURNING id', [userId]);
            internalUserId = insertUserResult.rows[0].id;  // Obtener el nuevo id generado
        } else {
            internalUserId = userResult.rows[0].id;  // Utilizar el id existente
        }

        // Envío del mensaje al modelo externo
        const response = await axios.post(url_of_ngrok + '/v1/chat/completions', {
            model: "TheBloke/dolphin-2.7-mixtral-8x7b-GGUF",
            messages: [
                { role: "system", content: "te voy a dar instrucciones, contestalas de manera correcta, y consisa en español gracias, tu nombre es CronosAI" },
                { role: "user", content: message }
            ],
            temperature: 0.7,
            max_tokens: 500,
            stream: false
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        });

        // Guardar el mensaje enviado en la base de datos
        await pool.query('INSERT INTO messages (user_id, message) VALUES ($1, $2)', [internalUserId, message]);

        // Extraer la respuesta del asistente de la estructura de la respuesta
        if (response.data && response.data.choices && response.data.choices.length > 0) {
            const modelResponseContent = response.data.choices[0].message;  // Asumiendo que el contenido está directamente bajo 'message'
            // Guardar la respuesta del modelo en la base de datos
            await pool.query('INSERT INTO messages (user_id, message) VALUES ($1, $2)', [internalUserId, modelResponseContent]);
        }
        console.log("Respuesta del modelo:");
        console.log(response.data.choices[0].message)
        res.json({ response: response.data.choices[0].message });
    } catch (error) {
        console.error("Error en la llamada a la API o en la base de datos:", error);
        res.status(500).json({ error: "Error al procesar la solicitud" });
    }
});




app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

