const express = require("express");

// crear servidor
const app = express();
app.use(express.json()); // para poder leer json en el body

require("./base-orm/sqlite-init"); // crear base si no existe

// controlar ruta
app.get("/", (req, res) => {
  res.send("Backend inicial dds-backend!");
});

const articulosfamiliasRouter = require("./routes/articulosfamilias");
app.use(articulosfamiliasRouter);
const articulosRouter = require("./routes/articulos");
app.use(articulosRouter);

// levantar servidor
const port = 3000;
app.listen(port, () => {
    console.log(`sitio escuchando en el puerto ${port}`);
  });