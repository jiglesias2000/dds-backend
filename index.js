require("express-async-errors"); // captura errores en promesas, usar async await
const express = require("express");
const path = require("path");

// leer archivo de configuracion
require('dotenv').config();
console.log("WEBSITE_SITE_NAME", process.env.WEBSITE_SITE_NAME);

// configurar si corre en azure
if (process.env.WEBSITE_SITE_NAME) { 
  // ejecutando en azure, usamos un carpeta de escritura/lectura persistente 
  //process.env.base = "/archivos/pymes.db";
  process.env.base = process.env.base_azure;
  process.env.logErrores = process.env.logErrores_azure;
}



console.log("base", process.env.base);
console.log("NODE_ENV", process.env.NODE_ENV);

require("./base-orm/sqlite-init"); // crear base si no existe

// crear servidor
const app = express();

// seguridad XSS
const helmet = require('helmet');
app.use(helmet());

// configurar servidor
const cors = require("cors");
app.use(cors({
  origin: '*'    // origin: 'https://dds-frontend.azurewebsites.net'
}));

// var allowCrossDomain = function(req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//   //res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// }

const cookieParser = require("cookie-parser");
app.use(cookieParser()); // entiende cookies

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
const ventasRouter = require("./routes/ventas");
app.use(articulosfamiliasRouter);
app.use(articulosfamiliasmockRouter);
app.use(articulosRouter);
app.use(ecoRouter);
app.use(seguridadRouter);
app.use(jsonexternoRouter);
app.use(equiposRouter);
app.use(erroresRouter);
app.use(ventasRouter)

//------------------------------------
//-- Control de errores --------------
//------------------------------------
const { errorHandler, _404Handler } = require("./error-handler/errorhandler");
app.use(errorHandler);
app.use(_404Handler);

//------------------------------------
//-- INICIO ---------------------------
//------------------------------------

if (!module.parent) {   // si no es llamado por otro modulo, es decir, si es el modulo principal -> levantamos el servidor
  const port = process.env.PORT || 3000;   // en produccion se usa el puerto de la variable de entorno PORT
  app.locals.fechaInicio = new Date();
  app.listen(port, () => {
    console.log(`sitio escuchando en el puerto ${port}`);
  });
}

module.exports = app; // para testing
