/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Dog, conn } = require("../../src/db.js");
const getApiDogs = require("../../src/controllers/helpers/getApiDogs.js");

const agente = session(app);
const perro = {
  name: "Beagle",
  image: "beagle-image-url",
  height: "35-41 cm",
  weight: "9-11 kg",
  life_span: "12-15 años",
  temperament: [
    "Amiable",
    "Even Tempered",
    "Excitable",
    "Determined",
    "Gentle",
    "Intelligent",
  ],
};
const dogAPI = {
  image: "https://cdn2.thedogapi.com/images/B1uW7l5VX.jpg",
  name: "Labrador Retriever",
  weight: "25 - 36",
  temperament: [
    "Kind",
    "Outgoing",
    "Agile",
    "Gentle",
    "Intelligent",
    "Trusting",
    "Even Tempered",
  ],
  height: "55 - 62",
  life_span: "10 - 13 years",
};

describe("Rutas de dogs", () => {
  before(async () => {
    try {
      await conn.authenticate();
    } catch (error) {
      console.error("No se pudo conectar a la base de datos:", error);
    }
  });

  beforeEach(async () => {
    await Dog.sync({ force: true });
    await Dog.create(perro);
  });

  describe("GET /dogs", () => {
    it("debería obtener un código de respuesta 200", () =>
      agente.get("/dogs").expect(200));

    it("debería traer los datos en el formato requerido", async () => {
      const response = await agente.get("/dogs").expect(200);
      expect(response.body).to.be.an("array");

      // Verificar que cada objeto en el arreglo tenga solo las propiedades permitidas
      response.body.forEach((obj) => {
        expect(obj).to.have.all.keys(
          "id",
          "image",
          "name",
          "weight",
          "temperament"
        );
      });
    });
  });

  describe("GET /dogs/idRaza", () => {
    it("se le manda un id valido y debería obtener un código de respuesta 200", async () => {
      const { id } = await Dog.findOne({ where: { name: "Beagle" } });
      const response = await agente.get(`/dogs/${id}`).expect(200);
      expect(response.body).to.be.an("object");
    });

    it("debería responder un status 200 y en el body un objeto con la informacion requerida", async () => {
      const { id } = await Dog.findOne({ where: { name: "Beagle" } });
      const response = await agente.get(`/dogs/${id}`).expect(200);
      expect(response.body).to.have.all.keys(
        "id",
        "image",
        "name",
        "height",
        "weight",
        "temperament",
        "life_span"
      );
    });
  });

  describe("POST /dogs", () => {
    it("se le manda un perro existente en la API externa y debería retornar que no es editable y el perro registrado en la API", async () => {
      const response = await agente
        .post("/dogs")
        .send(dogAPI)
        .set("Content-Type", "application/json");
      expect(response.status).to.equal(400);
      expect(response.body).to.deep.equal({
        editable: false,
        dogFound: {
          id: 149,
          image: "https://cdn2.thedogapi.com/images/B1uW7l5VX.jpg",
          name: "Labrador Retriever",
          weight: "25 - 36",
          temperament: [
            "Kind",
            "Outgoing",
            "Agile",
            "Gentle",
            "Intelligent",
            "Trusting",
            "Even Tempered",
          ],
          height: "55 - 62",
          life_span: "10 - 13 years",
        },
      });
    });

    it("debería retornar un código de respuesta 400 y el objeto esperado si se le pasa un perro de la base de datos", async () => {
      const response = await agente
        .post("/dogs")
        .send(perro)
        .set("Content-Type", "application/json")
        .then((response) => {
          var { id, temperament, ...responseDog } = response.body.dogFound;
          response.body.dogFound = responseDog;
          var { id, temperament, ...dogModel } = perro;
          let perri = { ...dogModel };
          expect(response.status).to.equal(400);
          const Model = {
            editable: true,
            dogFound: { ...perri },
          };

          expect(response.body).to.deep.equal(Model);
        });
    });

    it("debería retornar un 400 si no se envían todos los datos requeridos", async () => {
      const dogData = {
        image: "https://cdn3.thedogapi.com/images/HJAFgxcNQ.jpg",
        name: "Labrador Retr",
        weight: "29 - 45",
        height: "29 - 45",
        temperament: ["Travieso", "denso"],
      };
      const response = await agente.post("/dogs").send(dogData);
      expect(response.status).to.equal(400);
      expect(response.body).to.deep.equal({
        created: false,
        dog: {
          image: "https://cdn3.thedogapi.com/images/HJAFgxcNQ.jpg",
          name: "Labrador Retr",
          weight: "29 - 45",
          height: "29 - 45",
          temperament: ["Travieso", "denso"],
        },
      });
    });

    it("debería retornar un status 200 y el perro creado si se envían todos los datos requeridos", async () => {
      const dogData = {
        image: "https://cdn3.thedogapi.com/images/HJAFgxcNQ.jpg",
        name: "Labrador Retrie",
        weight: "29 - 45",
        temperament: ["Travieso", "denso"],
        height: "29 - 45",
        life_span: "16",
      };
      const response = await agente.post("/dogs").send(dogData);
      expect(response.status).to.equal(200);
      expect(response.body.created).to.be.true;
      expect(response.body.dogCreado).to.have.all.keys(
        "id",
        "image",
        "name",
        "weight",
        "temperament",
        "height",
        "life_span"
      );
    });
  });
});
