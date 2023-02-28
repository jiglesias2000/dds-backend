// https://stackabuse.com/authentication-and-authorization-with-jwts-in-express-js/
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

// avanzado!
let refreshTokens = [];
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

router.post("/api/login", (req, res) => {
  // #swagger.tags = ['Seguridad']
  // #swagger.summary = 'Login de usuarios: admin:123(rol administrador), juan:123(rol miembro)'

  const { usuario, clave } = req.body;

  // Filter user from the users array by usuario and clave
  const user = users.find((u) => {
    return u.usuario === usuario && u.clave === clave;
  });

  if (user) {
    // Generar access token
    const accessToken = jwt.sign(
      { usuario: user.usuario, rol: user.rol },
      auth.accessTokenSecret,
      { expiresIn: "20m" }
    );

    const refreshToken = jwt.sign(
      { usuario: user.usuario, rol: user.rol },
      auth.refreshTokenSecret
    );

    refreshTokens.push(refreshToken);

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


const db = require("../base-orm/sequelize-init");
const { QueryTypes } = require('sequelize');
router.post("/api/loginsqlinjection", async (req, res) => {
  // #swagger.tags = ['Seguridad']
  // #swagger.summary = 'Login de usuarios con sqlinjection: "usuario": "\' or 1=1 --", "clave": "cualquier cosa"'

  const { usuario, clave } = req.body;

  let consulta = null;
  let user = null;
  
  // query con sql injection

  /*  // probar con postman enviando este body
  {
      "usuario": "' or 1=1 --", "clave": "cualquier cosa"
  }
  */

  sql_injection = true;
  if (sql_injection) {
    let sql =  "SELECT Nombre as usuario, Rol rol FROM usuarios WHERE Nombre = '" + usuario + "' and Clave= '"+ clave +"'"
    consulta = await db.sequelize.query( sql , {  type: QueryTypes.SELECT } );
  }
  else {
    // evitando sql injection, usando parametros
    let sql =  "SELECT Nombre as usuario, Rol rol FROM usuarios WHERE Nombre = :p_usuario and Clave= :p_clave ";
    console.log(sql);
    consulta = await db.sequelize.query( sql 
      ,{replacements: { p_usuario: usuario, p_clave: clave }
        ,type: QueryTypes.SELECT } );
  }

  if (consulta.length > 0 )  user = consulta[0];
  
  if (user) {
    // Generar access token
    const accessToken = jwt.sign(
      { usuario: user.usuario, rol: user.rol },
      auth.accessTokenSecret,
      { expiresIn: "20m" }
    );

    const refreshToken = jwt.sign(
      { usuario: user.usuario, rol: user.rol },
      auth.refreshTokenSecret
    );

    refreshTokens.push(refreshToken);

    res.json({
      accessToken,
      refreshToken,
      message: "Bienvenido " + user.usuario + "!",
    });
  } else {
    res.json({ message: "usuario or clave incorrecto" });
  }
});


module.exports = router;
