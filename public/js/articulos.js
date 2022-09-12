async function cargarTabla() {
  const response = await fetch('/api/articulos');
  const items = await response.json();
  console.log(items);

  let body = '';
  items.forEach((item) => {
    body += `<tr>
          <td>${item.Nombre}</td>
          <td>${item.Precio}</td>
          <td>${item.Stock}</td>
          <td>${item.FechaAlta}</td>
          <td>${item.Activo ? 'SI' : 'NO'}</td>
          <td class="text-center text-nowrap">
            <button class="btn btn-sm btn-outline-primary" title="Consultar" >
                      <i class="fa fa-eye"></i>
                  </button>
            <button class="btn btn-sm btn-outline-primary" title="Modificar">
                      <i class="fa fa-pencil"></i>
                  </button>
            <button class="btn btn-sm ${
              item.Activo ? 'btn-outline-success' : 'btn-outline-danger'
            }"
                      title="${item.Activo ? 'Desactivar' : 'Activar'}">
                      <i class="fa fa-${item.Activo ? 'times' : 'check'}"></i>
                  </button>
          </td>
          </tr>`;
  });

  let bodyTabla = document.getElementById('bodyTabla');
  bodyTabla.innerHTML = body;
}

document.body.onload = cargarTabla;
