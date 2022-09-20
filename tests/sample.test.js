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

describe("GET /api/articulosfamilias/:id", function () {
  it("respond with json containing a single artciulosfamilias", function (done) {
    request(app)
      .get("/api/articulosfamilias/1")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});
