const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /usuarios:
 *   get:
 *     description: Obtiene todos los usuarios.
 *     responses:
 *       200:
 *         description: Se obtienen los usuarios con éxito.
 */

router.get('/usuarios', async (req, res) => {
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

/**
 * @swagger
 * /usuarios:
 *   post:
 *     description: Crea un nuevo usuario.
 *     parameters:
 *       - in: query
 *         name: nombre
 *         required: true
 *         schema:
 *           type: string
 *         description: El nombre del usuario.
 *       - in: query
 *         name: edad
 *         required: true
 *         schema:
 *           type: integer
 *         description: La edad del usuario.
 *       - in: query
 *         name: juegoFavorito
 *         required: true
 *         schema:
 *           type: string
 *         description: El juego favorito del usuario.
 *     responses:
 *       200:
 *         description: Usuario creado con éxito.
 *       400:
 *         description: Error al agregar la información o campos vacíos/nulos.
 */

router.post('/usuarios', async (req, res) => {
    try {
        const nombre = req.query.nombre;
        const edad = req.query.edad;
        const juegoFavorito = req.query.juegoFavorito;

        // Verificar que los campos no estén vacíos o nulos
        if (!nombre || nombre.trim() === '' || !edad || edad.trim() === '' || !juegoFavorito || juegoFavorito.trim() === '') {
            return res.status(400).json({ mensaje: "Los campos no pueden estar vacíos o nulos" });
        }        

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


module.exports = router;
