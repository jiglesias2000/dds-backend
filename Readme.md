# Desarrollo de Sotware: Backend
Objetivo: crear una aplicación backend con una interface WebApiRest,  programada en NodeJs/Javascritp, usando el framework expresss y con acceso a una base de datos (sqlite) mediante un ORM (Sequelize)

* Version final del proyecto: https://dds-backend.azurewebsites.net

> Todos los comandos se ejecutan desde una consola de `git bash`

## Etapa1 
## Crear proyecto basico
* creamos la carpeta del proyecto: dds-backend
* Ubicado en la carpeta, inicializamos el proyecto node, con el comando:
  ````
  npm init
  ````

  |parametro | valor |
  |--- |--|
  |name|dds-backend|
  |description| backend con express|
  |entry point| index.js|
  |etc| etc|

  * Nota: Podriamos usar la sintaxis de import en lugar de require, agregando en el package.json: "type":"module".

  * instalamos la libreria express, con el comando:
    ````
    npm i express
    ````
  * creamos el archivo inicial de la aplicacion: index.js
    * codificamos la aplicacion web basica:

````javascript
const express = require("express");

// crear servidor
const app = express();

// controlar ruta
app.get("/", (req, res) => {
  res.send("Backend inicial dds-backend!");
});

// levantar servidor
const port = 3000;
app.listen(port, () => {
    console.log(`sitio escuchando en el puerto ${port}`);
});
````
  * Ejecutamos el proyecto:
    ````
    node index.js
    ````
  * Testeamos la aplicacion desde el explorador, url: localhost:3000
  * Inicializamos repositorio y hacemos el primer commit.
    ````
    git init
    ````
    * agregamos el archivo .gitignore
      * contenido: node_modules/
    * ejecutamos: 
    ````
    git add 
    ````
    * y luego hacemos commit
    ````
    git commit -m "etapa 1 completa"
    ````

  * para mejorar la experiencia de desarrollo, haremos uso de nodemon
    * instalamos nodemon, comando: 
      ````
      npm i nodemon -D
      ````
    * agregamos a package.json en "scripts" el siguiente script
       "dev": "nodemon index.js"
    * finalmente para ejecutar el proyecto de aqui en adelante usaremos:
      ````
      npm run dev
      ````
    
     

---
## Etapa2
## weapi articulosfamiliasmock
Esta api no accede a base de datos sino que simulando dicho acceso trabaja con un array de datos harcodeados.
* Agregamos al proyecto la carpeta "routes" en donde pondremos los controladores de las diferentes rutas de los recursos de la webapi
* en la carpeta routes creamos el archivo "articulosfamiliasmock.js que gestionara el recurso articulosfamiliasmock, con el siguiente codigo:
````javascript
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
````
  **Observe:**
    * la clase express.Router para crear controladores de rutas montables y modulares.
    * la definicion mockeada del array de datos de articulosfamilias.
    * el controlador GET de la ruta "/api/articulosfamilasmock" que devolvera serializado como json el array de datos.
    * la funcion se define como asincrona "async", que aunque no tenga sentido actualmente, la usamos previendo cuando obtengamos datos desde la base de datos donde sera necesaria.


* Una vez defindo el controlador de nuestro recurso debemos vincularlo a nuestra aplicacion express, cargando el modulo de ruta en el archivo index.js antes de levantar el servidor
````javascript
const articulosfamiliasmockRouter = require("./routes/articulosfamiliasmock");
app.use(articulosfamiliasmockRouter);
 ````
* Para testear nuestro recurso, iniciemos nuestra aplicacion y consultemos desde el explorador la siguiente url: http://localhost:3000/api/articulosfamiliasmock

---
* Agregaremos ahora el metodo GET que permite obtener un recurso segun su id, al archivo articulosfamiliasmock.js le agregamos este codigo, antes del export
````javascript
router.get('/api/articulosfamiliasmock/:id', async function (req, res) {
  let articuloFamilia = arr_ArticulosFamiliasMock.find(
    (x) => x.IdArticuloFamilia == req.params.id
  );
  if (articuloFamilia) res.json(articuloFamilia);
  else res.status(404).json({ message: 'articulofamilia no encontrado' });
});
````
  **Observe:**
    * como se recupera el id del segmento de la url, mediante la coleccion params
    * como se busca en el array el dato solicitado
      * si se encuentra se devuelve el mismo en formato de json 
      * si no se encuentra se devuelve un error 404 com un mensaje adecuado.

* Para testearlo, iniciemos nuestra aplicacion y consultemos desde el explorador la siguiente url: http://localhost:3000/api/articulosfamiliasmock/1
  * testemos cambiando el numero final de la url que indica el id del recurso a buscar.
---
* Agregamos ahora el metodo post, que permite a agregar un recurso, usaremos el siguiente codigo:
````javascript
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
````
  **Observe:**
    * como se recupera el dato del Nombre desde el objeto "body" del request
    * el campo IdArticuloFamilia, en base de datos seria un autonumerico, aqui usamos un solucion no muy fiable pero sencilla, solo valida para una demostracion
    * devolvemos el codigo de status 204 y el objeto recien creado; tal ves quien consuma esta api buscara alli, entre otros valores, el IdArticuloFamilia recien generado.

* para que este metodo funcione, express necesita un midleware que le permita interpretar el json que recibe en el body, para lo cual agregamos en el index.js, luego de crear la constante app, el codigo siguiente:
````javascript
app.use(express.json()); // para poder leer json en el body
````
* Testeamos este metodo, con la ayuda de la  aplicacion Postman que nos facilitara invocar la url con el verbo Post y los parametros necesarios. (importar archivo postman_articulos_familias.json)
---
* Agregamos ahora el metodo PUT, que permite a modificar un recurso, usaremos el siguiente codigo:

````javascript
router.put('/api/articulosfamiliasmock/:id', (req, res) => {
  let articuloFamilia = arr_ArticulosFamiliasMock.find(
    (x) => x.IdArticuloFamilia == req.params.id
  );

  if (articuloFamilia) {
    const { Nombre } = req.body;
    articuloFamilia.Nombre = Nombre;
    res.json({ message: 'articulofamilia actualizado' });
  } else {
    res.status(404).json({ message: 'articulofamilia no encontrado' })
  }
});
````
  **Observe:**
    * el uso del metodo find para buscar el recurso a modificar
    * la modificacion del objeto encontrado y la devolucion de un mensaje de exito.
    * la devolucion del codigo de status 404 si no se encuentra el recurso a modificar
    
* Testeamos este metodo, con la ayuda de la  aplicacion Postman que nos facilitara invocar la url con el verbo PUT y los parametros necesarios.
---
* Finalmente agregamos el metodo DELETE, que permite a eliminar un recurso, usaremos el siguiente codigo:

````javascript
router.delete('/api/articulosfamiliasmock/:id', (req, res) => {
  let articuloFamilia = arr_ArticulosFamiliasMock.find(
    (x) => x.IdArticuloFamilia == req.params.id
  );

  if (articuloFamilia) {
    arr_ArticulosFamiliasMock = arr_ArticulosFamiliasMock.filter(
      (x) => x.IdArticuloFamilia != req.params.id
    );
    res.json({ message: 'articulofamilia eliminado' });
  } else {
    res.status(404).json({ message: 'articulofamilia no encontrado' })
  }
});
````
  **Observe:**
    * el uso del metodo filter para eliminar el recurso
    * la devolucion de un mensaje de exito.
    * la devolucion del codigo de status 404 si no se encuentra el recurso a eliminar
* Testeamos este metodo, con la ayuda de la  aplicacion Postman que nos facilitara invocar la url con el verbo DELETE y los parametros necesarios.
---
* Ejercicio: implementar una mejora al metodo GET que devuelve todos los articulosfamilias. Debera retornar solo aquellos que coincidan con un parametro opcional: "Nombre", si no se recibiese dicho parametro,seguira funcionando como antes devolviendo todos los registros.
  * para leer el parametro usaremos el objeto  "query" del request

* Pendiente:
  * scripts start
    * nodemon  
---
---
## Etapa 3
## webapi ArticulosFamilias
Esta api accedera a la base de datos sqlite: Pymes.db, mediante el orm Sequelize.
* Agregamos al proyecto la carpeta ".data" en donde se alojara el archivo de base de datos de sqlite: "pymes.db", el mismo sera creado mediante codigo.
* Agregamos al proyecto la carpeta "base-orm" en donde pondremos el codigo relacionado a la base de datos
  * Inicialmente instalaremos los paquetes necesarios para acceder a la base de datos "sqlite3", una libreria para simplificar el acceso asicrono "aa-sqlite" y el ORM elegido "sequelize".
    ````
    npm i sqlite3 aa-sqlite sequelize
    ````
  * Agregamos el archivo "sqlite-init.js" que contiene el codigo con la ejecucion del script para crear la base de datos:

````javascript
// acceder a la base usando aa-sqlite
const db = require("aa-sqlite");

async function CrearBaseSiNoExiste() {
  // abrir base, si no existe el archivo/base lo crea
  await db.open("./.data/pymes.db");

  let existe = false;
  let res = null;

  res = await db.get(
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'articulosfamilias'",
    []
  );
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      "CREATE table articulosfamilias( IdArticuloFamilia INTEGER PRIMARY KEY AUTOINCREMENT, Nombre text NOT NULL UNIQUE);"
    );
    console.log("tabla articulosfamilias creada!");
    await db.run(
      "insert into articulosfamilias values	(1,'ACCESORIOS'),(2,'AUDIO'),(3,'CELULARES'),(4,'CUIDADO PERSONAL'),(5,'DVD'),(6,'FOTOGRAFIA'),(7,'FRIO-CALOR'),(8,'GPS'),(9,'INFORMATICA'),(10,'LED - LCD');"
    );
  }

  existe = false;
  sql =
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'articulos'";
  res = await db.get(sql, []);
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      `CREATE table articulos( 
              IdArticulo INTEGER PRIMARY KEY AUTOINCREMENT
            , Nombre text NOT NULL UNIQUE
            , Precio real
            , CodigoDeBarra
            , IdArticuloFamilia integer
            , Stock integer
            , FechaAlta text
            , Activo boolean,
            FOREIGN KEY (IdArticuloFamilia) REFERENCES articulosfamilias(IdArticuloFamilia)
            );`
    );
    console.log("tabla articulos creada!");

    await db.run(
      `insert into articulos values
          (143,'Aire acondicionado lg 3000 fc h126tnw0',7499,'0779808338858',7,441,'2017-01-09T00:00:00',1),
          (144,'Aire acondicionado lg 4500 fc h1865nw0',10399,'0779808338859',7,971,'2016-12-23T00:00:00',1),
          (145,'Aire acondicionado lg 5500 fc h2465nw0',12699,'0779808338860',7,648,'2017-01-15T00:00:00',1),
          (146,'Aire acondicionado lg artcool 2300fc h096eft0',7999,'0779808338853',7,659,'2017-01-01T00:00:00',1),
          (147,'Aire acondicionado lg artcool 4500fc h1868ft0',12899,'0779808338855',7,712,'2016-12-25T00:00:00',1),
          (148,'Aire acondicionado philco 3200w fc phs32h13x',6199,'0779696244974',7,588,'2017-01-09T00:00:00',1),
          (149,'Aire acondicionado philco 5000w fc phs50h13x',9099,'0779696242975',7,275,'2016-12-22T00:00:00',1),
          (150,'Aire acondicionado portatil durabrand 2500fs lgacd01',4999,'0073621119267',7,995,'2017-01-26T00:00:00',1),
          (151,'Aire acondicionado samsung 3000fc ar12fqftaur',7949,'0880608575497',7,34,'2017-01-03T00:00:00',1),
          (152,'Aire acondicionado sanyo 2600w fc kc913hsan',6099,'0779696244956',7,372,'2017-01-23T00:00:00',1),
          (153,'Aire acondicionado sanyo 3200w fc kc1213hsan',6899,'0779696242957',7,260,'2017-02-02T00:00:00',1),
          (154,'Aire acondicionado surreypria 2250fc 553epq0913f',6929,'0779708708630',7,38,'2016-12-30T00:00:00',1),
          (155,'Aire acondicionado surreypria 3000fc 553epq1213f',7949,'0779708708631',7,180,'2017-01-04T00:00:00',1),
          (156,'Aire acondicionado surreypria 4500fc 553epq1813f',11849,'0779708708632',7,232,'2017-01-07T00:00:00',1),
          (157,'Aire acondicionado surreypria 5500fc 553epq2213f',14329,'0779708708633',7,909,'2017-01-10T00:00:00',1),
          (110,'Antena tp-link tl-ant2408c',249,'0693536405216',9,689,'2016-12-26T00:00:00',1),(164,'Calefactor electrico clever vidrio h1107',1950,'0779815957117',7,459,'2016-12-29T00:00:00',1),
          (165,'Calefactor electrico conveccion con-1800',1599,'0779814958212',7,10,'2017-01-13T00:00:00',1),
          (166,'Calefactor electrico conveccion con-2000n',790,'0779815957180',7,112,'2017-01-11T00:00:00',1),
          (167,'Calefactor electrico conveccion con-2000r',790,'0779815957181',7,141,'2017-01-26T00:00:00',1),
          (168,'Calefactor liliana infrarrojo ci062',345,'0779386200687',7,516,'2016-12-27T00:00:00',1),
          (169,'Calefactor panel 500 watts',769,'0779813482002',7,804,'2017-01-03T00:00:00',1),
          (158,'Calefactor sin salida 4000 kcal volcan',1159,'0779703781219',7,598,'2016-12-23T00:00:00',1),
          (159,'Calefactor sin salida orbis 4200 kcal',1469,'0779703781123',7,504,'2017-01-11T00:00:00',0),
          (170,'Caloventor 2000 w axel ax-ca100',249,'0779811896139',7,780,'2017-01-10T00:00:00',1);
          `
    );
  }

  // cerrar la base
  db.close();
}

CrearBaseSiNoExiste();
export default CrearBaseSiNoExiste;
````

**Observe:**
  1 inicialmente se crea el archivo/base: pymes.db
  2 se verifica consultado el esquema de sqlite si existe la tabla articulosfamilias y si corresponde, se la crea.
  3 si se creo la tabla, se insertan un conjunto de registros
  4 se verifica consultando el equema de sqlite si existe la tabla articulos y si corresponde, se la crea.
  5 si se creo la tabla articulos, se insertan un conjunto de registros.
    
  * Ahora ejecutaremos unicamente el codigo recien creado, para testear su correcto funcionamiento, verificando si efectivamente crea la base de datos:
    * comando: node base-orm/sqlite-init
    * verificamos en el carpeta data, buscando el archivo pymes.db el que podemos abrir con alguna aplicacion/extension adecuada para ver su contenido.
  * Agregamos el archivo "sequelize-init.js" que contiene la definicion del  modelo de datos del ORM sequelize:

````javascript
// configurar ORM sequelize
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite:" + process.env.base );

// definicion del modelo de datos
const articulosfamilias = sequelize.define(
  "articulosfamilias",
  {
    IdArticuloFamilia: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Nombre: {
      // todo evitar que string autocomplete con espacios en blanco, deberia ser varchar sin espacios
      type: DataTypes.STRING(30),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Nombre es requerido",
        },
        len: {
          args: [5, 30],
          msg: "Nombre debe ser tipo carateres, entre 5 y 30 de longitud",
        },
      },
    },
  },
  {
    // pasar a mayusculas
    hooks: {
      beforeValidate: function (articulofamilia, options) {
        if (typeof articulofamilia.Nombre === "string") {
          articulofamilia.Nombre = articulofamilia.Nombre.toUpperCase().trim();
        }
      },
    },

    timestamps: false,
  }
);

const articulos = sequelize.define(
  "articulos",
  {
    IdArticulo: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Nombre: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Nombre es requerido",
        },
        len: {
          args: [5, 60],
          msg: "Nombre debe ser tipo carateres, entre 5 y 60 de longitud",
        },
      },
      unique: {
        args: true,
        msg: "este Nombre ya existe en la tabla!",
      },
    },
    Precio: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Precio es requerido",
        }
      }
    },
    CodigoDeBarra: {
      type: DataTypes.STRING(13),
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Codigo De Barra es requerido",
        },
        is: {
          args: ["^[0-9]{13}$", "i"],
          msg: "Codigo de Barra debe ser numerico de 13 digitos",
        },
      },
    },
    IdArticuloFamilia: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "IdArticuloFamilia es requerido",
        }
      }
    },
    Stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Stock es requerido",
        }
      }
    },
    FechaAlta: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Fecha Alta es requerido",
        }
      }
    },
    Activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Activo es requerido",
        }
      }
    },
  },
  {
    // pasar a mayusculas
    hooks: {
      beforeValidate: function (articulo, options) {
        if (typeof articulo.Nombre === "string") {
          articulo.Nombre = articulo.Nombre.toUpperCase().trim();
        }
      },
    },

    timestamps: false,
  }
);

module.exports = {
  sequelize,
  articulosfamilias,
  articulos,
};
````

**Observe:**
  1 la definicion del modelo de articulosfamilias
  2 la definicion del modelo de articulos
  3 las validaciones del modelo con sus mensajes de error
  4 los hooks para pasar a mayusculas los datos y evitan que se ingresen datos con espacios en blanco al inicio o al final, antes de validarlos; y que junto a estilos en el frontend, dan coherencia a los datos ingresados por el usuario.

* para poder interpretar los datos de las peticiones que vienen en formato json, necesitamos agregar la funcionalidad para que express interprete los datos enviados en el body de la peticion para lo cual agregamos el siguiente codigo en el index.js justo despues de crear el objeto "app"
````javascript
app.use(express.json()); // para poder leer json en el body
````

* en la carpeta routes creamos el archivo "articulosfamilias.js" que gestionara el recurso articulosfamilias con los datos provenientes de la base de datos a traves del ORM; con el siguiente codigo:
````javascript
const express = require("express");
const router = express.Router();

const db = require("../base-orm/sequelize-init");

router.get("/api/articulosfamilias", async function (req, res, next) {
  let data = await db.articulosfamilias.findAll({
    attributes: ["IdArticuloFamilia", "Nombre"],
  });
  res.json(data);
});

module.exports = router;
````
  **Observe:**
    * el acceso al ORM mediante el modulo: sequelize-init
    * el controlador GET de la ruta "/api/articulosfamilas" que devolvera serializado como json el array de datos, obtenido desde la base

* Una vez defindo el controlador de nuestro recurso debemos vincularlo a nuestra aplicacion express, cargando el modulo de ruta en el archivo index.js antes de levantar el servidor
```javascript
const articulosfamiliasRouter = require("./routes/articulosfamilias");
app.use(articulosfamiliasRouter);
 ````
* Para testear nuestro recurso, iniciemos nuestra aplicacion y consultemos desde el explorador la siguiente url: http://localhost:3000/api/articulosfamilias

---
* Ejercicio: implementar el metodo GET que devuelve un articulosfamilias segun su id. Debera retornar el registro especifico solicitado, si no existiese devolver un error adecuado.
  * tips: usar la misma firma/estructura del articulosfamiliasmock

---
## Etapa 4
## webapi Articulos
Ahora implentaremos la webapi articulos, que contendra toda la funcionalidad para la gestion del recurso articulos (CRUD = ABM)
* En la carpeta routes creamos el archivo "articulos.js", con el siguiente codigo:
````javascript
const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const { Op, ValidationError } = require("sequelize");

router.get("/api/articulos", async function (req, res, next) {
  // #swagger.tags = ['Articulos']
  // #swagger.summary = 'obtiene todos los Articulos'
  // consulta de articulos con filtros y paginacion

  if (req.query.Pagina) {
    let where = {};
    if (req.query.Nombre != undefined && req.query.Nombre !== "") {
      where.Nombre = {
        [Op.like]: "%" + req.query.Nombre + "%",
      };
    }
    if (req.query.Activo != undefined && req.query.Activo !== "") {
      // true o false en el modelo, en base de datos es 1 o 0
      // convierto el string a booleano
      where.Activo = (req.query.Activo === 'true'); 
    }
    const Pagina = req.query.Pagina ?? 1;
    const TamañoPagina = 10;
    const { count, rows } = await db.articulos.findAndCountAll({
      attributes: [
        "IdArticulo",
        "Nombre",
        "Precio",
        "Stock",
        "FechaAlta",
        "Activo",
      ],
      order: [["Nombre", "ASC"]],
      where,
      offset: (Pagina - 1) * TamañoPagina,
      limit: TamañoPagina,
    });

    return res.json({ Items: rows, RegistrosTotal: count });
    
  } else {
    let items = await db.articulos.findAll({
      attributes: [
        "IdArticulo",
        "Nombre",
        "Precio",
        "CodigoDeBarra",
        "IdArticuloFamilia",
        "Stock",
        "FechaAlta",
        "Activo",
      ],
      order: [["Nombre", "ASC"]],
    });
    res.json(items);
  }
});

router.get("/api/articulos/:id", async function (req, res, next) {
  // #swagger.tags = ['Articulos']
  // #swagger.summary = 'obtiene un Articulo'
  // #swagger.parameters['id'] = { description: 'identificador del Articulo...' }
  let items = await db.articulos.findOne({
    attributes: [
      "IdArticulo",
      "Nombre",
      "Precio",
      "CodigoDeBarra",
      "IdArticuloFamilia",
      "Stock",
      "FechaAlta",
      "Activo",
    ],
    where: { IdArticulo: req.params.id },
  });
  res.json(items);
});

router.post("/api/articulos/", async (req, res) => {
  // #swagger.tags = ['Articulos']
  // #swagger.summary = 'agrega un Articulos'
  /*    #swagger.parameters['item'] = {
                in: 'body',
                description: 'nuevo Articulo',
                schema: { $ref: '#/definitions/Articulos' }
    } */
  try {
    let data = await db.articulos.create({
      Nombre: req.body.Nombre,
      Precio: req.body.Precio,
      CodigoDeBarra: req.body.CodigoDeBarra,
      IdArticuloFamilia: req.body.IdArticuloFamilia,
      Stock: req.body.Stock,
      FechaAlta: req.body.FechaAlta,
      Activo: req.body.Activo,
    });
    res.status(200).json(data.dataValues); // devolvemos el registro agregado!
  } catch (err) {
    if (err instanceof ValidationError) {
      // si son errores de validacion, los devolvemos
      let messages = '';
      err.errors.forEach((x) => messages += (x.path ?? 'campo') + ": " + x.message + '\n');
      res.status(400).json({message : messages});
    } else {
      // si son errores desconocidos, los dejamos que los controle el middleware de errores
      throw err;
    }
  }
});

router.put("/api/articulos/:id", async (req, res) => {
  // #swagger.tags = ['Articulos']
  // #swagger.summary = 'actualiza un Articulo'
  // #swagger.parameters['id'] = { description: 'identificador del Articulo...' }
  /*    #swagger.parameters['Articulo'] = {
                in: 'body',
                description: 'Articulo a actualizar',
                schema: { $ref: '#/definitions/Articulos' }
    } */

  try {
    let data = await db.articulos.update(
      {
        Nombre: req.body.Nombre,
        Precio: req.body.Precio,
        CodigoDeBarra: req.body.CodigoDeBarra,
        IdArticuloFamilia: req.body.IdArticuloFamilia,
        Stock: req.body.Stock,
        FechaAlta: req.body.FechaAlta,
        Activo: req.body.Activo,
      },
      { where: { IdArticulo: req.params.id } }
    );
    res.sendStatus(200);
  } catch (err) {
    if (err instanceof ValidationError) {
      // si son errores de validacion, los devolvemos
      let messages = '';
      err.errors.forEach((x) => messages += x.path + ": " + x.message + '\n');
      res.status(400).json({message : messages});
    } else {
      // si son errores desconocidos, los dejamos que los controle el middleware de errores
      throw err;
    }
  }
});

router.delete("/api/articulos/:id", async (req, res) => {
  // #swagger.tags = ['Articulos']
  // #swagger.summary = 'elimina un Articulo'
  // #swagger.parameters['id'] = { description: 'identificador del Articulo..' }

  let bajaFisica = false;

  if (bajaFisica) {
    // baja fisica
    let filasBorradas = await db.articulos.destroy({
      where: { IdArticulo: req.params.id },
    });
    if (filasBorradas == 1) res.sendStatus(200);
    else res.sendStatus(404);
  } else {
    // baja logica
    try {
      let data = await db.sequelize.query(
        "UPDATE articulos SET Activo = case when Activo = 1 then 0 else 1 end WHERE IdArticulo = :IdArticulo",
        {
          replacements: { IdArticulo: +req.params.id },
        }
      );
      res.sendStatus(200);
    } catch (err) {
      if (err instanceof ValidationError) {
        // si son errores de validacion, los devolvemos
        const messages = err.errors.map((x) => x.message);
        res.status(400).json(messages);
      } else {
        // si son errores desconocidos, los dejamos que los controle el middleware de errores
        throw err;
      }
    }
  }
});
module.exports = router;
````
 **Observe:**
* el uso de la libreria swagger-jsdoc para documentar la api
* el uso de la libreria sequelize para acceder a la base de datos


* haremos testing del esta webapi desde postman
  * En postman importar coleccion de pruebas desde el archivo: dds-backend.postman_collection.json
    * verifique los errores devueltos por el modelo de ORM
      * Nombre: caracteres entre 4 y 50
    * verifique los errores devueltos por las restricciones de la base de datos: 
      * clave unica sobre el campo Nombre
  * recuerde que puede reinicializar los datos ejecutando el comando: node base-orm/sqlite-init.js

* Ejercicio 1: modifique el metodo GET que devuelve todos los registros, para que acepte opcionalmente los parametros Nombre y Activo, y si vienen estos aplicarlos como filtro para traer los registros. Tambien considerar un parametro Pagina que permitira paginar el resultado (pagina de a 10 registros), devolviendo unicamente la pagina solicitada. Finalmente el metodo datos con la siguiente estructura de salida: {Items, RegistrosTotal}  En donde items seran los registros filtrados y paginado, mientras que RegistrosTotal indicara la cantidad total de registros en la base que cumplen con el filtro solitado antes de paginar.
* Ejericio 2: modifique el metodo DELETE para que el mismo no haga una baja fisica, sino una baja logica. Mediante el cambio del valor del campo Activo (1 o 0)


---
## Etapa 5
En esta etapa vamos a agregar seguridad a la webapi, para ello vamos a utilizar JWT (JSON Web Token) para la autenticacion y autorizacion.

* instalamos las dependencias necesarias
```text
npm install jsonwebtoken
```

* crearemos el middleware de seguridad, que sera el encagado de validar el token de acceso y autorizar el acceso a las rutas seguras, para lo cual crearemos el archivo: seguridad/auth.js, con el siguiente contenido:
````javascript
const jwt = require("jsonwebtoken");

const accessTokenSecret = "youraccesstokensecret";
const refreshTokenSecret = "yourrefreshtokensecrethere";

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, accessTokenSecret, (err, user) => {
      if (err) {
        //return res.sendStatus(400);
        return res.status(403).json({ message: "token no es valido" });
      }
      
      res.locals.user = user;
      next();
    });
  } else {
    //res.sendStatus(401);
    res.status(401).json({ message: "Acceso denegado" });
  }
};
module.exports = { authenticateJWT, accessTokenSecret, refreshTokenSecret };
````

**Observe:**
    * el uso de la libreria jsonwebtoken para validar el token que se recive en el header de la peticion
    * accessTokenSecret: es la clave secreta para firmar el token de acceso
    * refreshTokenSecret: es la clave secreta para firmar el token de refresco
    * si el token es valido, se guarda el usuario en el objeto res.locals.user, para que pueda ser utilizado para luego autorizar las rutas seguras
    * si el token no es valido, se devuelve un error 401 (acceso denegado) o 403 (token no valido)

* Seguidamente en la carpeta routes, crearemos el archivo: seguridad.js, con el siguiente contenido:
  
````javascript
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const auth = require("../seguridad/auth");

const users = [
  {
    usuario: "admin",
    clave: "123",
    rol: "admin",
  },
  {
    usuario: "juan",
    clave: "123",
    rol: "member",
  },
];
let refreshTokens = [];

router.post("/api/login", (req, res) => {
  // #swagger.tags = ['Seguridad']
  // #swagger.summary = 'Login de usuarios: admin:123(rol administrador), juan:123(rol miembro)'

  const { usuario, clave } = req.body;

  // Filter user from the users array by usuario and clave
  const user = users.find((u) => {
    return u.usuario === usuario && u.clave === clave;
  });

  if (user) {
    // Generate an access token
    const accessToken = jwt.sign(
      { usuario: user.usuario, rol: user.rol },
      auth.accessTokenSecret,
      { expiresIn: "20m" }
    );

    // Avanzaado!
    // const refreshToken = jwt.sign(
    //   { usuario: user.usuario, rol: user.rol },
    //   auth.refreshTokenSecret
    // );

    // refreshTokens.push(refreshToken);

    res.json({
      accessToken,
      refreshToken,
      message: "Bienvenido " + user.usuario + "!",
    });
  } else {
    res.json({ message: "usuario or clave incorrecto" });
  }
});

router.post("/api/logout", (req, res) => {
  // #swagger.tags = ['Seguridad']
  // #swagger.summary = 'Logout: invalida el refresh token (no invalida el token actual!!!)'

  // recordar que el token sigue valido hasta que expire, aqui evitamos que pueda renovarse cuando expire!
  let message = "Logout invalido!";
  const { token } = req.body;
  if (refreshTokens.includes(token)) {
    message = "Usuario deslogueado correctamente!";
  }

  refreshTokens = refreshTokens.filter((t) => t !== token);

  res.json({ message });
});

router.post("/api/token", (req, res) => {
  // #swagger.tags = ['Seguridad']
  // #swagger.summary = 'refresh token'
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.sendStatus(401);
  }

  if (!refreshTokens.includes(refreshToken)) {
    return res.sendStatus(403);
  }

  jwt.verify(refreshToken, auth.refreshTokenSecret, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }

    const accessToken = jwt.sign(
      { usuario: user.usuario, rol: user.rol },
      auth.accessTokenSecret,
      { expiresIn: "20m" }
    );

    res.json({
      accessToken,
    });
  });
});


module.exports = router;
````

**Observe:**
  * la definicion de usuarios (clave y roles) en forma hardcodeada para simplificar el ejemplo.
  * router.post("/api/login"): es el metodo que se encarga de autenticar al usuario, para lo cual se debe enviar el usuario y clave
  * router.post("/api/logout"): es el metodo que se encarga de invalidar el token de refresco, para lo cual se debe enviar el token de refresco
  * router.post("/api/token"): es el metodo que se encarga de refrescar el token de acceso, para lo cual se debe enviar el token de refresco


* Autenticacion: finalmente haremos uso de la autenticacion en la webapi, para lo cual modificaremos el archivo: routes/articulos.js, agregandole una ruta segura, para lo cual agregaremos el siguiente codigo:
````javascript	
//------------------------------------
//-- SEGURIDAD ---------------------------
//------------------------------------
router.get(
  "/api/jwt/articulos",
  auth.authenticateJWT,
  async function (req, res, next) {
    /* #swagger.security = [{
               "bearerAuth1": []
        }] */

    // #swagger.tags = ['Articulos']
    // #swagger.summary = 'obtiene todos los Articulos, con seguridad JWT, solo para rol: admin (usuario:admin, clave:123)'
    const { rol } = res.locals.user;
    if (rol !== "admin") {
      return res.status(403).json({ message: "usuario no autorizado!" });
    }

    let items = await db.articulos.findAll({
      attributes: [
        "IdArticulo",
        "Nombre",
        "Precio",
        "CodigoDeBarra",
        "IdArticuloFamilia",
        "Stock",
        "FechaAlta",
        "Activo",
      ],
      order: [["Nombre", "ASC"]],
    });
    res.json(items);
  }
);
````
**Observe:**
  * router.get("/api/jwt/articulos", ...): es la ruta segura que solo puede ser accedida por usuarios con rol: admin
  * auth.authenticateJWT: es el middleware que se encarga de validar el token de acceso y autorizar el acceso a las rutas seguras  



---

## Etapa 6

* test unitarios
  * test varios simples
  * test get articulofamilias
  * test crud articulos
  * test seguridad JWT articulos


