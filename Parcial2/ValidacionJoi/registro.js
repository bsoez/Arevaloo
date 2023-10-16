const Joi = require('joi');

module.exports = {
    registroSchema: Joi.object({
        usuario: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required(),

        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
            .required(),

        confirmar_password: Joi.ref('password'),
        nombre: Joi.string().required(),
        edad: Joi.number()
            .integer()
            .min(0)
            .max(150)
            .required(),

        calle: Joi.string().required(),
        ciudad: Joi.string().required(),

        correo: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
            .required(),

        fecha_registro: Joi.date().iso().required()
    }),
}