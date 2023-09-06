const express = require('express');

const app = express();

// app.use(express.json());

// app.get("/alumnos/:carrera",(req, res) => {
//     console.log(req.params);
//     console.log(req.query);
//     console.log(req.body);
//     res.send("Servidor express contestando a peticion GET");
// });

// app.post("/alumnos",(req, res) => {
//     res.send("servidor express contestando a peticion POST");
// });

// app.listen(8080,(req, res) => {
//     console.log("Servidor express escuchando");
// });

app.get("/alumnos",(req,res)=>{
    res.json(respuesta:"contestando a peticion get en ruta empleado");
})

app.post("/alumnos",(req,res)=>{
    res.send("contestando a peticion post en ruta empleado");
})

app.listen(8080,()=>{
    console.log("Server express escuchando en el puerto 8080");
})