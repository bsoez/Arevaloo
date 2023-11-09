const express = require('express');
const jwt = require('jsonwebtoken');

const port = 8081;
const app = express();
app.use(express.json()); 

app.post('/login', function (req, res) {
    const user = req.body;
    const token = jwt.sign(user, 'claveSecreta');
    console.log(token);
    res.json({ token });
});

app.get('/sistema', verificarToken, function (req, res) {
    res.json({ mensaje: "Acceso concedido a la ruta sistema" });
});

app.listen(port, () => {
    console.log(`Servidor Express escuchando en el puerto ${port}`);
});

function verificarToken(req, res, next) {
    const token = req.headers.authorization.split(' ')[1]; 
    jwt.verify(token, 'claveSecreta', function (err, decoded) { 
        if (err) {
            res.status(403).json({ error: "Acceso no concedido a la ruta sistema" }); 
        } else {
            next();
        }
    });
}

