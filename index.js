const express = require('express');

require('dotenv').config();
console.log(process.env.base);

require('./base-orm/sqlite-init'); // crear base

const app = express();
const port = process.env.PORT || 3000;

const cors = require('cors');
app.use(cors());

app.use(express.text()); // entiende tex
app.use(express.urlencoded({ extended: false })); // entiende forms de html
app.use(express.json()); // entiende json

const path = require('path');
app.use('/', express.static(path.join(__dirname, 'public')));

//------------------------------------
//-- SWAGGER
//------------------------------------
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger/swagger_output.json'); //aqui se genera la salida
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// manejo de errores
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res
    .status(500)
    .send(
      'Actualmente tenemos inconvenientes con procesar su solicitud, intente nuevamente mas tarde!'
    );
});

//------------------------------------
//-- RUTAS ---------------------------
//------------------------------------
app.get('/', (req, res) => {
  //res.send("sitio on line, hola mundo!");
  //res.json({message: 'sitio on line'});
  //res.sendfile("./public/index.html");
  //res.sendfile("./img/imagen.jpg");
  res.redirect('/index.html');
});

app.get('/testerror', (req, res) => {
  throw 'probando desencadenar un error';
});

const articulosfamiliasRouter = require('./routes/articulosfamilias');
const articulosfamiliasmockRouter = require('./routes/articulosfamiliasmock');
const articulosRouter = require('./routes/articulos');
const ecoRouter = require('./routes/eco');
const seguridadRouter = require('./routes/seguridad');
const jsonexternoRouter = require('./routes/jsonexterno');
const equiposRouter = require('./routes/equipos');
app.use(articulosfamiliasRouter);
app.use(articulosfamiliasmockRouter);
app.use(articulosRouter);
app.use(ecoRouter);
app.use(seguridadRouter);
app.use(jsonexternoRouter);
app.use(equiposRouter);

//------------------------------------
//-- INICIO ---------------------------
//------------------------------------
app.listen(port, () => {
  console.log(`sitio escuchando en el puerto ${port}`);
});
