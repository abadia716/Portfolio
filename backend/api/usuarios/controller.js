const express = require("express");
const controladorUsuarios = express.Router();
const servicioUsuarios = require('./service');

/*
  datosUsuario: {
    "nombre": xxxxxx,
    "usuario": xxxxx,
    "password" xxxxx,
    "rol":["A","B",..."n"]
  } 
*/

// Ruta para iniciar sesión
controladorUsuarios.get("/iniciarSesion", async (req, res) => {
  const datosUsuario = req.body;
  const resultado = await servicioUsuarios.iniciarSesion(datosUsuario);
  console.log(datosUsuario);
  res.send(resultado);
});



// Agregar manejador de ruta para obtener usuarios
controladorUsuarios.get("/obtenerUsuarios", async (req, res) => {
  // Llamar al servicio para obtener usuarios
  const usuarios = await servicioUsuarios.obtenerUsuarios();

  // Validar si se obtuvo una respuesta valida
  if (!usuarios) {
    // Enviar un mensaje de error en caso de que la respuesta sea inválida
    res.status(500).send({ mensaje: "Error al obtener usuarios" });
  } else {
    // Enviar respuesta con los usuarios
    res.send({ usuarios });
  }
});

// Ruta para crear un usuario
controladorUsuarios.post("/crearUsuario", async (req, res) => {
  const datosUsuario = req.body;
  const resultado = await servicioUsuarios.crearUsuario(datosUsuario);
  res.send(resultado);
});

// Ruta para actualizar un usuario
controladorUsuarios.put("/actualzarUsuario/:id", async (req, res) => {
  const id = req.params.id;
  const datos = req.body;
  const resultado = await servicioUsuarios.actualizarUser(id, datos);
  res.send(resultado);
});

// Ruta para eliminar un usuario
controladorUsuarios.delete("/eliminarUsuario/:id", async (req, res) => {
  const id = req.params.id;
  const resultado = await servicioUsuarios.eliminarUsuario(id);
  res.send(resultado);
});


module.exports = controladorUsuarios;