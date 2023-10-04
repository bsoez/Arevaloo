const express = require('express');
const { checkSchema, validationResult } = require('express-validator');

const app = express();

app.use(express.json());

const usuarioSchema = {
  edad: {
    isNumeric: {
      errorMessage: 'La edad debe ser un número válido',
    },
  },
  correo: {
    isEmail: {
      errorMessage: 'El correo electrónico debe ser válido',
    },
  },
};

app.post('/usuario', checkSchema(usuarioSchema), (req, res) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    console.log(req.body);
    res.json({ mensaje: 'Respuesta a la petición POST' });
  } else {
    res.json(result.array());
  }
});

app.listen(8080, () => {
  console.log('Servidor Express escuchando en el puerto 8080');
});
