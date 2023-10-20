const express = require('express');
const https = require('https');
const fs = require('fs');

const app = express();
const port = 8080;

const options = {
  key: fs.readFileSync('ssl/key.pem'),
  cert: fs.readFileSync('ssl/cert.pem')
};

app.get('/', (req, res) => {
  res.send('Hola Mundo');
});

const server = https.createServer(options, app);

server.listen(port, () => {
  console.log(`La aplicación Express con HTTPS está escuchando en el puerto ${port}`);
});
