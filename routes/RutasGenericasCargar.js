const RutasGenericasDefinicion = require("./RutasGenericasDefinicion");

async function RutasGenericasCargar(app) {
  try {
    const RutasGenericasPlantilla = require("./RutasGenericasPlantilla");
    //recorrer modelosdinamicos y crear rutas
    RutasGenericasDefinicion.forEach((modelo) => {
      const router = RutasGenericasPlantilla(modelo);
      app.use(router);
    });
  } catch (error) {
    console.error("Error:", error.message);
  }
}

module.exports = RutasGenericasCargar;
