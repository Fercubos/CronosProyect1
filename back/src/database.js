const mongoose = require('mongoose');
const { mongodb } = require('./keys'); // Importa la URI de la base de datos


mongoose.connect(mongodb.URI, {}
)
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err)
)

