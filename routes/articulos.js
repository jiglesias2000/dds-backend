const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const { Op, ValidationError } = require("sequelize");
const auth = require("../seguridad/auth");

router.get("/api/articulos", async function (req, res, next) {
  // #swagger.tags = ['Articulos']
  // #swagger.summary = 'obtiene todos los Articulos'
  // consulta de articulos con filtros y paginacion
  if (req.body.Nombre || req.body.Activo || req.body.NumeroPagina) {
    let where = {};
    if (req.body.Nombre != undefined) {
      where.Nombre = {
        [Op.like]: "%" + req.body.Nombre + "%",
      };
    }
    if (req.body.Activo != undefined) {
      where.Activo = req.body.Activo; // 1 o 0
    }
    const NumeroPagina = req.body.NumeroPagina ?? 1;
    const TamañoPagina = 10;
    const { count, rows } = await db.articulos.findAndCountAll({
      attributes: [
        "IdArticulo",
        "Nombre",
        "Precio",
        "Stock",
        "FechaAlta",
        "Activo",
      ],
      order: [["Nombre", "ASC"]],
      where,
      offset: (NumeroPagina - 1) * TamañoPagina,
      limit: TamañoPagina,
    });

    return res.json({ items: rows, totalRegistros: count });
  } else {
    let items = await db.articulos.findAll({
      attributes: [
        "IdArticulo",
        "Nombre",
        "Precio",
        "Stock",
        "FechaAlta",
        "Activo",
      ],
      order: [["Nombre", "ASC"]],
    });
    res.json(items);
  }
});
//------------------------------------
//-- SEGURIDAD ---------------------------
//------------------------------------
/* 
curl --location --request GET 'http://localhost:3000/api/jwt/articulos' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjoiYWRtaW4iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NjMxODAyMzIsImV4cCI6MTY2MzE4MTQzMn0.1Fbep2gPiTrmLmEhNmk4FCo-EICnDHOcoLdyamY2ra0' \
*/
router.get(
  "/api/jwt/articulos",
  auth.authenticateJWT,
  async function (req, res, next) {
    const { rol } = res.locals.user;
    if (rol !== "admin") {
      return res.status(403).json({ mensaje: "usuario no autorizado!" });
    }

    /* #swagger.security = [{
               "bearerAuth1": []
        }] */

    // #swagger.tags = ['Articulos']
    // #swagger.summary = 'obtiene todos los Articulos, con seguridad JWT, solo para rol: admin (usuario:admin, clave:123)'
    let items = await db.articulos.findAll({
      attributes: [
        "IdArticulo",
        "Nombre",
        "Precio",
        "Stock",
        "FechaAlta",
        "Activo",
      ],
      order: [["Nombre", "ASC"]],
    });
    res.json(items);
  }
);

router.get("/api/articulos/:id", async function (req, res, next) {
  // #swagger.tags = ['Articulos']
  // #swagger.summary = 'obtiene un Articulo'
  // #swagger.parameters['id'] = { description: 'identificador del Articulo...' }
  let items = await db.articulos.findAll({
    attributes: [
      "IdArticulo",
      "Nombre",
      "Precio",
      "CodigoDeBarra",
      "IdArticuloFamilia",
      "Stock",
      "FechaAlta",
      "Activo",
    ],
    where: { IdArticulo: req.params.id },
  });
  res.json(items);
});

router.post("/api/articulos/", async (req, res) => {
  // #swagger.tags = ['Articulos']
  // #swagger.summary = 'agrega un Articulos'
  /*    #swagger.parameters['item'] = {
                in: 'body',
                description: 'nuevo Articulo',
                schema: { $ref: '#/definitions/Articulos' }
    } */
  try {
    let data = await db.articulos.create({
      Nombre: req.body.Nombre,
      Precio: req.body.Precio,
      CodigoDeBarra: req.body.CodigoDeBarra,
      IdArticuloFamilia: req.body.IdArticuloFamilia,
      Stock: req.body.Stock,
      FechaAlta: req.body.FechaAlta,
      Activo: req.body.Activo,
    });
    res.status(200).json(data.dataValues); // devolvemos el registro agregado!
  } catch (err) {
    const messages = {};
    if (err instanceof ValidationError) {
      err.errors.forEach((error) => {
        let message;
        switch (error.validatorKey) {
          case "not_unique":
            message = (error.value ?? 'el valor de este campo') + " ya existe en la tabla";
            error.path = error.path.replace("_UNIQUE", "");
            break;
          default:
            message = error.message;  // msg del modelo o por defecto
        }
        messages[error.path] = message;
      });
      res.status(400).json(messages);
    } else throw err; // desencadeno el mismo error inicial (error desconocido)
  }
});

router.put("/api/articulos/:id", async (req, res) => {
  // #swagger.tags = ['Articulos']
  // #swagger.summary = 'actualiza un Articulo'
  // #swagger.parameters['id'] = { description: 'identificador del Articulo...' }
  /*    #swagger.parameters['Articulo'] = {
                in: 'body',
                description: 'Articulo a actualizar',
                schema: { $ref: '#/definitions/Articulos' }
    } */

    try {
      let data = await db.articulos
    .update(
      {
        Nombre: req.body.Nombre,
        Precio: req.body.Precio,
        CodigoDeBarra: req.body.CodigoDeBarra,
        IdArticuloFamilia: req.body.IdArticuloFamilia,
        Stock: req.body.Stock,
        FechaAlta: req.body.FechaAlta,
        Activo: req.body.Activo,
      },
      { where: { IdArticulo: req.params.id } }
    );
    res.status(200).json(data.dataValues); // devolvemos el registro modificado!
  } catch (err) {
    const messages = {};
    if (err instanceof ValidationError) {
      err.errors.forEach((error) => {
        let message;
        switch (error.validatorKey) {
          case "not_unique":
            message = (error.value ?? 'el valor de este campo') + " ya existe en la tabla";
            error.path = error.path.replace("_UNIQUE", "");
            break;
          default:
            message = error.message;  // msg del modelo o por defecto
        }
        messages[error.path] = message;
      });
      res.status(400).json(messages);
    } else throw err; // desencadeno el mismo error inicial (error desconocido)
  }
});

router.delete("/api/articulos/:id", async (req, res) => {
  // #swagger.tags = ['Articulos']
  // #swagger.summary = 'elimina un Articulo'
  // #swagger.parameters['id'] = { description: 'identificador del Articulo..' }

  let data = await db.articulos.destroy({
    where: { IdArticulo: req.params.id },
  });
  if (data==1) res.sendStatus(200);
  else res.sendStatus(404);
});

module.exports = router;
