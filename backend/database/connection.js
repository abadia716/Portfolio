// /* conexion singleton a la base de datos, es decir, una sola instancia a
//   Mongodb que inyectara la info a traves de la api */

// Importa el módulo MongoClient para establecer la conexión con MongoDB
const mongoClient = require("mongodb").MongoClient;

// Importa las variables de entorno para acceder a la URI y nombre de la base de datos
require("dotenv").config();

// Declara una variable para almacenar la conexión una vez que se establece
let conexion;

// Función para conectar a la base de datos
const conectar = function () {
  return new Promise(function (resolve, reject) {
    // Verifica si ya existe una conexión
    if (conexion) {
      // Si existe, devuelve una promesa resuelta
      resolve();
    } else {
      // Si no existe, establece una nueva conexión
      mongoClient.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
      .then(function (client) {
        // Almacena la conexión en la variable conexión
        conexion = client.db(process.env.MONGODB_DB);
        console.log("Conexión a la base de datos exitosa");
        // Devuelve una promesa resuelta
        resolve();
      })
      .catch(function (error) {
        // Si hay un error al conectar, devuelve una promesa rechazada con el error
        reject(error);
      } )
    }
  });
}

// Función para obtener la conexión actual
const obtenerConexion = function () {
    return conexion;
}

// Exporta las funciones conectar y obtenerConexion para ser utilizadas en otros módulos
module.exports = {conectar,obtenerConexion};


