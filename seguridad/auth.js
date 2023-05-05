const jwt = require("jsonwebtoken");

const accessTokenSecret = "youraccesstokensecret";
const refreshTokenSecret = "yourrefreshtokensecrethere";

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;  // Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVC

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, accessTokenSecret, (err, contenidoDelTokenDesencriptado) => {
      if (err) {
        //return res.sendStatus(400);
        return res.status(403).json({ message: "token no es valido" });
      }
      
      res.locals.user = contenidoDelTokenDesencriptado;
      next();
    });
  } else {
    //res.sendStatus(401);
    res.status(401).json({ message: "Acceso denegado" });
  }
};


module.exports = { authenticateJWT, accessTokenSecret, refreshTokenSecret };

