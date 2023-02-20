

const jwt = require('jsonwebtoken');
require('dotenv').config();

function generarToken(datos) {
    let payload = {
        "id":datos._id,
        "nombre":datos.nombre,
        "roles":datos.roles
    }
    const token = jwt.sign(payload, process.env.JWT_CLAVE, {
        expiresIn: process.env.JWT_EXPIRES || '1d'
    });

    return token;
}

module.exports = {
    generarToken
};

