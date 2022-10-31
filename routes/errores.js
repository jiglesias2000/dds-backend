const express = require("express");
const router = express.Router();

// para verificar si el sitio esta funcionando, o hay que recuperarlo de un crash
router.get("/_isalive", (req, res) => {
  // #swagger.tags = ['Test Error']
  // #swagger.summary = 'Verifica que la aplicacion esta ejecutando correctamente!'
  res
    .status(200)
    .send("Ejecutandose desde: " + req.app.locals.fechaInicio?.toLocaleString());
});

// test error sincrono
router.get("/testerrorsincrono", (req, res) => {
  // #swagger.tags = ['Test Error']
  // #swagger.summary = 'Desencadena un error sincrono'
  throw new Error("probando desencadenar un error sincrono, capturado por errorhandler.js usado en el index.js");
});

// test error asincrono1
router.get("/testerrorasincrono1", async function (req, res, next) {
  // #swagger.tags = ['Test Error']
  // #swagger.summary = 'Desencadena un error asincrono: controlado'

  throw new Error("probando desencadenar un error asincrono 1, capturado por la libreria express-async-errors usada en el index.js, se evita la caida del servidor");
});

// test error asincrono2 (promesas then/catch)
router.get("/testerrorasincrono2", async function (req, res, next) {
  // #swagger.tags = ['Test Error']
  // #swagger.summary = 'Desencadena un error asincrono con promesas then/catch: NO controlado'
  new Promise(function (resolve, reject) {
    setTimeout(
      () =>
        reject("probando desencadenar un error asincrono 2 en el uso de promesas, no pudo ser capturado ni por errorHandler.js ni por libreria express-async-errors,  Se cae el servidor!!!"
        ),
      100
    );
  })

    // en promesas: 
    // si me olvido el catch, 
    // o si tengo otro error en el catch
    // => se cae el servidor
    .then((x) => {
      console.log("ok nunca se da1");
      res.json("ok nunca se da1");
    })
    .catch((err) => {
      throw new Error("probando desencadenar un error asincrono 2, en el uso de promesas, no pudo ser capturado ni por errorHandler.js ni por libreria express-async-errors,  Se cae el servidor!!!");
      // ver en errorhandler.js que aun cuando se cae el servidor, logueamos el motivo para poder analizarlo y corregirlo a posterior.
      res.json("ok nunca se da2");
    });
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
            "probando desencadenar un error asincrono 3, en el uso de promesas mediante async/await, se controla el error (express-async-errors) y se evita la caida del servidor!"
          )
        ),
      100
    );
  });

  // idem anterior
  // await Promise.reject(new Error("probando desencadenr un error asincrono 3, Server No crash!"));
});


router.get("/testeventloop", async function (req, res, next) {
  let peticion = req.query.peticion ?? 1;
  console.log('Inicio ' , peticion);
  setTimeout(() => {
    console.log('Timeout ' ,  peticion);
  }, 500);

  // testar con 
  //  for (let i = 0; i < 10; i++) {
  //    setTimeout(() => {
  //      fetch()}, i*10);
  //        fetch('http://localhost:3000/testeventloop?peticion=' + i)
  //       .then(response => response.json())  // convertir a json
  //       .then(json => console.log(json)), 500   
  //   }

  res.json("peticion " + peticion + " ejecutada");
});

module.exports = router;
