const request = require("supertest");
const app = require("../index");
const articulo = { IdArticulo: 1, Nombre: "Articulo 1", Precio: 10.5 };

// test route/articulos GET
describe("GET /api/articulos", () => {
  it("Deberia devolver todos los articulos", async () => {
    const res = await request(app).get("/api/articulos");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          IdArticulo: expect.any(Number),
          Nombre: expect.any(String),
          Precio: expect.any(Number),
        }),
      ])
    );
    
  });
});

// test route/articulos/:id GET
describe("GET /api/articulos/:id", () => {
  it("Deberia devolver el articulo con el id 1", async () => {
    const res = await request(app).get("/api/articulos/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        IdArticulo: expect.any(Number),
        Nombre: expect.any(String),
        Precio: expect.any(Number),
      })
    );
  });
});

// test route/articulos POST
describe("POST /api/articulos", () => {
  it("Deberia devolver el articulo que acabo de crear", async () => {
    const res = await request(app).post("/api/articulos").send(articulo);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        IdArticulo: expect.any(Number),
        Nombre: expect.any(String),
        Precio: expect.any(Number),
      })
    );
  });
});

// test route/articulos/:id PUT
describe("PUT /api/articulos/:id", () => {
  it("Deberia devolver el articulo con el id 1 modificado", async () => {
    const res = await request(app).put("/api/articulos/1").send(articulo);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        IdArticulo: expect.any(Number),
        Nombre: expect.any(String),
        Precio: expect.any(Number),
      })
    );
  });
});

// test route/articulos/:id DELETE
describe("DELETE /api/articulos/:id", () => {
  it("Deberia devolver el articulo con el id 1 borrado", async () => {
    const res = await request(app).delete("/api/articulos/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        IdArticulo: expect.any(Number),
        Nombre: expect.any(String),
        Precio: expect.any(Number),
      })
    );
  });
});
