const express = require("express");
const router = express.Router();

const db = require("../base-orm/sequelize-init");
const { ValidationError } = require("sequelize");

router.get("/api/articulosfamilias", async function (req, res, next) {
  // #swagger.tags = ['ArticulosFamilias']
  // #swagger.summary = 'obtiene todos los ArticulosFamilias'

  // promesas
  db.articulosfamilias
    .findAll({
      //attributes: ["IdArticuloFamilia", "Nombre"],
      order: [["Nombre", "ASC"]],
    })
    .then((items) => {
      //console.log(datos);
      res.json(items);
    })
    .catch((err) => 
      //res.json(err)  // devuelve todo el error, no apto para produccion
      next(err)
    );

  // alternativa a promesa con  await
  //  let data = await  db.articulosfamilias.findAll({
  //     attributes: ['IdArticuloFamilia', 'Nombre']
  //   });
  //   res.json(data);
});

router.get("/api/articulosfamilias-testerror", async function (req, res, next) {
  // #swagger.tags = ['ArticulosFamilias']
  // #swagger.summary = 'test error asincrono'

  // error asincrono
  try {
    let items = await db.articulosfamilias.findAll({
      attributes: ["CampoInexistenteParaGenerarUnError"],
    });
    res.json(items);
   } catch (error) {
     next(error);
   }

});

router.get("/api/articulosfamilias/:id", async function (req, res, next) {
  // #swagger.tags = ['ArticulosFamilias']
  // #swagger.summary = 'obtiene un ArticuloFamilia'
  // #swagger.parameters['id'] = { description: 'identificador del ArticulosFamilias...' }
  db.articulosfamilias
    .findAll({
      attributes: ["IdArticuloFamilia", "Nombre"],
      where: { IdArticuloFamilia: req.params.id },
    })
    .then((items) => {
      res.json(items);
    })
    .catch((err) => next(err));
});

router.post("/api/articulosfamilias/",  async function (req, res, next) {
  // #swagger.tags = ['ArticulosFamilias']
  // #swagger.summary = 'agrega un ArticuloFamilia'
  /*    #swagger.parameters['ArticulosFamilias'] = {
                in: 'body',
                description: 'nuevo ArticulosFamilias',
                schema: { $ref: '#/definitions/ArticulosFamilias' }
    } */

  db.articulosfamilias
    .create({
      Nombre: req.body.Nombre,
    })
    .then((resp) => {
      res.json(resp);
    })
    .catch((e) => {
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
              
              console.log("ya tiene un msj de error definido en el modelo, nos quedamos con ese mismo", error.message);
              message = error.message;
              
              // if (error.validatorArgs[0] === error.validatorArgs[1]) {
              //   message = "Use " + error.validatorArgs[0] + " characters";
              // } else {
              //   message =
              //     "Use between " +
              //     error.validatorArgs[0] +
              //     " and " +
              //     error.validatorArgs[1] +
              //     " characters";
              // }

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
              message = error.value + " ya existe en la base";
              error.path = error.path.replace("_UNIQUE", "");
              break;
            default:
              message = error.message;
          }
          messages[error.path] = message;
        });
      }

      res.status(400).json(messages);
    });
});

router.put("/api/articulosfamilias/:id",  async function (req, res, next) {
  // #swagger.tags = ['ArticulosFamilias']
  // #swagger.summary = 'actualiza un ArticuloFamilia'
  // #swagger.parameters['id'] = { description: 'identificador del ArticulosFamilias...' }
  /*    #swagger.parameters['ArticulosFamilias'] = {
                in: 'body',
                description: 'ArticulosFamilias a actualizar',
                schema: { $ref: '#/definitions/ArticulosFamilias' }
    } */

  db.articulosfamilias
    .update(
      { Nombre: req.body.Nombre },
      { where: { IdArticuloFamilia: req.params.id } }
    )
    .then((item) => {
      res.json(item);
    })
    .catch((e) => {
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
              message = error.value + " ya existe en la base";
              error.path = error.path.replace("_UNIQUE", "");
              break;
            default:
              message = error.message;
          }
          messages[error.path] = message;
        });
      }

      res.status(400).json(messages);
    });
});

router.delete("/api/articulosfamilias/:id",  async function (req, res, next) {
  // #swagger.tags = ['ArticulosFamilias']
  // #swagger.summary = 'elimina un ArticuloFamilia'
  // #swagger.parameters['id'] = { description: 'identificador del ArticulosFamilias...' }

  db.articulosfamilias
    .destroy({
      where: { IdArticuloFamilia: req.params.id },
    })
    .then((item) => {
      res.json(item);
    })
    .catch((err) => next(err));
});

module.exports = router;
