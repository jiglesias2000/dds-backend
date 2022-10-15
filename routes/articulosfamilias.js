const express = require("express");
const router = express.Router();

const db = require("../base-orm/sequelize-init");
const { ValidationError } = require("sequelize");

router.get("/api/articulosfamilias", async function (req, res, next) {
  // #swagger.tags = ['ArticulosFamilias']
  // #swagger.summary = 'obtiene todos los ArticulosFamilias'

  let data = await db.articulosfamilias.findAll({
    attributes: ["IdArticuloFamilia", "Nombre"],
  });
  res.json(data);
});

// los errores asyncronos, sino los controlamos, por defecto hacen caer el servidor!!!!
router.get(
  "/api/articulosfamilias/testerrorasync",
  async function (req, res, next) {
    // #swagger.tags = ['ArticulosFamilias']
    // #swagger.summary = 'test error asincrono'
    // -----------------------------------
    // -----------------------------------
    // error asincrono, controlado para que pueda ser interceptado por controlador estandar de express
    // try {
    //   let data = await db.articulosfamilias.findAll({
    //     attributes: ["CampoInexistenteParaGenerarUnError"],
    //   });
    //   res.json(data);
    //  } catch (error) {
    //    next(error);
    //  }
    // -----------------------------------
    // -----------------------------------
    // aun con "express-async-errors" , las promesas con error sin cath hacer caer el servidor!!!
    // db.articulosfamilias
    //   .findAll({
    //     attributes: ["CampoInexistenteParaGenerarUnError"],
    //   })
    //   .then((data) => res.json(data));
    // -----------------------------------
    // -----------------------------------
    // con "express-async-errors" debermos usar async/await
    let data = await db.articulosfamilias.findAll({
      attributes: ["CampoInexistenteParaGenerarUnError"],
    });
    res.json(data);
  }
);

router.get("/api/articulosfamilias/:id", async function (req, res, next) {
  // #swagger.tags = ['ArticulosFamilias']
  // #swagger.summary = 'obtiene un ArticuloFamilia'
  // #swagger.parameters['id'] = { description: 'identificador del ArticulosFamilias...' }
  let data = await db.articulosfamilias.findAll({
    attributes: ["IdArticuloFamilia", "Nombre"],
    where: { IdArticuloFamilia: req.params.id },
  });
  if (data.length > 0 ) res.json(data[0]);
  else res.status(404).json({mensaje:'No econtrado!!'})
});

router.post("/api/articulosfamilias/", async function (req, res, next) {
  // #swagger.tags = ['ArticulosFamilias']
  // #swagger.summary = 'agrega un ArticuloFamilia'
  /*    #swagger.parameters['ArticulosFamilias'] = {
                in: 'body',
                description: 'nuevo ArticulosFamilias',
                schema: { $ref: '#/definitions/ArticulosFamilias' }
    } */

  // controlamos los errores "esperables" para cambiar el texto para hacerlo amigable al usuario.
  // los errores inesperados siguen el camino habitual por el controlador global (loguear e informar)
  try {
    let data = await db.articulosfamilias.create({
      Nombre: req.body.Nombre,
    });
    res.status(204).json(data);  // devolvemos el registro agregado!
  } catch (err) {
    const messages = {};
    if (err instanceof ValidationError) {
      err.errors.forEach((error) => {
        let message;
        switch (error.validatorKey) {
          case "not_unique":
            message = (error.value ?? 'el valor de este campo') + " ya existe en la base";
            error.path = error.path.replace("_UNIQUE", "");
            break;
          default:
            message = error.message;  // msg del modelo o por defecto
        }
        messages[error.path] = message;
      });
      res.status(400).json(messages);
    } else throw err; // desencadeno el mismo error inicial
  }
});

router.put("/api/articulosfamilias/:id", async function (req, res, next) {
  // #swagger.tags = ['ArticulosFamilias']
  // #swagger.summary = 'actualiza un ArticuloFamilia'
  // #swagger.parameters['id'] = { description: 'identificador del ArticulosFamilias...' }
  /*    #swagger.parameters['ArticulosFamilias'] = {
                in: 'body',
                description: 'ArticulosFamilias a actualizar',
                schema: { $ref: '#/definitions/ArticulosFamilias' }
    } */

    try {
      let data = await db.articulosfamilias
      .update(
        { Nombre: req.body.Nombre },
        { where: { IdArticuloFamilia: req.params.id } }
      );
      res.sendStatus(200);
      //res.json(data);  // devolvemos el registro modificado!
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
      } else throw err; // desencadeno el mismo error inicial
    }


});

router.delete("/api/articulosfamilias/:id", async function (req, res, next) {
  // #swagger.tags = ['ArticulosFamilias']
  // #swagger.summary = 'elimina un ArticuloFamilia'
  // #swagger.parameters['id'] = { description: 'identificador del ArticulosFamilias...' }

  let data = await db.articulosfamilias
    .destroy({
      where: { IdArticuloFamilia: req.params.id },
    });
    if (data==1) res.sendStatus(200);
    else res.sendStatus(404);
});

module.exports = router;