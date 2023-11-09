const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const app = express();
const ruta_usuario = require('./routes/ruta_usuario');

// Middleware para Swagger
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Usuarios',
            version: '1.0.0',
        },
        servers: [
            { url: "http://localhost:8080" }
        ],
    },
    apis: [`${path.join(__dirname, "./routes/ruta_usuario.js")}`],
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Configuración de registro de acceso
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// Ruta Swagger
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

// Rutas de usuarios
app.use('/usuarios', ruta_usuario.router);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log("Server Express escuchando en el puerto " + PORT);
});