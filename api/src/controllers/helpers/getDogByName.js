const buscarSimilitudes = require("./functions/buscarSimilitudes");
const getAllDogs = require("./getAllDogs");

const getDogByName = async (name) => {
  const allDogs = await getAllDogs();
  const dogs = await buscarSimilitudes(name, allDogs);
  return dogs;
};

module.exports = getDogByName;
