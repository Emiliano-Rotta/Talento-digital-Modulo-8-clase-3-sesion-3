const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./middlewares/logger');
const reservasRoutes = require('./routes/reservasRoutes');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(logger);

// Rutas
app.use('/reservas', reservasRoutes);

// Inicio del servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

