require("express-async-errors"); // captura errores en promesas, usar async await
const express = require("express");
const path = require("path");

// leer archivo de configuracion
require("dotenv").config();
console.log("base", process.env.base);

require("./base-orm/sqlite-init"); // crear base si no existe

// crear servidor
const app = express();

// configurar servidor
const cors = require("cors");
app.use(cors());

app.use(express.text()); // entiende texto
app.use(express.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded
app.use(express.json()); // entiende json

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
app.use(articulosfamiliasRouter);
app.use(articulosfamiliasmockRouter);
app.use(articulosRouter);
app.use(ecoRouter);
app.use(seguridadRouter);
app.use(jsonexternoRouter);
app.use(equiposRouter);

// test error sincrono
app.get("/testerrorsincrono", (req, res, next) => {
  throw new Error("probando desencadenar un error sincrono");
});

// test error asincrono1
app.get("/testerrorasincrono1", async function (req, res, next) {
  throw new Error("probando desencadenr un error asincrono 1, Server crash!");
});

// test error asincrono2 (promesas then/catch)
app.get("/testerrorasincrono2", async function (req, res, next) {
  (new Promise(function(resolve, reject) {
    setTimeout(() => reject(new Error("probando desencadenr un error asincrono 2, Server crash!")), 100);
  })).then(console.log('ok nunca se da')) 
  // si me olvido el catch, el error hace caer el servidor
});

// test error asincrono3 (solucion del punto anterior, promesas con async/await)
app.get("/testerrorasincrono3", async function (req, res, next) {
  // en las promesas no usar then/catch, si no await y agregar con try/cath si queremos cambiar el error
 
  await (new Promise(function(resolve, reject) {
    setTimeout(() => reject(new Error("probando desencadenr un error asincrono 3, Server No crash!")), 100);
  }))

  // idem anterior
  // await Promise.reject(new Error("probando desencadenr un error asincrono 3, Server No crash!"));

});


// manejo de errores
const fs = require("fs/promises");
app.use(async function (err, req, res, next) {
  // logueamos el error en un archivo para luego consultarlo.
  console.error(err.stack);

  dato = new Date().toLocaleString() + "\n" + err.stack + "\n" + "\n";
  await fs.writeFile("./log.txt", dato, { flag: "a" });
  //const logFile = fs.readFile("log.txt",'utf-8');

  //enviamos al usuario un mensaje apropiado, sin dar detalles del error
  res
    .status(500)
    .send(
      "Actualmente tenemos inconvenientes con procesar su solicitud, intente nuevamente mas tarde!"
    );
});

// captura toda las peticiones que no han sido capturadas anteriormente
app.use(function (req, res) {
  res.status(404).send("Pagina no encontrada!");
});

//------------------------------------
//-- INICIO ---------------------------
//------------------------------------
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`sitio escuchando en el puerto ${port}`);
});
