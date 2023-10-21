const express = require('express');
const fs = require('fs');
const yaml = require('js-yaml');
const app = express();
const port = 3000;

// Ruta para leer y parsear el archivo YAML
app.get('/leer-yaml', (req, res) => {
  try {
    const yamlFile = fs.readFileSync('data.yaml', 'utf8');
    const data = yaml.load(yamlFile);
    res.json(data);
  } catch (e) {
    console.error(e);
    res.status(500).send('Error al leer y parsear el archivo YAML.');
  }
});

app.listen(port, () => {
  console.log(`Servidor Express en ejecución en http://localhost:${port}`);
});
