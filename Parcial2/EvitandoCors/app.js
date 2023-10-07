const express = require('express');
const app = express();
var cors = require('cors')
app.use(express.json())

//Antes del Cors
app.get("/alumnas", (req, resp) => {
    resp.json({ mensaje: "Servidor Express contestando a petición con CORS" }); 
});

app.use(cors())

//Submit y Fetch
app.get("/alumnos", (req, resp) => {
    resp.json({ mensaje: "Servidor Express contestando a petición" }); 
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log("Server Express escuchando en el puerto " + PORT);
});