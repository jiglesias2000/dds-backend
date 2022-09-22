// https://dev.to/nedsoft/testing-nodejs-express-api-with-jest-and-supertest-1km6

describe("Ejemplo simple", () => {
  it("should test that true === true", () => {
    expect(true).toBe(true);
  });
});

const request = require("supertest");
const app = require("../index");

describe("Tesetear pagina inicial", () => {
  it("Devuelve el index.html", async () => {
    const res = await request(app).get("/index.html");
    expect(res.statusCode).toEqual(200);
  });
});

describe("Tesetear error sincrono", () => {
  it("Devuelve el msj de error", async () => {
    const res = await request(app).get("/testerrorsincrono");
    expect(res.statusCode).toEqual(500);
  });
});

describe("## Varios", () => {
  describe("#GET _isalive", () => {
    it("Deberia devolver ok", async () => {
      const res = await request(app).get("/_isalive");
      expect(res.statusCode).toEqual(200);
      expect(res.text).toBe("ok");
    });
  });

  describe("# GET 404", () => {
    it("should return 404 status", async () => {
      const res = await request(app).get("/urlinexistente");
      expect(res.statusCode).toEqual(404);
      expect(res.text).toBe("No encontrada!");
      //expect(res.header).toHaveProperty('token');
    });
  });
});
