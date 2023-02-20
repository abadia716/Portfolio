const Project = require("./model");

// Obtener todos los proyectos
async function getAllProjects() {
try {
const projects = await Project.find();
return projects;
} catch (error) {
console.log(error);
throw new Error("Error al obtener los proyectos");
}
}

// Obtener un proyecto por su id
async function getProjectById(id) {
try {
const project = await Project.findById(id);
return project;
} catch (error) {
console.log(error);
throw new Error("Error al obtener el proyecto");
}
}

// Crear un proyecto
async function createProject(projectData) {
try {
const project = new Project(projectData);
await project.save();
return project;
} catch (error) {
console.log(error);
throw new Error("Error al crear el proyecto");
}
}

// Actualizar un proyecto
async function updateProject(id, projectData) {
try {
const project = await Project.findByIdAndUpdate(id, projectData, { new: true });
return project;
} catch (error) {
console.log(error);
throw new Error("Error al actualizar el proyecto");
}
}

// Eliminar un proyecto
async function deleteProject(id) {
try {
const project = await Project.findByIdAndDelete(id);
return project;
} catch (error) {
console.log(error);
throw new Error("Error al eliminar el proyecto");
}
}

module.exports = {
getAllProjects,
getProjectById,
createProject,
updateProject,
deleteProject
};