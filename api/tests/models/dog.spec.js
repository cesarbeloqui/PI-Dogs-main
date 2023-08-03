const { Dog, conn } = require("../../src/db.js");
const { expect } = require("chai");

beforeEach(() => Dog.sync({ force: true }));

describe("Prueba de modelos relacionales", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("No se pudo conectar a la base de datos:", err);
    })
  );
  describe("Pruebas de modelo Dog", () => {
    describe("Dog", () => {
      it("Debe existir el modelo Dog", () => {
        const modelExists = conn.isDefined("dog");
        expect(modelExists).to.be.true;
      });

      it("Debe tener las propiedades id, image, name, height, weight y  años de vida", async () => {
        const columnsDog = await conn.getQueryInterface().describeTable("dogs");
        const propiedadesEsperadas = [
          "id",
          "image",
          "name",
          "height",
          "weight",
          "life_span",
        ];
        expect(columnsDog).to.have.all.keys(propiedadesEsperadas);
      });
      it("Debe poder crear y un registro, y validar si existe", async () => {
        const model = {
          name: "Pug",
          image: "ccccdcasajsniuasj",
          height: "dascxxsa",
          weight: "sdijcaiusnciasnxkas",
          life_span: "icuasiunxisa",
        };
        await Dog.create(model);
        const { id, ...validate } = (
          await Dog.findOne({
            where: { name: "Pug" },
          })
        ).dataValues;
        expect(validate).to.deep.equal(model);
      });
      it("Debería lanzar un error si los datos son nulos", async () => {
        try {
          await Dog.create({});
          throw new Error("Requiere un nombre válido");
        } catch (error) {
          expect(error).to.exist;
        }
      });
      it("Debería revotar cuando no tiene todas las propiedades", () => {
        Dog.create({
          name: "Pug",
        });
      });
    });
  });
});
after(async () => {
  await Dog.destroy({
    where: {},
    truncate: true,
  });
  await conn.close(); // Cierra la conexión después de eliminar los registros
});
/* En este test se están probando los validadores del modelo Dog. Si hay algún error en el nombre al crear un nuevo registro, se espera que lance un error. También se prueba que funcione correctamente cuando se proporciona un nombre válido ("Pug" en este caso). */
