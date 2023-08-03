const getApiDogs = require("./getApiDogs");
const getAllDogsFromDB = require("./getAllDogsFromDB");

const getAllDogs = async () => {
  const [dogsApi, dogsDB] = await Promise.all([
    getApiDogs(),
    getAllDogsFromDB(),
  ]);
  const dogs = [...dogsDB, ...dogsApi];
  return dogs;
};

module.exports = getAllDogs;
