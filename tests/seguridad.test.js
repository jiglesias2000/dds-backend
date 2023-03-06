const request = require("supertest");
const app = require("../index");

const usuarioAdmin = { usuario: "admin", clave: "123" };
const usuarioMiembro = { usuario: "juan", clave: "123" };


describe("POST /api/login admin", function () {
  it("Devolveria error de autenticacion, porque tiene clave erronea", async function () {
    const res = await request(app)
      .post("/api/login")
      //.set("Content-type", "application/json")
      .send({ usuario: "admin", clave: "erronea" });

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual("usuario or clave incorrecto");
  });

  it("Devolveria el token para usuario admin", async function () {
    const res = await request(app).post("/api/login").send(usuarioAdmin);

    expect(res.statusCode).toEqual(200);
    expect(res.body.accessToken).toEqual(expect.any(String));
  });
});

describe("GET /api/jwt/articulos", () => {

  it("Devolveria error, porque falta token de autorizacion", async function () {
    const res = await request(app).get("/api/jwt/articulos");
    expect(res.statusCode).toEqual(401);
    expect(res.body.message).toEqual("Acceso denegado");
  });

  it("Devolveria error, porque el token no es valido", async function () {
    const res = await request(app).get("/api/jwt/articulos")
    .set("Authorization", 'Bearer invalido');
    expect(res.statusCode).toEqual(403);
    expect(res.body.message).toEqual("token no es valido");
  });

  it("Devolveria todos los articulos, solo autorizado para administradores", async function () {
    const res1 = await request(app)
    .post("/api/login")
    .set("Content-type", "application/json")
    .send(usuarioAdmin);
    expect(res1.statusCode).toEqual(200);
    let token = res1.body.accessToken;

    const res = await request(app)
      .get("/api/jwt/articulos")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          IdArticulo: expect.any(Number),
          Nombre: expect.any(String),
          Precio: expect.any(Number),
          CodigoDeBarra: expect.any(String),
          IdArticuloFamilia: expect.any(Number),
          Stock: expect.any(Number),
          FechaAlta: expect.any(String),
          Activo: expect.any(Boolean),
        }),
      ])
    );
  });

  it("Devolveria error de autorizacion, porque solo estan autorizados los administradores", async function () {
    const res1 = await request(app)
    .post("/api/login")
    .set("Content-type", "application/json")
    .send(usuarioMiembro);
    expect(res1.statusCode).toEqual(200);
    let token = res1.body.accessToken;

    const res = await request(app)
      .get("/api/jwt/articulos")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toEqual(403);
    expect(res.body.message).toEqual('usuario no autorizado!');
  });

});
