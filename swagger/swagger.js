// ejecutar: node swagger.js      (para generar la documentacion)
const options = {
  //openapi: <string>,          // Enable/Disable OpenAPI. By default is null
  language: "es-AR", // Change response language. By default is 'en-US'
  //</string>disableLogs: <boolean>,     // Enable/Disable logs. By default is false
  //</boolean>/autoHeaders: <boolean>,     // Enable/Disable automatic headers capture. By default is true
  //autoQuery: <boolean>,       // Enable/Disable automatic query capture. By default is true
  //autoBody: <boolean>         // Enable/Disable automatic body capture. By default is true

};
const swaggerAutogen = require("swagger-autogen")(options);

const outputFile = "./swagger/swagger_output.json";
const endpointsFiles = ["./routes/*.js"];


const doc = {
  info: {
    version: "1.0", // by default: '1.0.0'
    title: "Pymes web api", // by default: 'REST API'
    description: "web api de la aplicacion Pymes", // by default: ''
  },
  host: "", // by default: 'localhost:3000'
  basePath: "", // by default: '/'
  schemes: [], // by default: ['http']
  consumes: [], // by default: ['application/json']
  produces: [], // by default: ['application/json']
  tags: [
    // by default: empty Array
    {
      name: "ArticulosFamilias", // Tag name
      description: "apis de ArticulosFamilias", // Tag description
    },
    {
      name: "Articulos",
      description: "apis de Articulos",
    },
    {
      name: "Seguridad",
      description: "apis de Seguridad",
    },
    {
      name: "Test Formularios",
      description: "apis para testing de Action de Formularios",
    },
    // { ... }
  ],
  securityDefinitions: {
    BearerAuth: {
      type: "apiKey",
      name: "Authorization",
      in: "header",
      description: "formato: Bearer eyJhbGciOi...vwI"
    },
  }, // by default: empty object
  definitions: {
    ArticulosFamilias: {
      IdArticulo: 1,
      Nombre: "Accesorios",
    },
    ArticulosFamiliasMock: {
      IdArticulo: 1,
      Nombre: "Accesorios",
    },
    Articulos: {
      IdArticulo: 143,
      Nombre: "Aire acondicionado lg 3000 fc h126tnw0",
      Precio: 7499,
      CodigoDeBarra: "0779808338858",
      IdArticuloFamilia: 7,
      Stock: 441,
      FechaAlta: "2017-01-09T00:00:00",
      Activo: true,
    },
  }, // by default: empty object (Swagger 2.0)
  components: {
   
  }, // by default: empty object (OpenAPI 3.x)
};

swaggerAutogen(outputFile, endpointsFiles, doc);
