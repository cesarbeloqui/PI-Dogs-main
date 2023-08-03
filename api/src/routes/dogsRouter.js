const { Router } = require("express");
const {
  getAllDogs,
  getDogById,
  getDogByName,
  createDog,
} = require("../controllers/dogsController");

const dogsRouter = Router();

dogsRouter.get("/name", getDogByName);
dogsRouter.get("/", getAllDogs); // Obtener todos los perros
dogsRouter.get("/:id", getDogById); // Obtener un perro por su ID
dogsRouter.post('/', createDog); // Crear un nuevo perro
/*
dogsRouter.put('/:id', dogsController.updateDog); // Actualizar un perro por su ID
dogsRouter.delete('/:id', dogsController.deleteDog); // Eliminar un perro por su ID */

module.exports = dogsRouter;
