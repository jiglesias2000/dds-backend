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
    // aun con "express-async-errors" , las promesas con error hacer caer el servidor!!!
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
  res.json(data);
});

router.post("/api/articulosfamilias/", async function (req, res, next) {
  // #swagger.tags = ['ArticulosFamilias']
  // #swagger.summary = 'agrega un ArticuloFamilia'
  /*    #swagger.parameters['ArticulosFamilias'] = {
                in: 'body',
                description: 'nuevo ArticulosFamilias',
                schema: { $ref: '#/definitions/ArticulosFamilias' }
    } */
  try {
    let data = await db.articulosfamilias.create({
      Nombre: req.body.Nombre,
    });
    res.json(data);  // devolvemos el registro agregado!
  } catch (err) {
    const messages = {};
    if (err instanceof ValidationError) {
      err.errors.forEach((error) => {
        let message;
        switch (error.validatorKey) {
          case "isEmail":
            message = "Please enter a valid email";
            break;
          case "isDate":
            message = "Please enter a valid date";
            break;
          case "len":
            console.log(
              "ya tiene un msj de error definido en el modelo, nos quedamos con ese mismo",
              error.message
            );
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
            message = "Use a number less or equal to " + error.validatorArgs[0];
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

  db.articulosfamilias
    .update(
      { Nombre: req.body.Nombre },
      { where: { IdArticuloFamilia: req.params.id } }
    )
    .then((item) => {
      //res.json(item);
      res.sendStatus(200);
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
              message = "este campo es obligatorio";
              break;
            case "not_unique":
              message =
                "ya existe otro registro con este valor para este campo";
              //error.path = error.path.replace("_UNIQUE", "");
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

router.delete("/api/articulosfamilias/:id", async function (req, res, next) {
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
