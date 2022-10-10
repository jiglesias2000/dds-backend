# Desarrollo de Sotware: Backend

## Crear proyecto basico
* crear carpeta: dds-express
* En la carpeta, inicializar proyecto node
    * comando: npm init

  |parametro | valor |
  |--- |--|
  |name|dds-express|
  |description| backend con express|
  |entry point| index.js|
  |etc| etc|


  * instalar libreria express: npm i express
  * crear archivo inicial de la aplicacion: index.js
    * codificar la aplicacion web basica

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
* Ejecutar el proyecto
  * comando: node index.js

* inicializar repositorio
  * comando: git init
  * agregar archivo .gitignore
    * contenido: node_modules/
  * comando: git add 
  * comando: git commit -m "proyecto basico completo"
  * comando: git branch Etapa1
