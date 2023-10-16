const validation = require("./middleware/joivalidation")
const { registroSchema } = require("./registro")
const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.post("/clientes", validation(registroSchema), (req, res) => {
    const { usuario, password, confirmar_password, nombre, edad, calle, ciudad, correo, fecha_registro } = req.body
    res.send(`usuario:${usuario} password:${password}, confirmar_pasword:${confirmar_password}, nombre:${nombre}, 
    edad:${edad}, calle:${calle}, ciudad:${ciudad}, correo:${correo}, fecha_registro:${fecha_registro}`)
})

app.listen(8080, () =>{
    console.log("Servidor express escuchando en el puerto 8080")
})