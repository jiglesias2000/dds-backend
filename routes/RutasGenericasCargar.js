const RutasGenericasDefinicion = require("./RutasGenericasDefinicion");

async function RutasGenericasCargar(app) {
  try {
    const RutasGenericasCrear = require("./RutasGenericasCrear");
    //recorrer modelosdinamicos y crear rutas
    RutasGenericasDefinicion.forEach((modelo) => {
      const router = RutasGenericasCrear(modelo);
      app.use(router);
    });
  } catch (error) {
    console.error("Error:", error.message);
  }
}

module.exports = RutasGenericasCargar;
