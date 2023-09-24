const express = require('express');
const basicAuth = require('express-basic-auth');

const app = express();
const port = 8080;

const users = {
  belen: 'belencita123',
};

app.use(basicAuth({
  users,
  challenge: true,
  unauthorizedResponse: 'Acceso no autorizado',
}));

app.use((req, res, next) => {
  if (req.auth) {
    next();
  } else {
    res.status(401).send('Acceso no autorizado');
  }
});

app.get('/repos', async (req, res) => {
  try {
    const response = await fetch('https://api.github.com/users/bsoez/repos', {
      headers: {
        Authorization: `Basic ${Buffer.from('admin:password123').toString('base64')}`,
      },
    });
    const repos = await response.json();

    res.json(repos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los repositorios de GitHub' });
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});