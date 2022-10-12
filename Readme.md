# Desarrollo de Sotware: Backend

## Etapa1
## Crear proyecto basico
* creamos la carpeta del proyecto: dds-express
* Ubicado en la carpeta, inicializamos el proyecto node
    * comando: npm init

  |parametro | valor |
  |--- |--|
  |name|dds-express|
  |description| backend con express|
  |entry point| index.js|
  |etc| etc|


  * instalamos la libreria express: 
    * comando: npm i express
  * creamos el archivo inicial de la aplicacion: index.js
    * codificamos la aplicacion web basica:

```javascript
const express = require("express");

// crear servidor
const app = express();

// controlar ruta
app.get("/", (req, res) => {
  res.send("Backend inicial DDS-EXPRESS!");
});

// levantar servidor
const port = 3000;
app.listen(port, () => {
    console.log(`sitio escuchando en el puerto ${port}`);
});
```
  * Ejecutamos el proyecto
    * comando: node index.js
  * testeamos la aplicacion desde el explorador, url: localhost:3000
  * inicializamos repositorio y hacemos el primer commit.
    * comando: git init
    * agregamos el archivo .gitignore
      * contenido: node_modules/
    * comando: git add 
    * comando: git commit -m "etapa 1 completa"
    

