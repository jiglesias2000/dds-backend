const jwt = require("jsonwebtoken");

const accessTokenSecret = "youraccesstokensecret";
const refreshTokenSecret = "yourrefreshtokensecrethere";

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, accessTokenSecret, (err, user) => {
      if (err) {
        return res.sendStatus(403);
        //return res.status(400).json({ mensaje: "token no es valido" });
      }
      
      res.locals.user = user;
      next();
    });
  } else {
    //res.sendStatus(401);
    res.status(401).json({ mensaje: "Acceso denegado" });
  }
};


module.exports = { authenticateJWT, accessTokenSecret, refreshTokenSecret };

