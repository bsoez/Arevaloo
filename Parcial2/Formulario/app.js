const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const { ConnectionPool } = require('mssql');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

// Configuración de registro de acceso
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'});
app.use(morgan('combined', {stream: accessLogStream}));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: true }));

const config = {
    user: 'barevalo',
    password: 'are_p@ss23*',
    server: 'affinitysql.database.windows.net', 
    database: 'Affinity', 
    options: {
        encrypt: true
    }
};



// POST
app.post("/usuarios", async (req, res) => {
    try {
        const nombre = req.body.nombre; 
        const edad = req.body.edad;
        const juegoFavorito = req.body.juegoFavorito;

        const pool = new ConnectionPool(config);
        await pool.connect();

        const result = await pool
            .request()
            .input('nombre', nombre)
            .input('edad', edad)
            .input('juegoFavorito', juegoFavorito)
            .query('INSERT INTO PruebaApiRest VALUES (@nombre, @edad, @juegoFavorito)');

        await pool.close();

        if (result.rowsAffected[0] === 1) {
            res.status(200).json({ mensaje: "Información agregada correctamente" });
        } else {
            res.status(400).json({ mensaje: "Error al agregar la información" });
        }

    } catch (error) {
        console.error("Error de conexión:", error.message);
        res.status(500).json({ mensaje: "Error de conexión" });
  
    }
});



// CONSULTAR
app.get("/usuarios", async (req, res, next) => {
    try {
    
        const pool = new ConnectionPool(config);
        await pool.connect();

        const result = await pool.request().query('SELECT * FROM PruebaApiRest');

        await pool.close();

        res.json(result.recordset);
    } catch (error) {
        next (error);
    }
});


//ELIMINAR
app.delete("/usuarios", async (req, res) => {
    try {

        const edad = req.query.edad;
        const pool = new ConnectionPool(config);
        await pool.connect();

        const result = await pool
            .request()
            .input('edad', edad)
            .query('DELETE FROM PruebaApiRest WHERE Edad = @edad');

        await pool.close();

        if (result.rowsAffected[0] > 0) {
            res.status(200).json({ mensaje: "Se eliminó correctamente" });
        } else {
            res.status(404).json({ mensaje: "Registro no eliminado" });
        }
    } catch (error) {
        console.error("Error de conexión:", error.message);
        res.status(500).json({ mensaje: "Error de conexión" });
    }
});


// ACTUALIZAR
app.put("/usuarios", async (req, res) => {
    try {

        const edad = req.query.edad;
        const juegoFavorito = req.query.juegoFavorito;
        const pool = new ConnectionPool(config);
        await pool.connect();

        const result = await pool
            .request()
            .input('juegoFavorito', juegoFavorito)
            .input('edad', edad)
            .query('UPDATE PruebaApiRest SET Edad = @edad WHERE JuegoFavorito = @juegoFavorito');

        await pool.close();

        if (result.rowsAffected[0] > 0) {
            res.status(200).json({ mensaje: "Se actualizó correctamente" });
        } else {
            res.status(404).json({ mensaje: "Registro no actualizado" });
        }

        // res.json(result.recordset);
    } catch (error) {
        console.error("Error de conexión:", error.message);
        res.status(500).json({ mensaje: "Error de conexión" });
    }
});

//CONSULTA POR PARAMETRO
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


app.use((err, req, res, next) => {
    res.status(500).send(err.message);
});


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log("Server Express escuchando en el puerto " + PORT);
});