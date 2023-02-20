
/* Importar los módulos necesarios */
const express = require('express');
const conexion = require('./database/connection');
const controladorPortafolio = require('./api/portafolio/controller');
const controladorUsuarios = require('./api/usuarios/controller');
const bodyparser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
require('dotenv').config();

/* Configuración inicial de la aplicación */
const app = express();
const port = process.env.PORT || 2826;

// Configurar el uso de body-parser para tratar datos enviados en el cuerpo de la petición
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

// Configurar el uso de morgan para registrar las solicitudes HTTP en la consola
app.use(morgan(process.env.MORGAN));

// Configurar el uso de cors para permitir solicitudes desde orígenes diferentes
app.use(cors());

// Configurar el uso de helmet para mejorar la seguridad de la aplicación
app.use(helmet());

// Configurar el uso de compresión para reducir el tamaño de las respuestas HTTP
app.use(compression());

/* Iniciar las rutas */
// Usar el controlador de portafolio en la ruta /api/portafolio
app.use("/api/portafolio", controladorPortafolio);

// Usar el controlador de usuarios en la ruta /api/usuarios
app.use("/api/usuarios", controladorUsuarios );

// Conectar a la base de datos y escuchar en el puerto especificado
conexion.conectar()
.then(function () {
app.listen(port, function () {
console.log("API ejecutándose en el puerto:" + port);
});
})
.catch(function (error) {
console.error(error);
})

