async function cargarTabla() {
  const response = await fetch('/api/articulosfamilias');
  const items = await response.json();
  console.log(items);

  let body = '';
  items.forEach((item) => {
    body += `<tr>
          <td>${item.IdArticuloFamilia}</td>
          <td>${item.Nombre}</td>
        </tr>`;
  });

  let bodyTabla = document.getElementById('bodyTabla');
  bodyTabla.innerHTML = body;
}

document.body.onload = cargarTabla;
