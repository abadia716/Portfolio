const mongoose = require('mongoose');
const basedatos = require("../../database/connection");


let db =  basedatos.obtenerConexion();

// Conectar a la base de datos de MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase', { useNewUrlParser: true })

  .then(() => console.log('Conexión exitosa a la base de datos '))
  .catch((err) => console.error('Error al conectar a la base de datos', err));

  mongoose.set('strictQuery', false);
const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  technologies: [{ type: String }],
  imageURL: { type: String },
  githubURL: { type: String },
  liveURL: { type: String },
  date: { type: Date, default: Date.now }
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
