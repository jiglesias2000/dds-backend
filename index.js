const express = require("express");

// crear servidor
const app = express();

app.use(express.json()); // para poder leer json en el body

require("./base-orm/sqlite-init");  // crear base si no existe

// controlar ruta
app.get("/", (req, res) => {
  res.send("Backend inicial DDS-EXPRESS!");
});

const articulosfamiliasRouter = require("./routes/articulosfamilias");
//const articulosfamiliasRouter = require("./routes/articulosfamiliasmock");
app.use(articulosfamiliasRouter);

// levantar servidor
const port = 3000;
app.listen(port, () => {
    console.log(`sitio escuchando en el puerto ${port}`);
  });