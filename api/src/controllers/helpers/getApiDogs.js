require("dotenv").config();
const URL_API = process.env.URL_API;
const axios = require("axios");

const getApiDogs = async () => {
  /*  debe traer todos los perros con las siguiente informacion:
       -id (el front no lo pide, pero para identificar si viene de DB o API)
       -Imagen.
       -Nombre.
       -Peso. 
       -Temperamentos.
       {id, image, name, weight, temperaments}
       */
  const response = await axios.get(URL_API);
  const dogsApi = response.data;
  const transformedArray = dogsApi.map((dog) => ({
    id: dog.id,
    image: `https://cdn2.thedogapi.com/images/${dog.reference_image_id}.jpg`,
    name: dog.name,
    weight: dog.weight.metric,
    temperament: dog.temperament ? dog.temperament.split(", ") : [],
    height: dog.height.metric,
    life_span: dog.life_span,
  }));
  return transformedArray;
};

module.exports = getApiDogs;
