// https://dev.to/nedsoft/testing-nodejs-express-api-with-jest-and-supertest-1km6

describe("Ejemplo simple, test que no falla", () => {
  it("Simplemente compruebo si true === true", () => {
    expect(true).toBe(true);
  });
});

const request = require("supertest");
const app = require("../index");


describe("## Varios", () => {
  

  describe("#GET _isalive", () => {
    it("Deberia devolver ok", async () => {
      const res = await request(app).get("/_isalive");
      expect(res.statusCode).toEqual(200);
      expect(res.text).toEqual("ok");
    });
  });

  describe("# GET 404", () => {
    it("Deberia devolver error 404 y su texto apropiado", async () => {
      const res = await request(app).get("/urlinexistente");
      expect(res.statusCode).toEqual(404);
      expect(res.text).toEqual("No encontrada!");
    });
  });
});
