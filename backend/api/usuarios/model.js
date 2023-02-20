const basedatos = require("../../database/connection");
const objectId = require("mongodb").ObjectId;
// let db =  basedatos.obtenerConexion(); permite la conexion db a todas las funciones

/* Modelo 
    Manipular la base de datos
    Obtener, actualizar, guardar, eliminar los envia al servicio
*/



    function findAll() {
        let db =  basedatos.obtenerConexion();
        return db.collection("users").find({}).toArray()
        .then(function (usuarios){
            return usuarios;
        })
        .catch(function (error) {
            console.log(error)
        });

        };

    function obtenerUna(id) {
            let db =  basedatos.obtenerConexion();
             return db.collection("users").findOne({"_id" : objectId(id)})
            .then(function (usuario){
                return usuario;
            })
            .catch(function (error){
                console.log(error);
            })
    };  

async function buscarPorUsuario(usuario) {
        let db =  basedatos.obtenerConexion();
         return await db.collection("users").findOne({"usuario" : usuario})
         .then(function (usuario){
            return usuario;
        })
        .catch(function (error){
            console.log(error);
        })
};    

async function buscarUsuario(datos) {
    let db = basedatos.obtenerConexion();
  
    try {
      let usuario = await db.collection("users").findOne({ usuario: datos });
      return usuario;
    } catch (error) {
      console.error(error);
      return { error: "Error al buscar usuario en la base de datos" };
    }
  }

async function crearUno(datosUsuario){
    let db =  basedatos.obtenerConexion();
     return  await db.collection("users").insertOne(datosUsuario);
};

function actualizarUna(id, datos){
    let db =  basedatos.obtenerConexion();
     return db.collection("users").updateOne(
            {"_id": objectId(id)},
            {"$set": datos}
     )       
    .then(function (resultado){
        console.log(resultado);
        return resultado; 
    })
    .catch(function (error){
        console.log(error);
    })
};


async function buscarPorNombre(nombre) {
    return new Promise((resolve, reject) => {
        modeloUsuarios.find({ nombre: nombre }, (error, usuariosEncontrados) => {
            if (error) {
                reject(error);
            } else {
                resolve(usuariosEncontrados);
            }
        });
    });
}

function eliminarUna(id){
    let db =  basedatos.obtenerConexion();
     return db.collection("users").deleteOne(
            {"_id": objectId(id)},
           
     )       
    .then(function (resultado){
        console.log(resultado);
        return resultado; 
    })
    .catch(function (error){
        console.log(error);
    })
};



    

    module.exports.findAll = findAll;
    module.exports.obtenerUna = obtenerUna;        
    module.exports.crearUno = crearUno; 
    module.exports.actualizarUna = actualizarUna;
    module.exports.eliminarUna = eliminarUna;
    module.exports.buscarPorUsuario = buscarPorUsuario;
    module.exports.buscarUsuario = buscarUsuario;