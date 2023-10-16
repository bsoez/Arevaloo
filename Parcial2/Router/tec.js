const express = require('express');
const router = express.Router();

router.get('/',function(req,res){
    res.status(200).json({respuesta:"peticion get a ruta"});
})

.post('/',function(req,res){
    res.status(200).json({respuesta:"peticion post a ruta"});
})

.put('/',function(req,res){
    res.status(200).json({respuesta:"peticion put a ruta"});
})

.delete('/',function(req,res){
    res.status(200).json({respuesta:"peticion delete a ruta"});
})

module.exports.router=router;