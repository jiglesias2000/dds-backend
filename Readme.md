## Etapa 4
## webapi Articulos
Ahora implentaremos la webapi articulos, que contendra toda la funcionalidad para la gestion del recurso articulos (CRUD = ABM)
* En la carpeta routes creamos el archivo "articulos.js", con el siguiente codigo:
```javascript
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
```
 * observe:
    * bla 
    * bla, bla

* haremos testing del esta webapi desde postman
  * En postman importar coleccion de pruebas desde el archivo: DDS-Express.postman_collection.json
    * verifique los errores devueltos por el modelo de ORM
      * Nombre: caracteres entre 4 y 50
    * verifique los errores devueltos por las restricciones de la base de datos: 
      * clave unica sobre el campo Nombre
  * recuerde que puede reinicializar los datos ejecutando el comando: node base-orm/sqlite-init.js

* Ejercicio 1: modifique el metodo GET que devuelve todos los registros, para que acepte opcionalmente los parametros Nombre y Activo, y si vienen estos aplicarlos como filtro para traer los registros. Tambien considerar un parametro Pagina que permitira paginar el resultado (pagina de a 10 registros), devolviendo unicamente la pagina solicitada. Finalmente el metodo datos con la siguiente estructura de salida: {Items, RegistrosTotal}  En donde items seran los registros filtrados y paginado, mientras que RegistrosTotal indicara la cantidad total de registros en la base que cumplen con el filtro solitado antes de paginar.
* Ejericio 2: modifique el metodo DELETE para que el mismo no haga una baja fisica, sino una baja logica. Mediante el cambio del valor del campo Activo (1 o 0)

