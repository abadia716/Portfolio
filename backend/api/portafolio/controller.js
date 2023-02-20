const express = require("express");
const router = express.Router();
const projectService = require("./service");

// Obtener todos los proyectos
router.get("/", async (req, res) => {
  try {
    const projects = await projectService.getAllProjects();
    res.json(projects);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al obtener los proyectos" });
  }
});

// Obtener un proyecto por su id
router.get("/:id", async (req, res) => {
  try {
    const project = await projectService.getProjectById(req.params.id);
    if (!project) {
      res.status(404).json({ message: "Proyecto no encontrado" });
    }
    res.json(project);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al obtener el proyecto" });
  }
});

// Crear un proyecto
router.post("/", async (req, res) => {
  try {
    const project = await projectService.createProject(req.body);
    res.status(201).json(project);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al crear el proyecto" });
  }
});

// Actualizar un proyecto
router.put("/:id", async (req, res) => {
  try {
    const project = await projectService.updateProject(req.params.id, req.body);
    if (!project) {
      res.status(404).json({ message: "Proyecto no encontrado" });
    }
    res.json(project);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al actualizar el proyecto" });
  }
});

// Eliminar un proyecto
router.delete("/:id", async (req, res) => {
  try {
    const project = await projectService.deleteProject(req.params.id);
    if (!project) {
      res.status(404).json({ message: "Proyecto no encontrado" });
    }
    res.json(project);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al eliminar el proyecto" });
  }
});

module.exports = router;
