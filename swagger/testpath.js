const fs = require('fs');

// fs usa ruta siempre desde root 
if (fs.existsSync('index.js')) 
{ console.log('si existe')}
else console.log('no')

// require siempre usa relativa
