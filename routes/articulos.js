const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const { Op } = require("sequelize");
const auth = require("../seguridad/auth");

router.get("/api/articulos", async function (req, res, next) {
  // #swagger.tags = ['Articulos']
  // #swagger.summary = 'obtiene todos los Articulos'
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
    db.articulos
      .findAll({
        attributes: [
          "IdArticulo",
          "Nombre",
          "Precio",
          "Stock",
          "FechaAlta",
          "Activo",
        ],
        order: [["Nombre", "ASC"]],
      })
      .then((datos) => {
        //console.log(datos);
        res.json(datos);
      });
    //.catch((err) => res.json(err));   // no capturar el error de la promesa
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
  function (req, res, next) {
    const { rol } = req.user;
    if (rol !== "admin") {
      return res.status(403).json({ mensaje: "usuario no autorizado!" });
    }

    /* #swagger.security = [{
               "bearerAuth1": []
        }] */

    // #swagger.tags = ['Articulos']
    // #swagger.summary = 'obtiene todos los Articulos, con seguridad JWT, solo para rol: admin (usuario:admin, clave:123)'
    db.articulos
      .findAll({
        attributes: [
          "IdArticulo",
          "Nombre",
          "Precio",
          "Stock",
          "FechaAlta",
          "Activo",
        ],
        order: [["Nombre", "ASC"]],
      })
      .then((datos) => {
        //console.log(datos);
        res.json(datos);
      })
      .catch((err) => res.json(err));
  }
);

router.get("/api/articulos/:id", async function (req, res, next) {
  // #swagger.tags = ['Articulos']
  // #swagger.summary = 'obtiene un Articulo'
  // #swagger.parameters['id'] = { description: 'identificador del Articulo...' }
  db.articulos
    .findAll({
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
    })
    .then((items) => {
      res.json(items);
    })
    .catch((err) => res.json(err));
});

router.post("/api/articulos/", (req, res) => {
  // #swagger.tags = ['Articulos']
  // #swagger.summary = 'agrega un Articulos'
  /*    #swagger.parameters['item'] = {
                in: 'body',
                description: 'nuevo Articulo',
                schema: { $ref: '#/definitions/Articulos' }
    } */

  db.articulos
    .create({
      Nombre: req.body.Nombre,
      Precio: req.body.Precio,
      CodigoDeBarra: req.body.CodigoDeBarra,
      IdArticuloFamilia: req.body.IdArticuloFamilia,
      Stock: req.body.Stock,
      FechaAlta: req.body.FechaAlta,
      Activo: req.body.Activo,
    })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      const messages = {};
      if (e instanceof ValidationError) {
        e.errors.forEach((error) => {
          let message;
          switch (error.validatorKey) {
            case "isEmail":
              message = "Please enter a valid email";
              break;
            case "isDate":
              message = "Please enter a valid date";
              break;
            case "len":
              if (error.validatorArgs[0] === error.validatorArgs[1]) {
                message = "Use " + error.validatorArgs[0] + " characters";
              } else {
                message =
                  "Use between " +
                  error.validatorArgs[0] +
                  " and " +
                  error.validatorArgs[1] +
                  " characters";
              }
              break;
            case "min":
              message =
                "Use a number greater or equal to " + error.validatorArgs[0];
              break;
            case "max":
              message =
                "Use a number less or equal to " + error.validatorArgs[0];
              break;
            case "isInt":
              message = "Please use an integer number";
              break;
            case "is_null":
              message = "Please complete this field";
              break;
            case "not_unique":
              message = error.value + " is taken. Please choose another one";
              error.path = error.path.replace("_UNIQUE", "");
          }
          messages[error.path] = message;
        });
      }
    });
});

router.put("/api/articulos/:id", (req, res) => {
  // #swagger.tags = ['Articulos']
  // #swagger.summary = 'actualiza un Articulo'
  // #swagger.parameters['id'] = { description: 'identificador del Articulo...' }
  /*    #swagger.parameters['Articulo'] = {
                in: 'body',
                description: 'Articulo a actualizar',
                schema: { $ref: '#/definitions/Articulos' }
    } */

  db.articulosfamilias
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
    )
    .then((item) => {
      res.json(item);
    })
    .catch((err) => {
      const messages = {};
      if (e instanceof ValidationError) {
        e.errors.forEach((error) => {
          let message;
          switch (error.validatorKey) {
            case "isEmail":
              message = "Please enter a valid email";
              break;
            case "isDate":
              message = "Please enter a valid date";
              break;
            case "len":
              if (error.validatorArgs[0] === error.validatorArgs[1]) {
                message = "Use " + error.validatorArgs[0] + " characters";
              } else {
                message =
                  "Use between " +
                  error.validatorArgs[0] +
                  " and " +
                  error.validatorArgs[1] +
                  " characters";
              }
              break;
            case "min":
              message =
                "Use a number greater or equal to " + error.validatorArgs[0];
              break;
            case "max":
              message =
                "Use a number less or equal to " + error.validatorArgs[0];
              break;
            case "isInt":
              message = "Please use an integer number";
              break;
            case "is_null":
              message = "Please complete this field";
              break;
            case "not_unique":
              message = error.value + " is taken. Please choose another one";
              error.path = error.path.replace("_UNIQUE", "");
          }
          messages[error.path] = message;
        });
      }

      res.json(messages);
    });
});

router.delete("/api/articulos/:id", (req, res) => {
  // #swagger.tags = ['Articulos']
  // #swagger.summary = 'elimina un Articulo'
  // #swagger.parameters['id'] = { description: 'identificador del Articulo..' }

  db.articulos
    .destroy({
      where: { IdArticulo: req.params.id },
    })
    .then((item) => {
      res.json(item);
    })
    .catch((err) => res.json(err));
});

module.exports = router;
