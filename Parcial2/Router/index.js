const express = require('express');
const tec = require('./tec.js')
const app = express();

app.use('/alumnos',tec.router);

app.listen(8080,function(err){
    if(err)console.log(err);
    console.log("Servidor escuchando en puerto 8080")
})