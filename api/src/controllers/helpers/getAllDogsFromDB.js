const { Dog, Temperament } = require("../../db");

const getAllDogsFromDB = async () => {
  try {
    /*  debe traer todos los perros con las siguiente informacion:
       -id (el front no lo pide, pero para identificar si viene de DB o API)
       -Imagen.
       -Nombre.
       -Peso. 
       -Temperamentos.
       {id, image, name, weight, temperaments}
       */
    // Obtener todos los perros con sus temperamentos desde la base de datos
    const dogs = await Dog.findAll({
      attributes: ["id", "image", "name", "weight", "height", "life_span"],
      include: [
        {
          model: Temperament,
          attributes: ["name"],
          through: {
            attributes: [], // No incluir atributos de la tabla intermedia (DogTemperament)
          },
        },
      ],
    });

    // Formatear la respuesta en el formato deseado
    const formattedDogs = dogs.map(
      ({ id, weight, height, name, life_span, temperaments, image }) => ({
        id,
        image,
        name,
        weight,
        temperament: temperaments?.map((t) => t.name) || [],
        height,
        life_span,
      })
    );

    return formattedDogs;
  } catch (error) {
    console.error(
      "Error al obtener perros desde la base de datos:",
      error.message
    );
    throw error;
  }
};

module.exports = getAllDogsFromDB;

/* 

para crear un registro dogs:

INSERT INTO dogs (id, image, name, height, weight, life_span)
VALUES ('f47ac10b-58cc-4372-a567-0e02b2c3d479', 'https://example.com/dog_image.jpg', 'Max', '20 - 25', '12 - 20', '10 - 12 years');

INSERT INTO dogs (id, image, name, height, weight, life_span)
VALUES ('94bada4a-7b22-4e8e-9f07-c461e570a8ae', 'https://example.com/another_dog_image.jpg', 'Buddy', '30 - 35', '25 - 30', '8 - 10 years');


para crear un registro temperaments:

INSERT INTO temperaments (id, name)
VALUES ('1a251f95-62f1-4eb2-99b8-8d1e16d0836d', 'Buenito');
INSERT INTO temperaments (id, name)
VALUES ('2a251f95-62f1-4eb2-99b8-8d1e16d0836d', 'Malito');

SELECT * FROM "DogTemperament";

INSERT INTO "DogTemperament" ("dogId", "temperamentId")
VALUES ('f47ac10b-58cc-4372-a567-0e02b2c3d479', '1a251f95-62f1-4eb2-99b8-8d1e16d0836d');

INSERT INTO "DogTemperament" ("dogId", "temperamentId")
VALUES ('94bada4a-7b22-4e8e-9f07-c461e570a8ae', '2a251f95-62f1-4eb2-99b8-8d1e16d0836d');

INSERT INTO "DogTemperament" ("dogId", "temperamentId")
VALUES ('94bada4a-7b22-4e8e-9f07-c461e570a8ae', '1a251f95-62f1-4eb2-99b8-8d1e16d0836d');

INSERT INTO "DogTemperament" ("dogId", "temperamentId")
VALUES ('f47ac10b-58cc-4372-a567-0e02b2c3d479', '1a251f95-62f1-4eb2-99b8-8d1e16d0836d');

INSERT INTO "DogTemperament" ("dogId", "temperamentId")
VALUES ('f47ac10b-58cc-4372-a567-0e02b2c3d479', '2a251f95-62f1-4eb2-99b8-8d1e16d0836d');

*/
