const modelos_rutas_conmponentes = require("../configModelosRutasComponentes");

async function RutasGenericasCargar(app) {
  try {
    const RutasGenericasPlantilla = require("./RutasGenericasPlantilla");
    //recorrer modelosdinamicos y crear rutas
    modelos_rutas_conmponentes.forEach((modelo) => {
      const router = RutasGenericasPlantilla(modelo);
      app.use(router);
    });
  } catch (error) {
    console.error("Error:", error.message);
  }
}

module.exports = RutasGenericasCargar;
