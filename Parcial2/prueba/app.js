const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const folder = path.join(__dirname+'/archivos/');

const storage = multer.diskStorage({ 
    destination: function (req, file, cb) { cb(null, folder) }, 
    filename: function (req, file, cb) { cb(null, file.originalname)} });

const upload = multer({ storage: storage })

const app = express(); 
app.use(cors());
app.use(express.urlencoded({extended: true,})); 
app.use(upload.single('archivo'));

app.post('/usuario/', (req, res) => {
    console.log(`Se recibio el archivo: ${req.file.originalname}`); 
    console.log('Se recibio el formulario: '+JSON.stringify(req.body)); 
    res.json(req.body);
});

app.use((req, res)=>{
    res.status(404).json({estado: "Pagina-Ruta No Encontrada"})
});
app.listen(8082, ()=>{
    console.log("Servidor Express corriendo y escuchando en el puerto 8082")
});