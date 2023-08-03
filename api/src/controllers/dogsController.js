const getAllDogs = require("./helpers/getAllDogs");
const filterDate = require("./helpers/functions/filterDate");
const getDogById = require("./helpers/getDogById");
const armaString = require("./helpers/functions/armaString");
const getDogByName = require("./helpers/getDogByName");
const createDog = require("./helpers/createDog");

const dogsController = {
  getAllDogs: async (_req, res) => {
    try {
      const dogs = filterDate(await getAllDogs());
      res.status(200).json(dogs);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error al obtener perros" });
    }
  },
  getDogById: async (req, res) => {
    try {
      const id = req.params.id;
      const dog = await getDogById(id);
      dog
        ? res.status(200).json(dog)
        : res.status(400).json({ error: "El perro no existe" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error al obtener el perro" });
    }
  },
  getDogByName: async (req, res) => {
    try {
      const name = req.query.name;

      const dogs = await getDogByName(name);
      name
        ? res.status(200).json(dogs)
        : res.status(400).json({ error: `${armaString(req)}` });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error al obtener el perro" });
    }
  },
  createDog: async (req, res) => {
    try {
      const response = await createDog(req);
      response.created ? res.status(200).json(response): res.status(400).json(response)
    } catch (error) {
      res.status(500).json({ error });
    }
  },
};

module.exports = dogsController;
