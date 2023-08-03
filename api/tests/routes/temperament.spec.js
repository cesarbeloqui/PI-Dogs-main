/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { conn, Temperament } = require("../../src/db.js");
const getAllApiTemp = require("../../src/controllers/helpers/functions/getAllApiTemp.js");

const agente = session(app);

//comprobar si trajo todos los temperaments de la api
describe("Ruta de temperaments", () => {
  before(async () => {
    try {
      await conn.authenticate();
      await Temperament.sync({ force: true });
      const temperamentsArray = await getAllApiTemp();
      for (const temp of temperamentsArray) {
        await Temperament.findOrCreate({
          where: { name: temp },
          defaults: { name: temp },
        });
      }
    } catch (error) {
      console.error("No se pudo conectar a la base de datos:", error);
    }
  });

  describe("GET /temperaments", () => {
    it("debería obtener un código de respuesta 200", () =>
      agente.get("/temperaments").expect(200));

    it("debería traer los datos en el formato requerido", async () => {
      const response = await agente.get("/temperaments").expect(200);
      expect(response.body).to.be.an("array").that.is.not.empty;

      // Verificar que cada objeto en el arreglo tenga solo las propiedades permitidas
      response.body.forEach((obj) => {
        expect(obj).to.have.all.keys("id", "name");
      });
    });
    it("debería coincidir los temperamentos existentes en la API con la respuesta.", async () => {
      const temperamentsAPI = await getAllApiTemp();
      const response = await agente.get("/temperaments").expect(200);
      expect(response.body).to.be.an("array");

      // Verificar que cada objeto en el arreglo tenga solo las propiedades permitidas
      //console.log(response);
      temperamentsAPI.forEach((temp) => {
        const foundTemperaments = response.body.find(
          (item) => item.name === temp
        );

        if (!foundTemperaments) {
          expect.fail(`No se encontró "${temp}" en la respuesta`);
        }
      });
    });
  });
});
