const express = require('express');
const router = express.Router();

let arr_ArticulosFamiliasMock = [
  { IdArticuloFamilia: 1, Nombre: 'ArticuloFamilia 1' },
];

router.get('/api/articulosfamiliasmock', async function (req, res) {
  // #swagger.tags = ['articulosfamiliasmock']
  // #swagger.summary = 'obtiene todos los articulosfamiliasmock'
  res.json(arr_ArticulosFamiliasMock);
});

router.get('/api/articulosfamiliasmock/:id', async function (req, res) {
  // #swagger.tags = ['articulosfamiliasmock']
  // #swagger.summary = 'obtiene un ArticuloFamilia'
  // #swagger.parameters['id'] = { description: 'identificador del articulosfamiliasmock...' }
  let articuloFamilia = arr_ArticulosFamiliasMock.find(
    (x) => x.IdArticuloFamilia == req.params.id
  );
  if (articuloFamilia) res.json(articuloFamilia);
  else res.status(404).json({ mensaje: 'articulofamilia no encontrado' });
});

router.post('/api/articulosfamiliasmock/', (req, res) => {
  // #swagger.tags = ['articulosfamiliasmock']
  // #swagger.summary = 'agrega un ArticuloFamilia'
  /*    #swagger.parameters['articulosfamiliasmock'] = {
                in: 'body',
                description: 'nuevo articulosfamiliasmock',
                schema: { $ref: '#/definitions/articulosfamiliasmock' }
    } */
  const { Nombre } = req.body;
  let articuloFamilia = {
    Nombre,
    IdArticuloFamilia: arr_ArticulosFamiliasMock.length,
  };
  res.json(articuloFamilia);
});

router.put('/api/articulosfamiliasmock/:id', (req, res) => {
  // #swagger.tags = ['articulosfamiliasmock']
  // #swagger.summary = 'actualiza un ArticuloFamilia'
  // #swagger.parameters['id'] = { description: 'identificador del articulosfamiliasmock...' }
  /*    #swagger.parameters['articulosfamiliasmock'] = {
                in: 'body',
                description: 'articulosfamiliasmock a actualizar',
                schema: { $ref: '#/definitions/articulosfamiliasmock' }
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
  // #swagger.tags = ['articulosfamiliasmock']
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
