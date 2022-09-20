const express = require("express");
const router = express.Router();

// test error sincrono
router.get('/testerrorsincrono', (req, res) => {
  // #swagger.tags = ['Test Error']
  // #swagger.summary = 'Desencadena un error sincrono'
  throw new Error('probando desencadenar un error');
  });

// test error asincrono1
router.get("/testerrorasincrono1", async function (req, res, next) {
  // #swagger.tags = ['Test Error']
  // #swagger.summary = 'Desencadena un error asincrono: controlado'

  throw new Error("probando desencadenar un error asincrono 1, Server crash!");
});

// test error asincrono2 (promesas then/catch)
router.get("/testerrorasincrono2", async function (req, res, next) {
  // #swagger.tags = ['Test Error']
  // #swagger.summary = 'Desencadena un error asincrono con promesas then/catch: NO controlado'
  new Promise(function (resolve, reject) {
    setTimeout(
      () =>
        reject(
          new Error("probando desencadenar un error asincrono 2, Server crash!")
        ),
      100
    );
  }).then(console.log("ok nunca se da"));
  // si me olvido el catch, el error hace caer el servidor
});

// test error asincrono3 (solucion del punto anterior, promesas con async/await)
router.get("/testerrorasincrono3", async function (req, res, next) {
  // #swagger.tags = ['Test Error']
  // #swagger.summary = 'Desencadena un error asincrono con promesas async/await: Controlado'


  // en las promesas no usar then/catch, si no await y agregar con try/cath si queremos cambiar el error
  await new Promise(function (resolve, reject) {
    setTimeout(
      () =>
        reject(
          new Error(
            "probando desencadenar un error asincrono 3, Server No crash!"
          )
        ),
      100
    );
  });

  // idem anterior
  // await Promise.reject(new Error("probando desencadenr un error asincrono 3, Server No crash!"));
});

module.exports = router;
