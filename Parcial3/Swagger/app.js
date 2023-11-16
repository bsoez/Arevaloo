const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');
const redoc = require('redoc-express');
const swaggerJsDoc = require('swagger-jsdoc');
const app = express();
const ruta_usuario = require('./routes/ruta_usuario');

const { SwaggerTheme } = require('swagger-themes');
const theme = new SwaggerTheme('v3'); // Specifying the Swagger Version
const styleTheme = theme.getBuffer('dark'); // Getting a Style

// Middleware para Swagger
const swaggerOptions = {
    definition: {
        openapi: '3.1.0',
        info: {
            title: 'API Usuarios',
            version: '1.0.0',
        },
        servers: [
            { url: "http://localhost:8080" }
        ],
    },
    apis: [`${path.join(__dirname, "./routes/ruta_usuario.js")}`],
    explorer: true,
    customCss: styleTheme
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Configuracionn de registro de acceso
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs, swaggerOptions));

// Ruta para Redoc
app.get('/redoc', redoc({
    title: 'API Usuarios - Redoc',
    specUrl: '/api-definition', // La URL de tu archivo swagger-definition.json
    theme: {
        colors: {
            primary: { main: '#4592e6' },
        },
    },
}));


const swaggerDefinition = require('./swagger-definition.json');
app.get('/api-definition', (req, res) => {
    res.json(swaggerDefinition);
});

//READ.me
app.get('/readme', (req, res) => {
    const readmeContent = fs.readFileSync(path.join(__dirname, 'README.md'), 'utf8');
    res.send(readmeContent);
});


// Rutas de usuarios
app.use('/usuarios', ruta_usuario.router);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log("Server Express escuchando en el puerto " + PORT);
});