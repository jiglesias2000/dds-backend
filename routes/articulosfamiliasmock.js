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
  // #swagger.summary = 'obtiene todos los ArticulosFamilias'
  res.json(arr_ArticulosFamiliasMock);
});

router.get('/api/articulosfamiliasmock/:id', async function (req, res) {
  // #swagger.tags = ['ArticulosFamiliasMock']
  // #swagger.summary = 'obtiene un ArticulosFamiliasMock'
  // #swagger.parameters['id'] = { description: 'identificador del articulosfamiliasmock...' }
  let articuloFamilia = arr_ArticulosFamiliasMock.find(
    (x) => x.IdArticuloFamilia == req.params.id
  );
  if (articuloFamilia) res.json(articuloFamilia);
  else res.status(404).json({ message: 'articulofamilia no encontrado' });
});

router.post('/api/articulosfamiliasmock/', (req, res) => {
  // #swagger.tags = ['ArticulosFamiliasMock']
  // #swagger.summary = 'agrega un ArticulosFamilias'
  /*    #swagger.parameters['articulosfamiliasmock'] = {
                in: 'body',
                description: 'nuevo articulosfamiliasmock',
                schema: { $ref: '#/definitions/ArticulosFamiliasMock' }
    } */
  const { Nombre } = req.body;
  let articuloFamilia = {
    IdArticuloFamilia: Math.floor(Math.random()*100000),
    Nombre
  };

  // aqui agregar a la coleccion
  arr_ArticulosFamiliasMock.push(articuloFamilia);

  res.status(201).json(articuloFamilia);
});

router.put('/api/articulosfamiliasmock/:id', (req, res) => {
  // #swagger.tags = ['ArticulosFamiliasMock']
  // #swagger.summary = 'actualiza un ArticulosFamilias'
  // #swagger.parameters['id'] = { description: 'identificador del articulosfamiliasmock...' }
  /*    #swagger.parameters['articulosfamiliasmock'] = {
                in: 'body',
                description: 'articulosfamiliasmock a actualizar',
                schema: { $ref: '#/definitions/ArticulosFamiliasMock' }
    } */

  let indexArticuloFamilia = arr_ArticulosFamiliasMock.findIndex(
    (x) => x.IdArticuloFamilia == req.params.id
  );

  if (indexArticuloFamilia>=0) {
    const { Nombre } = req.body;
    arr_ArticulosFamiliasMock[indexArticuloFamilia].Nombre = Nombre;
    res.json({ message: 'articulofamilia actualizado' });
  } else {
    res.status(404).json({ message: 'articulofamilia no encontrado' })
  }
});

router.delete('/api/articulosfamiliasmock/:id', (req, res) => {
  // #swagger.tags = ['ArticulosFamiliasMock']
  // #swagger.summary = 'elimina un ArticulosFamilias'
  // #swagger.parameters['id'] = { description: 'identificador del articulosfamiliasmock...' }

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

module.exports = router;
