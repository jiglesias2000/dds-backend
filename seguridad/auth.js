const jwt = require("jsonwebtoken");

const accessTokenSecret = "youraccesstokensecret";
const refreshTokenSecret = "yourrefreshtokensecrethere";


const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, accessTokenSecret, (err, user) => {
      if (err) {
        //return res.sendStatus(403);
        return res.status(400).json({error: 'token no es válido'})
      }

      req.user = user;
      next();
    });
  } else {
    //res.sendStatus(401);
    res.status(401).json({ error: 'Acceso denegado' })
  }
};

module.exports = {authenticateJWT, accessTokenSecret, refreshTokenSecret};

//------------------------------------
//-- SEGURIDAD ---------------------------
//------------------------------------
// app.get("/paginasegura", auth.authenticateJWT, (req, res) => {
//   const { role } = req.user;

//   if (role !== "admin") {
//     return res.sendStatus(403);
//   }

//   res.send("pagina segura accedida!");
// });