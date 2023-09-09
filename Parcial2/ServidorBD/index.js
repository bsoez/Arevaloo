const express = require('express');
const morgan = require('morgan');
const fs = require("fs");
const path = require('path');
const mssql = require('mssql');
const app = express();

var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
app.use(morgan('combined', { stream: accessLogStream }));

// Configuración de la conexión a SQL Server
const config = {
    user: '...',       
    password: '...',  
    server: 'localhost',
    database: '...',   
    options: {
        encrypt: true, // Para conexiones seguras
    },
}

// Ruta para obtener usuarios
app.get("/usuarios", async (req, res) => {
    try {
        // Conectar a SQL Server
        const pool = await mssql.connect(config);

        // Realizar una consulta
        const result = await pool.request().query('SELECT * FROM Lab5 WHERE id = @value', {
            name: 'value', 
            type: mssql.Int,
            value: 123, 
        });

        // Enviar resultados como JSON
        res.json(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al realizar la consulta a la base de datos.' });
    } finally {
        // Cerrar la conexión a SQL Server
        mssql.close();
    }
});

// Iniciar el servidor
const port = 3000;
app.listen(port, () => {
    console.log(`Servidor Express en ejecución en el puerto ${port}`);
});
