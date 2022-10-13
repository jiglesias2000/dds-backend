require("express-async-errors"); // captura errores en promesas, usar async await
const express = require("express");
const path = require("path");

// leer archivo de configuracion
require("dotenv").config();
console.log("base", process.env.base);
console.log("NODE_ENV", process.env.NODE_ENV);

require("./base-orm/sqlite-init"); // crear base si no existe

// crear servidor
const app = express();

// configurar servidor
const cors = require("cors");
app.use(cors());

app.use(express.text()); // entiende texto
app.use(express.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded
app.use(express.json()); // para poder leer json en el body

// sirve archivos estaticos
app.use("/", express.static(path.join(__dirname, "public")));

//------------------------------------
//-- SWAGGER
//------------------------------------
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger/swagger_output.json"); //aqui se genera la salida
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));

//------------------------------------
//-- RUTAS ---------------------------
//------------------------------------
app.get("/", (req, res) => {
  //res.send("sitio on line, hola mundo!");
  //res.json({message: 'sitio on line'});
  //res.sendfile("./public/index.html");
  //res.sendfile("./img/imagen.jpg");
  res.redirect("/index.html"); // no haria falta, valor por defecto usado por express.static
});

const articulosfamiliasRouter = require("./routes/articulosfamilias");
const articulosfamiliasmockRouter = require("./routes/articulosfamiliasmock");
const articulosRouter = require("./routes/articulos");
const ecoRouter = require("./routes/eco");
const seguridadRouter = require("./routes/seguridad");
const jsonexternoRouter = require("./routes/jsonexterno");
const equiposRouter = require("./routes/equipos");
const erroresRouter = require("./routes/errores");
app.use(articulosfamiliasRouter);
app.use(articulosfamiliasmockRouter);
app.use(articulosRouter);
app.use(ecoRouter);
app.use(seguridadRouter);
app.use(jsonexternoRouter);
app.use(equiposRouter);
app.use(erroresRouter);

//------------------------------------
//-- Control de errores --------------
//------------------------------------
const { errorHandler, _404Handler } = require("./error-handler/errorhandler");
app.use(errorHandler);
app.use(_404Handler);

//------------------------------------
//-- INICIO ---------------------------
//------------------------------------

if (!module.parent) { // si no es llamado por otro modulo, es decir, si es el modulo principal
  const port = process.env.PORT || 3000;   // en produccion se usa el puerto de la variable de entorno PORT
  app.locals.fechaInicio = new Date();
  app.listen(port, () => {
    console.log(`sitio escuchando en el puerto ${port}`);
  });
}

module.exports = app; // para testing
