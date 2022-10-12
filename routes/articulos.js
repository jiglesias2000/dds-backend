const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const { Op, ValidationError } = require("sequelize");

router.get("/api/articulos", async function (req, res, next) {
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
});

router.get("/api/articulos/:id", async function (req, res, next) {
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
  let data = await db.articulos.destroy({
    where: { IdArticulo: req.params.id },
  });
  if (data==1) res.sendStatus(200);
  else res.sendStatus(404);
});

module.exports = router;
