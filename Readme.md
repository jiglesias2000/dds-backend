# Desarrollo de Sotware: Backend
## Express
* Server
* Archivos estaticos
    * opcion 3
    * opcion 4 que es *muy **bueno***
    * es un texto ~~tachado~~
    > cita de texto

---
```javascript
function generarTabla(datos) {
  let table = '<table border="1">';
  for (const key in datos) {
    if (Object.hasOwnProperty.call(datos, key)) {
      const element = datos[key];
      table += `<tr><td>${key}</td><td>${element}</td></tr>`;
    }
  }
  table += "<table>";
  return table;
}
```
|nombre | apellido |
|--- |--|
|maria|gomez|
|luis|motta|

[visual studio help](http://google.com)
