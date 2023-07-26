const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const { Op, ValidationError } = require("sequelize");
const auth = require("../seguridad/auth");

function RutasGenericasPlantilla({
  modelName,
  fieldPK,
  fieldActivo,
  arrayOrder,
  filterFields,
}) {
  const router = express.Router();
  const model = db[modelName];

  router.get(`/api/${modelName}`, async (req, res) => {
    // Tus operaciones de filtrado y paginación aquí
    let where = {};
    for (const field in filterFields) {
      if (req.query[field] != undefined && req.query[field] !== "") {
        if (filterFields[field] == "text") {
          where[field] = {
            [Op.like]: "%" + req.query[field] + "%",
          };
        } else if (filterFields[field] == "boolean") {
          // true o false en el modelo, en base de datos es 1 o 0
          // convierto el string a booleano
          where[field] = req.query[field] === "true";
        } else if (filterFields[field] == "number") {
          // convierto el string a number
          where[field] = Number(req.query[field]);
        } else if (filterFields[field] == "date") {
          // convierto a fecha, suponemos que el modelo es DATEONLY
          // con hora hay que considerar la zona horaria
          try {
            where[field] = req.query[field];
          } catch (err) {}
        }
      }
    }
    const Pagina = req.query.Pagina ?? 1;
    const TamañoPagina = 10;
    const { count, rows } = await model.findAndCountAll({
      where,
      order: arrayOrder,
      offset: (Pagina - 1) * TamañoPagina,
      limit: TamañoPagina,
    });

    return res.json({ Items: rows, RegistrosTotal: count });
  });

  router.get(`/api/${modelName}/:id`, async (req, res) => {
    let item = await model.findByPk(req.params.id);
    if (!item) {
      res.status(404).json({ message: `${modelName} no encontrado` });
      return;
    }
    res.json(item);
  });

  router.post(`/api/${modelName}`, async (req, res) => {
    try {
      let data = await model.create(req.body);
      res.status(200).json(data); // devolvemos el registro agregado!
    } catch (err) {
      if (err instanceof ValidationError) {
        // si son errores de validacion, los devolvemos
        let messages = "";
        err.errors.forEach(
          (x) => (messages += (x.path ?? "campo") + ": " + x.message + "\n")
        );
        res.status(400).json({ message: messages });
      } else {
        // si son errores desconocidos, los dejamos que los controle el middleware de errores
        throw err;
      }
    }
  });

  router.put(`/api/${modelName}/:id`, async (req, res) => {
    try {
      let item = await model.findByPk(req.params.id);
      if (!item) {
        res.status(404).json({ message: `${modelName} no encontrado` });
        return;
      }
      await model.update(req.body, { where: { [fieldPK]: req.params.id } });
      res.sendStatus(204);
    } catch (err) {
      if (err instanceof ValidationError) {
        // si son errores de validacion, los devolvemos
        let messages = "";
        err.errors.forEach(
          (x) => (messages += x.path + ": " + x.message + "\n")
        );
        res.status(400).json({ message: messages });
      } else {
        // si son errores desconocidos, los dejamos que los controle el middleware de errores
        throw err;
      }
    }
  });

  router.delete(`/api/${modelName}/:id`, async (req, res) => {
    if (!fieldActivo) {
      let filasBorradas = await model.destroy({
        where: { [fieldPK]: req.params.id },
      });
      if (filasBorradas == 1) res.sendStatus(200);
      else res.sendStatus(404);
    } else {
      // baja logica
      try {
        let item = await model.findByPk(req.params.id);
        if (!item) {
          res.status(404).json({ message: `${modelName} no encontrado` });
          return;
        }
        item[fieldActivo] = !item[fieldActivo];
        await item.save();
        res.sendStatus(200);
      } catch (err) {
        if (err instanceof ValidationError) {
          // si son errores de validacion, los devolvemos
          const messages = err.errors.map((x) => x.message);
          res.status(400).json(messages);
        } else {
          // si son errores desconocidos, los dejamos que los controle el middleware de errores
          throw err;
        }
      }
    }
  });

  return router;
}
module.exports = RutasGenericasPlantilla;
