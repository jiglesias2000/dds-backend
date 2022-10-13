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
      "insert into articulosfamilias values	(1,'Accesorioss'),(2,'Audio'),(3,'Celulares'),(4,'Cuidado Personal'),(5,'Dvd'),(6,'Fotografia'),(7,'Frio-Calor'),(8,'Gps'),(9,'Informatica'),(10,'Led - Lcd');"
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

module.exports =  CrearBaseSiNoExiste;
