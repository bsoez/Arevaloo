const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const { ConnectionPool } = require('mssql');
const app = express();

var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'})
app.use(morgan('combined', {stream: accessLogStream}))

const config = {
    user: 'barevalo',
    password: 'are_p@ss23*',
    server: 'affinitysql.database.windows.net', 
    database: 'Affinity', 
    options: {
        encrypt: true
    }
};

app.get("/usuarios", async (req, res) => {
    try {

        const pool = new ConnectionPool(config);
        await pool.connect();

        const result = await pool.request().query('SELECT * FROM PruebaApiRest');

        await pool.close();

        res.json(result.recordset);
    } catch (error) {
        console.error("Error de conexión:", error.message);
        res.status(500).json({ mensaje: "Error de conexión" });
    }
});

app.get("/usuarios/:edad", async (req, res) => {
    console.log(req.params.edad);
    const { edad } = req.params;
    const pool = new ConnectionPool(config);
    await pool.connect();

    try {
        const result = await pool.request().query('SELECT * FROM PruebaApiRest WHERE edad=' + edad);

        if (result.recordset.length === 0) {
            res.status(404).json({ mensaje: "Usuario no existe" });
        } else {
            res.json(result.recordset);
        }
    } catch (error) {
        console.error("Error de consulta:", error.message);
        res.status(500).json({ mensaje: "Error de consulta" });
    } finally {
        await pool.close();
    }
});
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log("Server Express escuchando en el puerto " + PORT);
});