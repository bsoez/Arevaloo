const express = require('express');
const { ConnectionPool } = require('mssql');
const router = express.Router();

const config = {
  user: 'barevalo',
  password: 'are_p@ss23*',
  server: 'affinitysql.database.windows.net', 
  database: 'Affinity', 
  options: {
      encrypt: true
  }
};

/**
 * @swagger
 * /usuarios:
 *   get:
 *     description: Obtiene todos los usuarios.
 *     responses:
 *       200:
 *         description: Se obtienen los usuarios con éxito.
 */

router.get('/', async (req, res) => {
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

router.post('/', async (req, res) => {
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


/**
 * @swagger
 * /usuarios:
 *   delete:
 *     summary: Eliminar información basada en la edad.
 *     parameters:
 *       - in: query
 *         name: edad
 *         required: true
 *         description: Edad del registro a eliminar.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Información eliminada correctamente.
 *       404:
 *         description: No se encontró información con la edad proporcionada.
 *       400:
 *         description: La edad no puede estar vacía o nula.
 *       500:
 *         description: Error de conexión.
 */
router.delete('/', async (req, res) => {
    try {
        const edad = req.query.edad;

        // Verificar que la edad no esté vacía o nula
        if (!edad || edad.trim() === '') {
            return res.status(400).json({ mensaje: "La edad no puede estar vacía o nula" });
        }

        const pool = new ConnectionPool(config);
        await pool.connect();

        const result = await pool
            .request()
            .input('edad', edad)
            .query('DELETE FROM PruebaApiRest WHERE edad = @edad');

        await pool.close();

        if (result.rowsAffected[0] > 0) {
            res.status(200).json({ mensaje: "Información eliminada correctamente" });
        } else {
            res.status(404).json({ mensaje: "No se encontró información con la edad proporcionada" });
        }
    } catch (error) {
        console.error("Error de conexión:", error.message);
        res.status(500).json({ mensaje: "Error de conexión" });
    }
});

    
/**
 * @swagger
 * /usuarios:
 *   put:
 *     summary: Actualizar información basada en la edad.
 *     parameters:
 *       - in: query
 *         name: edad
 *         required: true
 *         description: Edad del registro a actualizar.
 *         schema:
 *           type: integer
 *       - in: query
 *         name: nombre
 *         description: Nuevo nombre.
 *         schema:
 *           type: string
 *       - in: query
 *         name: nuevaEdad
 *         description: Nueva edad.
 *         schema:
 *           type: integer
 *       - in: query
 *         name: juegoFavorito
 *         description: Nuevo juego favorito.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Información actualizada correctamente.
 *       404:
 *         description: No se encontró información con la edad proporcionada.
 *       400:
 *         description: La edad no puede estar vacía o nula.
 *       500:
 *         description: Error de conexión.
 */
    router.put('/', async (req, res) => {
        try {
            const edad = req.query.edad;
            const nombre = req.query.nombre;
            const nuevaEdad = req.query.nuevaEdad;
            const juegoFavorito = req.query.juegoFavorito;
    
            console.log(edad)
            // Verificar que la edad no esté vacía o nula
            if (!edad || edad.trim() === '') {
                return res.status(400).json({ mensaje: "La edad no puede estar vacía o nula" });
            }
    
            // Verificar que al menos uno de los campos (nombre, nuevaEdad, juegoFavorito) esté presente
            if (!nombre && !nuevaEdad && !juegoFavorito) {
                return res.status(400).json({ mensaje: "Al menos uno de los campos (nombre, nuevaEdad, juegoFavorito) debe estar presente" });
            }
    
            const pool = new ConnectionPool(config);
            await pool.connect();
    
            const result = await pool
                .request()
                .input('edad', edad)
                .input('nombre', nombre)
                .input('nuevaEdad', nuevaEdad)
                .input('juegoFavorito', juegoFavorito)
                .query('UPDATE PruebaApiRest SET nombre = @nombre, edad = @nuevaEdad, juegoFavorito = @juegoFavorito WHERE edad = @edad');
    
            await pool.close();
    
            if (result.rowsAffected[0] > 0) {
                res.status(200).json({ mensaje: "Información actualizada correctamente" });
            } else {
                res.status(404).json({ mensaje: "No se encontró información con la edad proporcionada" });
            }
        } catch (error) {
            console.error("Error de conexión:", error.message);
            res.status(500).json({ mensaje: "Error de conexión" });
        }
    });

module.exports.router=router;