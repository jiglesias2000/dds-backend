# Desarrollo de Sotware: Backend

## Etapa2
## weapi articulosfamiliasmock
Esta api no accede a base de datos sino que simulando dicho acceso trabaja con un array de datos harcodeados.
* Agregamos al proyecto la carpeta "routes" en donde pondremos los controladores de las diferentes rutas de los recursos de la webapi
* en la carpeta routes creamos el archivo "articulosfamiliasmock.js que gestionara el recurso articulosfamiliasmock, con el siguiente codigo:
```javascript
const express = require('express');
const router = express.Router();

let arr_ArticulosFamiliasMock = [
  {
    "IdArticuloFamilia": 1,
    "Nombre": "Accesorioss"
  },
  {
    "IdArticuloFamilia": 2,
    "Nombre": "Audio"
  },
  {
    "IdArticuloFamilia": 3,
    "Nombre": "Celulares"
  },
  {
    "IdArticuloFamilia": 4,
    "Nombre": "Cuidado Personal"
  },
  {
    "IdArticuloFamilia": 5,
    "Nombre": "Dvd"
  },
  {
    "IdArticuloFamilia": 6,
    "Nombre": "Fotografia"
  },
  {
    "IdArticuloFamilia": 7,
    "Nombre": "Frio-Calor"
  },
  {
    "IdArticuloFamilia": 8,
    "Nombre": "Gps"
  },
  {
    "IdArticuloFamilia": 9,
    "Nombre": "Informatica"
  },
  {
    "IdArticuloFamilia": 10,
    "Nombre": "Led - Lcd"
  }
];

router.get('/api/articulosfamiliasmock', async function (req, res) {
  res.json(arr_ArticulosFamiliasMock);
});
module.exports = router;
```
  * observe:
    *  la clase express.Router para crear controladores de rutas montables y modulares.
    * la definicion mockeada del array de datos de articulosfamilias.
    * el controlador GET de la ruta "/api/articulosfamilasmock" que devolvera serializado como json el array de datos.
    * la funcion se define como asincrona "async", que aunque no tenga sentido actualmente, la usamos previendo cuando obtengamos datos desde la base de datos donde sera necesaria.

* Una vez defindo el controlador de nuestro recurso debemos vincularlo a nuestra aplicacion express, cargando el modulo de ruta en el archivo index.js antes de levantar el servidor
```javascript
const articulosfamiliasmockRouter = require("./routes/articulosfamiliasmock");
app.use(articulosfamiliasmockRouter);
 ```
* Para testear nuestro recurso, iniciemos nuestra aplicacion y consultemos desde el explorador la siguiente url: http://localhost:3000/api/articulosfamiliasmock

---
* Agregaremos ahora el metodo GET que permite obtener un recurso segun su id, al archivo articulosfamiliasmock.js le agregamos este codigo, antes del export
```javascript
router.get('/api/articulosfamiliasmock/:id', async function (req, res) {
  let articuloFamilia = arr_ArticulosFamiliasMock.find(
    (x) => x.IdArticuloFamilia == req.params.id
  );
  if (articuloFamilia) res.json(articuloFamilia);
  else res.status(404).json({ mensaje: 'articulofamilia no encontrado' });
});
```
  * Observe:
    * como se recupera el id del segmento de la url, mediante la coleccion params
    * como se busca en el array el dato solicitado
      * si se encuentra se devuelve el mismo en formato de json 
      * si no se encuentra se devuelve un error 404 com un mensaje adecuado.

* Para testearlo, iniciemos nuestra aplicacion y consultemos desde el explorador la siguiente url: http://localhost:3000/api/articulosfamiliasmock/1
  * testemos cambiando el numero final de la url que indica el id del recurso a buscar.
---
* Agregamos ahora el metodo post, que permite a agregar un recurso, usaremos el siguiente codigo:
```javascript
router.post('/api/articulosfamiliasmock/', (req, res) => {
  const { Nombre } = req.body;
  let articuloFamilia = {
    Nombre,
    IdArticuloFamilia: arr_ArticulosFamiliasMock.length,
  };

  // aqui agregar a la coleccion
  arr_ArticulosFamiliasMock.push(articuloFamilia);

  res.status(204).json(articuloFamilia);
});
```
  * Observe:
    * como se recupera el dato del Nombre desde el objeto "body" del request
    * el campo IdArticuloFamilia, en base de datos seria un autonumerico, aqui usamos un solucion no muy fiable pero sencilla, solo valida para una demostracion
    * devolvemos el codigo de status 204 y el objeto recien creado; tal ves quien consuma esta api buscara alli, entre otros valores, el IdArticuloFamilia recien generado.

* para que este metodo funcione, express necesita un midleware que le permita interpretar el json que recibe en el body, para lo cual agregamos en el index.js, luego de crear la constante app, el codigo siguiente:
```javascript
app.use(express.json()); // para poder leer json en el body
```
* Testeamos este metodo, con la ayuda de la  aplicacion Postman que nos facilitara invocar la url con el verbo Post y los parametros necesarios. (importar archivo postman_articulos_familias.json)
---
* Agregamos ahora el metodo PUT, que permite a modificar un recurso, usaremos el siguiente codigo:

```javascript
router.put('/api/articulosfamiliasmock/:id', (req, res) => {
  let articuloFamilia = arr_ArticulosFamiliasMock.find(
    (x) => x.IdArticuloFamilia == req.params.id
  );

  if (articuloFamilia) {
    const { Nombre } = req.body;
    articuloFamilia.Nombre = Nombre;
    res.json({ mensaje: 'articulofamilia actualizado' });
  } else {
    res.status(404).json({ mensaje: 'articulofamilia no encontrado' })
  }
});
```
  * Observe:
    * 1
    * 2
    * 3
* Testeamos este metodo, con la ayuda de la  aplicacion Postman que nos facilitara invocar la url con el verbo PUT y los parametros necesarios.
---
* Finalmente agregamos el metodo DELETE, que permite a eliminar un recurso, usaremos el siguiente codigo:

```javascript
router.delete('/api/articulosfamiliasmock/:id', (req, res) => {
  let articuloFamilia = arr_ArticulosFamiliasMock.find(
    (x) => x.IdArticuloFamilia == req.params.id
  );

  if (articuloFamilia) {
    arr_ArticulosFamiliasMock = arr_ArticulosFamiliasMock.filter(
      (x) => x.IdArticuloFamilia != req.params.id
    );
    res.json({ mensaje: 'articulofamilia eliminado' });
  } else {
    res.status(404).json({ mensaje: 'articulofamilia no encontrado' })
  }
});
```
  * Observe:
    * 1
    * 2
    * 3
* Testeamos este metodo, con la ayuda de la  aplicacion Postman que nos facilitara invocar la url con el verbo DELETE y los parametros necesarios.
---
* Ejercicio: implementar una mejora al metodo GET que devuelve todos los articulosfamilias. Debera retornar solo aquellos que coincidan con un parametro opcional: "Nombre", si no se recibiece dicho parametro,seguira funcionando como antes devolviendo todos los registros.
  * para leer el parametro usaremos el objeto  "query" del request


* Pendiente:
  * scripts start
    * nodemon  