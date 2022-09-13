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
  // #swagger.tags = ['ArticulosFamiliasMock']
  // #swagger.summary = 'obtiene todos los articulosfamiliasmock'
  res.json(arr_ArticulosFamiliasMock);
});

router.get('/api/articulosfamiliasmock/:id', async function (req, res) {
  // #swagger.tags = ['ArticulosFamiliasMock']
  // #swagger.summary = 'obtiene un ArticuloFamilia'
  // #swagger.parameters['id'] = { description: 'identificador del articulosfamiliasmock...' }
  let articuloFamilia = arr_ArticulosFamiliasMock.find(
    (x) => x.IdArticuloFamilia == req.params.id
  );
  if (articuloFamilia) res.json(articuloFamilia);
  else res.status(404).json({ mensaje: 'articulofamilia no encontrado' });
});

router.post('/api/articulosfamiliasmock/', (req, res) => {
  // #swagger.tags = ['ArticulosFamiliasMock']
  // #swagger.summary = 'agrega un ArticuloFamilia'
  /*    #swagger.parameters['articulosfamiliasmock'] = {
                in: 'body',
                description: 'nuevo articulosfamiliasmock',
                schema: { $ref: '#/definitions/ArticulosFamiliasMock' }
    } */
  const { Nombre } = req.body;
  let articuloFamilia = {
    Nombre,
    IdArticuloFamilia: arr_ArticulosFamiliasMock.length,
  };

  // aqui agregar a la coleccion
  arr_ArticulosFamiliasMock.push(articuloFamilia);

  res.json(articuloFamilia);
});

router.put('/api/articulosfamiliasmock/:id', (req, res) => {
  // #swagger.tags = ['ArticulosFamiliasMock']
  // #swagger.summary = 'actualiza un ArticuloFamilia'
  // #swagger.parameters['id'] = { description: 'identificador del articulosfamiliasmock...' }
  /*    #swagger.parameters['articulosfamiliasmock'] = {
                in: 'body',
                description: 'articulosfamiliasmock a actualizar',
                schema: { $ref: '#/definitions/ArticulosFamiliasMock' }
    } */

  let articuloFamilia = arr_ArticulosFamiliasMock.find(
    (x) => x.IdArticuloFamilia == req.params.id
  );

  if (articuloFamilia) {
    const { Nombre } = req.body;
    let articuloFamilia = {
      Nombre,
      IdArticuloFamilia: arr_ArticulosFamiliasMock.length,
    };
    arr_ArticulosFamiliasMock = arr_ArticulosFamiliasMock.map(
      (x == x.IdArticuloFamilia) == req.params.id ? articuloFamilia : x
    );
    res.json({ mensaje: 'articulofamilia actualizado' });
  } else {
    res.json({ mensaje: 'articulofamilia no encontrado' });
  }
});

router.delete('/api/articulosfamiliasmock/:id', (req, res) => {
  // #swagger.tags = ['ArticulosFamiliasMock']
  // #swagger.summary = 'elimina un ArticuloFamilia'
  // #swagger.parameters['id'] = { description: 'identificador del articulosfamiliasmock...' }

  let articuloFamilia = arr_ArticulosFamiliasMock.find(
    (x) => x.IdArticuloFamilia == req.params.id
  );

  if (articuloFamilia) {
    arr_ArticulosFamiliasMock = arr_ArticulosFamiliasMock.filter(
      (x) => x.IdArticuloFamilia != req.params.id
    );
    res.json({ mensaje: 'articulofamilia eliminado' });
  } else {
    res.json({ mensaje: 'articulofamilia no econtrado!' });
  }
});

module.exports = router;
