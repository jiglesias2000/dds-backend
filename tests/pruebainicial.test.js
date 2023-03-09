const request = require("supertest");
const app = require("../index");

describe("Ejemplo simple, test que no falla", () => {
  it("Simplemente compruebo si true === true", () => {
    expect(true).toBe(true);
  });
});

describe("GET hola mundo", () => {
  it("Deberia devolver Hola mundo!", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toEqual(200);
    expect(res.text).toEqual('Hola mundo!');
  });
});

describe("GET _isalive", () => {
  it("Deberia devolver ejecutandose desde ...", async () => {
    const res = await request(app).get("/_isalive");
    expect(res.statusCode).toEqual(200);
    expect(res.text).toContain('Ejecutandose desde:');
  });
});

describe("GET 404", () => {
  it("Deberia devolver error 404 y su texto apropiado", async () => {
    const res = await request(app).get("/urlinexistente");
    expect(res.statusCode).toEqual(404);
    expect(res.text).toEqual("No encontrada!");
  });
});
