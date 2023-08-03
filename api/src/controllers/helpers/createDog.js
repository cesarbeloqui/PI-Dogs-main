const { Dog, Temperament } = require("../../db");
const getAllDogs = require("./getAllDogs");
const verificaData = require("./functions/verificaData");
const buscarExacto = require("./functions/buscarExacto");
const getDogById = require("./getDogById");
const findOrCreateTemperaments = require("./findOrCreateTemperaments");

const createDog = async (req) => {
// Obtiene el objeto "dog" del cuerpo de la solicitud
const dog = req.body;
// Obtiene todos los perros de la base de datos
const dogs = await getAllDogs();
// Busca el perro existente en la base de datos que coincide exactamente con el objeto "dog"
// La función buscarExacto() devuelve un objeto con la propiedad "id" si existe el perro o la propiedad "exists" si no existe
const idExists = buscarExacto(dog, dogs).id || buscarExacto(dog, dogs).exists;

// Verifica si el objeto "dog" contiene todos los datos requeridos
// Si falta algún dato, se devuelve { created: false, dog }
if (!verificaData(dog)) {
  return { created: false, dog };
} else if (idExists) {
  // Si el objeto "dog" ya existe en la base de datos, busca el perro encontrado y determina si es editable o no
  const dogFound = await getDogById(idExists);
  const editable = typeof idExists === "number" ? false : true;
  // Devuelve el objeto { editable, dogFound }
  return { editable, dogFound };
} else {
  // Si el objeto "dog" no existe en la base de datos, se crea uno nuevo
  const createdDog = await Dog.create(dog);
  // Busca o crea los temperamentos relacionados con el perro
  const arrayIdTemperaments = await findOrCreateTemperaments(dog.temperament);
  // Asocia los temperamentos al perro creado
  const arrayPromises = arrayIdTemperaments.map((id) =>
    createdDog.addTemperament(id)
  );
  await Promise.all(arrayPromises);
  // Busca el perro creado en la base de datos y devuelve el objeto { created: true, dogCreado }
  const dogCreado = await getDogById(createdDog.id);

  return { created: true, dogCreado };
}
};

module.exports = createDog;
