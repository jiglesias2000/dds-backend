const express = require('express');
const router = express.Router();

router.get('/api/equipos', async function (req, res, next) {
  // #swagger.tags = ['Equipos Qatar']
  // #swagger.summary = 'Devuelve los equipos y sus bandera desde un array harcodeado'

  // promesas
  res.setHeader('Cross-Origin-Opener-Policy', 'cross-origin');
  const items = [
    {
      equipo: 'Qatar',
      bandera:
        'https://www.futboleador.com/wp-content/uploads/sites/14/2022/03/bandera-qatar.png',
    },
    {
      equipo: 'Alemania',
      bandera:
        'https://www.futboleador.com/wp-content/uploads/sites/14/2020/11/bandera-alemania.jpg',
    },
    {
      equipo: 'Dinamarca',
      bandera:
        'https://www.futboleador.com/wp-content/uploads/sites/14/2020/11/dinamarca-bandera.png',
    },
    {
      equipo: 'Brasil',
      bandera:
        'https://www.futboleador.com/wp-content/uploads/sites/14/2020/11/bandera-brasil-copa-america-2021.png',
    },
    {
      equipo: 'Serbia',
      bandera:
        'https://www.futboleador.com/wp-content/uploads/sites/14/2021/11/bandera-serbia-e1636968670281.png',
    },
    {
      equipo: 'Croacia',
      bandera:
        'https://www.futboleador.com/wp-content/uploads/sites/14/2020/11/bandera-croacia.jpg',
    },
    {
      equipo: 'España',
      bandera:
        'https://www.futboleador.com/wp-content/uploads/sites/14/2020/11/bandera-espana.jpg',
    },
    {
      equipo: 'Francia',
      bandera:
        'https://www.futboleador.com/wp-content/uploads/sites/14/2020/11/bandera-francia.jpg',
    },
    {
      equipo: 'Bélgica',
      bandera:
        'https://www.futboleador.com/wp-content/uploads/sites/14/2020/11/bandera-belgica.jpg',
    },
    {
      equipo: 'Suiza',
      bandera:
        'https://www.futboleador.com/wp-content/uploads/sites/14/2020/11/bandera-suiza.jpg',
    },
    {
      equipo: 'Inglaterra',
      bandera:
        'https://www.futboleador.com/wp-content/uploads/sites/14/2020/11/bandera-inglaterra.jpg',
    },
    {
      equipo: 'Argentina',
      bandera:
        'https://www.futboleador.com/wp-content/uploads/sites/14/2020/11/bandera-argentina-copa-america-2021.png',
    },
    {
      equipo: 'Irán',
      bandera:
        'https://www.futboleador.com/wp-content/uploads/sites/14/2022/01/bandera-iran.jpeg',
    },
    {
      equipo: 'Corea del Sur',
      bandera:
        'https://www.futboleador.com/wp-content/uploads/sites/14/2022/02/bandera-coreadelsur-e1643738193372.jpeg',
    },
    {
      equipo: 'Canadá',
      bandera:
        'https://www.futboleador.com/wp-content/uploads/sites/14/2022/03/canada-bandera.jpg',
    },
    {
      equipo: 'Arabia Saudí',
      bandera:
        'https://www.futboleador.com/wp-content/uploads/sites/14/2022/03/bandera-arabia-saudi.jpg',
    },
    {
      equipo: 'Uruguay',
      bandera:
        'https://www.futboleador.com/wp-content/uploads/sites/14/2022/03/bandera-uruguay.jpg',
    },
    {
      equipo: 'Japón',
      bandera:
        'https://www.futboleador.com/wp-content/uploads/sites/14/2022/03/bandera-japon.jpg',
    },
    {
      equipo: 'Ecuador',
      bandera:
        'https://www.futboleador.com/wp-content/uploads/sites/14/2022/03/bandera-ecuador.jpeg',
    },
    {
      equipo: 'Ghana',
      bandera:
        'https://www.futboleador.com/wp-content/uploads/sites/14/2022/04/ghana-bandera.jpg',
    },
    {
      equipo: 'Senegal',
      bandera:
        'https://www.futboleador.com/wp-content/uploads/sites/14/2022/04/senegal-bandera.jpg',
    },
    {
      equipo: 'Portugal',
      bandera:
        'https://www.futboleador.com/wp-content/uploads/sites/14/2022/04/portugal-bandera.jpg',
    },
    {
      equipo: 'Polonia',
      bandera:
        'https://www.futboleador.com/wp-content/uploads/sites/14/2022/04/polonia-bandera.jpg',
    },
    {
      equipo: 'Qatar',
      bandera:
        'https://www.futboleador.com/wp-content/uploads/sites/14/2022/04/marruecos-bandera.jpg',
    },
    {
      equipo: 'Qatar',
      bandera:
        'https://www.futboleador.com/wp-content/uploads/sites/14/2022/04/tunez-bandera.jpg',
    },
    {
      equipo: 'Qatar',
      bandera:
        'https://www.futboleador.com/wp-content/uploads/sites/14/2022/04/camerun-bandera.jpg',
    },
    {
      equipo: 'México',
      bandera:
        'https://www.futboleador.com/wp-content/uploads/sites/14/2022/04/mexico-bandera.jpg',
    },
    {
      equipo: 'Estados Unidos',
      bandera:
        'https://www.futboleador.com/wp-content/uploads/sites/14/2022/04/eeuu-bandera.jpg',
    },
    {
      equipo: 'Gales',
      bandera:
        'https://www.futboleador.com/wp-content/uploads/sites/14/2022/06/gales-bandera.jpg',
    },
    {
      equipo: 'Australia',
      bandera:
        'https://www.futboleador.com/wp-content/uploads/sites/14/2022/06/bandera-australia.jpeg',
    },
    {
      equipo: 'Costa Rica',
      bandera:
        'https://www.futboleador.com/wp-content/uploads/sites/14/2022/06/bandera-costa-rica.jpg',
    },
  ];
  res.json(items);
});


module.exports = router;
