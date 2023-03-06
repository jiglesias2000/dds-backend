const request = require("supertest");
const app = require("../index");

describe("GET /api/articulosfamilias", function () {
  it("Devolveria todos los artciulosfamilias", async function () {
    const res = await request(app)
      .get("/api/articulosfamilias")
      .set("Accept", "application/json");
    expect(res.headers["content-type"]).toEqual(
      "application/json; charset=utf-8"
    );
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          IdArticuloFamilia: expect.any(Number),
          Nombre: expect.any(String),
        }),
      ])
    );
  });
});


describe("GET /api/articulosfamilias/:id", function () {
  it("respond with json containing a single artciulosfamilias", async function () {
    const res = await request(app)
      .get("/api/articulosfamilias/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        IdArticuloFamilia: expect.any(Number),
        Nombre: expect.any(String),
      })
    );
  });
});

