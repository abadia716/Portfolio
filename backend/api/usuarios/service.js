const express = require('express');
const bcrypt = require('bcrypt');
const modeloUsuarios = require('./model');
const jwt = require('../auth/jwt');
require('dotenv').config();




// Función asíncrona para iniciar sesión
async function iniciarSesion(datosUsuario) {
  // Resultado a retornar
  let resultado = {};

  // Buscar el usuario en la base de datos
  let datos = datosUsuario.usuario;
  let usuario = await modeloUsuarios.buscarUsuario(datos);

  // Verificar si se encontró un error al buscar el usuario
  

  // Verificar si se encontró el usuario
  if (!usuario) {
    console.log(usuario);
    resultado.mensaje = "Usuario o Clave Incorrectos";
    resultado.datos = datosUsuario;
    return resultado;
  }

  // Verificar que la clave proporcionada coincida con la encriptada en la base de datos
  let esValida = bcrypt.compareSync(datosUsuario.clave, usuario.clave);
  if (!esValida) {
    console.log(datos);
    resultado.mensaje = "Usuario o Clave Incorrectos";
    resultado.datos = datosUsuario;
    return resultado;
  }

  // Generar el token y retornar resultado
  resultado.mensaje = "Inicio de Sesión Correcto";
  let token = jwt.generarToken(usuario);
  delete usuario.clave;
  resultado.token = token;
  return resultado;
}





// Función para obtener todos los usuarios
async function obtenerUsuarios() {
    try {
      // Realizar la búsqueda de todos los usuarios
      const usuarios = await modeloUsuarios.findAll();
  
      // Verificar que se haya encontrado al menos un usuario
      if (usuarios.length > 0) {
        return {
          success: true,
          message: "Usuarios obtenidos con éxito",
          usuarios,
        };
      } else {
        return {
          success: false,
          message: "No se encontraron usuarios",
        };
      }
    } catch (error) {
      return {
        success: false,
        message: "Ocurrió un error al obtener los usuarios",
        error,
      };
    }
  }
  
 
  
  async function crearUsuario (datosUsuario){
    let resultado = {};
    if (datosUsuario && Object.keys(datosUsuario).length > 0) {
        if (datosUsuario.usuario && datosUsuario.clave) {
            // Verifica si el usuario ya existe en la base de datos
            let usuarioExiste = await modeloUsuarios.buscarPorUsuario(datosUsuario.usuario);
            if (usuarioExiste) {
                resultado.mensaje = "El usuario ya existe";
                resultado.datos = datosUsuario;
                return resultado;
            }

            // Continúa con la creación del usuario
            const saltRounds = 10;
            const salt = bcrypt.genSaltSync(saltRounds);
            let claveEncriptada = bcrypt.hashSync(datosUsuario.clave, salt);
            datosUsuario.clave = claveEncriptada;
            let resultadoCrear = await modeloUsuarios.crearUno(datosUsuario);
            if (resultadoCrear && resultadoCrear.acknowledged) {
                resultado.mensaje = "Usuario creado correctamente";
                resultado.datos = resultadoCrear;
            } else {
                resultado.mensaje = "Usuario no creado";
                resultado.datos = datosUsuario;
            }
        } else {
            resultado.mensaje = "Usuario y clave deben existir";
            resultado.datos = datosUsuario;
        }
    } else {
        resultado.mensaje = "No hay datos";
        resultado.datos = datosUsuario;
    }
    return resultado;
};


async function actualizarUsuario(id, datos){
    let resultado = {};
    if (id && id.length == 24){
        if (datos && Object.keys(datos).length > 0){
            if (datos.nombre && datos.nombre !== ""){
                let resConsulta = await modeloUsuarios.actualizarUna(id, datos); 
                    if (resConsulta && resConsulta.acknowledged){
                        resultado.mensaje = "Usuario Actualizado correctamente";
                        resultado.datos = resConsulta;
                    } 
                    else {
                          resultado.mensaje = "Error al actualizar";
                          resultado.datos = resConsulta;  
                    }               
            } 
            else {
                resultado.mensaje = "Titulo vacio";
                resultado.datos = datos.nombre ? datos.nombre :"" ;
            }
        } 
        else {
                resultado.mensaje = "No hay datos";
                resultado.datos = datos;
        }
   } 
    else {
        resultado.mensaje = "ID invalido";
        resultado.datos = id;
    }
    return resultado;
};

async function eliminarUsuario(id){
    let resultado = {};
    if (id && id.length == 24 && /^[0-9A-F]+$/i.test(id)){
        let resultadoEliminar = await modeloUsuarios.eliminarUna(id); 
                if        (resultadoEliminar  && resultadoEliminar.acknowledged){
                          resultado.mensaje = "Usuario eliminado correctamente";
                          resultado.datos = resultadoEliminar;
                    } 
                else {
                          resultado.mensaje = "Error al eliminar";
                          resultado.datos = id;  
                    }               
             } 
                else {
                          resultado.mensaje = "ID invalido";
                          resultado.datos = id;
                     }
     return resultado;
};


// Exportar la función

module.exports.crearUsuario = crearUsuario;
module.exports.iniciarSesion = iniciarSesion;
module.exports.obtenerUsuarios = obtenerUsuarios;
module.exports.actualizarUsuario = actualizarUsuario;
module.exports.eliminarUsuario = eliminarUsuario;

