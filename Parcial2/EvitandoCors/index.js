const express = require('express');
const morgan = require('morgan');
const fs     = require('fs');
const path   = require('path');
const app = express();

app.use(express.json());

app.get("/ServidorExpress",(req,res)=>{
    res.json({respuesta:"Contestando"})
});

app.post("/ServidorExpress",(req,res)=>{res.send("Servidor express contestando a peticion GET")
});

app.listen(8080,(req,res)=>{
    console.log("Servidor express escuchando")
})