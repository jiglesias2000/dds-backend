const request = require("supertest");
const app = require("../index");
const articuloAlta = {
  Nombre: "Articulo " + (() => (Math.random() + 1).toString(36).substring(2))(), // Genera un nombre aleatorio
  Precio: 10.5,
  CodigoDeBarra: "1234567890123",
  IdArticuloFamilia: 1,
  Stock: 11,
  FechaAlta: new Date().toISOString(),
  Activo: true,
};
const articuloModificacion = {
  IdArticulo: 1,
  Nombre: "Articulo " + (() => (Math.random() + 1).toString(36).substring(2))(), // Genera un nombre aleatorio
  Precio: 10.5,
  CodigoDeBarra: "1234567890123",
  IdArticuloFamilia: 1,
  Stock: 11,
  FechaAlta: new Date().toISOString(),
  Activo: true,
};

// test route/articulos GET
describe("GET /api/articulos", () => {
  it("Deberia devolver todos los articulos", async () => {
    const res = await request(app).get("/api/articulos");
    expect(res.statusCode).toEqual(200);

    expect(res.body).toEqual(
      expect.objectContaining({
        Items: expect.arrayContaining([
          expect.objectContaining({
            IdArticulo: expect.any(Number),
            Nombre: expect.any(String),
            Precio: expect.any(Number),
            Stock: expect.any(Number),
            FechaAlta: expect.any(String),
            Activo: expect.any(Boolean)
          }),
        ]),
        RegistrosTotal: expect.any(Number),
      })
    );
  });
});

// test route/articulos GET
describe("GET /api/articulos con filtros", () => {
  it("Deberia devolver los articulos segun filtro ", async () => {
    const res = await request(app).get("/api/articulos?Nombre=AIRE&Activo=true&Pagina=1");
    expect(res.statusCode).toEqual(200);

    expect(verificarPropiedades(res.body.Items) ).toEqual(true );
  
    function verificarPropiedades(array) {
      for (let i = 0; i < array.length; i++) {
        if ( !array[i].Nombre.includes("AIRE") || !array[i].Activo ) {
          return false;
        }
      }
      return true;
    }
    
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
        CodigoDeBarra: expect.any(String),
        IdArticuloFamilia: expect.any(Number),
        Stock: expect.any(Number),
        FechaAlta: expect.any(String),
        Activo: expect.any(Boolean),
      })
    );
  });
});

// test route/articulos POST
describe("POST /api/articulos", () => {
  it("Deberia devolver el articulo que acabo de crear", async () => {
    const res = await request(app).post("/api/articulos").send(articuloAlta);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        IdArticulo: expect.any(Number),
        Nombre: expect.any(String),
        Precio: expect.any(Number),
        CodigoDeBarra: expect.any(String),
        IdArticuloFamilia: expect.any(Number),
        Stock: expect.any(Number),
        FechaAlta: expect.any(String),
        Activo: expect.any(Boolean),
      })
    );
  });
});

// test route/articulos/:id PUT
describe("PUT /api/articulos/:id", () => {
  it("Deberia devolver el articulo con el id 1 modificado", async () => {
    const res = await request(app)
      .put("/api/articulos/1")
      .send(articuloModificacion);
    expect(res.statusCode).toEqual(204);
  });
});

// test route/articulos/:id DELETE
describe("DELETE /api/articulos/:id", () => {
  it("Deberia devolver el articulo con el id 1 borrado", async () => {
    const res = await request(app).delete("/api/articulos/1");
    expect(res.statusCode).toEqual(200);

    // baja logica, no se borra realmente
    // expect(res.body).toEqual(
    //   expect.objectContaining({
    //     IdArticulo: expect.any(Number),
    //     Nombre: expect.any(String),
    //     Precio: expect.any(Number),
    //   })
    // );
  });
});
