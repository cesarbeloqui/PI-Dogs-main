/* const { conn, Dog, Temperament } = require("../../src/db");
const { beforeEach, test, expect, afterEach } = require("mocha");

describe("Pruebas de Modelos y Relaciones", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("No se pudo conectar a la base de datos:", err);
    })
  );
  beforeEach(async () => {
    await conn.sync({ force: true });
  });

  describe("Dog", () => {
    test("Debe existir el modelo Dog", () => {
      expect(Dog).toBeDefined();
    });
describe("Pruebas de Modelos y Relaciones", () => {
  describe("Dog", () => {
    it("Debe existir el modelo Dog", () => {
      expect(Dog).toBeDefined();
    });
    
    test("Debe tener las propiedades correctas", async () => {
      const dog = await Dog.build({
        image: "https://example.com/dog.jpg",
        name: "Pug",
        height: "30 cm",
        weight: "10 kg",
        "años de vida": "12 años",
      });
      const keys = ["id", "image", "name", "height", "weight", "años de vida"];
      expect(Object.keys(dog.toJSON())).toEqual(keys);
    });

    test("La propiedad image no puede ser null", async () => {
      expect.assertions(1);
      try {
        await Dog.create({
          name: "Beagle",
          height: "40 cm",
          weight: "12 kg",
          "años de vida": "14 años",
        });
      } catch (error) {
        expect(error.message).toBeDefined();
      }
    });

    test("La propiedad name no puede ser null", async () => {
      expect.assertions(1);
      try {
        await Dog.create({
          image: "https://example.com/beagle.jpg",
          height: "40 cm",
          weight: "12 kg",
          "años de vida": "14 años",
        });
      } catch (error) {
        expect(error.message).toBeDefined();
      }
    });

    test("La propiedad height no puede ser null", async () => {
      expect.assertions(1);
      try {
        await Dog.create({
          image: "https://example.com/beagle.jpg",
          name: "Beagle",
          weight: "12 kg",
          "años de vida": "14 años",
        });
      } catch (error) {
        expect(error.message).toBeDefined();
      }
    });

    test("La propiedad weight no puede ser null", async () => {
      expect.assertions(1);
      try {
        await Dog.create({
          image: "https://example.com/beagle.jpg",
          name: "Beagle",
          height: "40 cm",
          "años de vida": "14 años",
        });
      } catch (error) {
        expect(error.message).toBeDefined();
      }
    });

    test("La propiedad años de vida no puede ser null", async () => {
      expect.assertions(1);
      try {
        await Dog.create({
          image: "https://example.com/beagle.jpg",
          name: "Beagle",
          height: "40 cm",
          weight: "12 kg",
        });
      } catch (error) {
        expect(error.message).toBeDefined();
      }
    });

    test("No debe contener los timestamps automáticos: createdAt y updatedAt", async () => {
      const dog = await Dog.create({
        image: "https://example.com/beagle.jpg",
        name: "Beagle",
        height: "40 cm",
        weight: "12 kg",
        "años de vida": "14 años",
      });
      const timestamps = ["createdAt", "updatedAt"];
      expect(Object.keys(dog.toJSON())).not.toEqual(
        expect.arrayContaining(timestamps)
      );
    });
  });

  describe("Temperament", () => {
    test("Debe existir el modelo Temperament", () => {
      expect(Temperament).toBeDefined();
    });

    test("Debe tener las propiedades correctas", async () => {
      const temperament = await Temperament.build({
        name: "Calmado",
      });
      const keys = ["ID", "name"];
      expect(Object.keys(temperament.toJSON())).toEqual(keys);
    });

    test("La propiedad name no puede ser null", async () => {
      expect.assertions(1);
      try {
        await Temperament.create({});
      } catch (error) {
        expect(error.message).toBeDefined();
      }
    });
  });

  after(async () => {
    await conn.close();
  });
});
 */