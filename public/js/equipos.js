async function cargarDiv() {
  const response = await fetch('/api/equipos');
  const items = await response.json();
  console.log(items);

  let contenido = '';
  items.forEach((item) => {
    contenido += `  <div class="col-sm-6 col-md-4 col-lg-3"><div class="card m-2">
    <img src="${item.bandera}" class="card-img-top" style='width: 100%; height: 15vw; object-fit: cover;' alt="bandera">
    <div class="card-body">
      <h5 class="card-title">${item.equipo}</h5>
      <p class="card-text">Seleccion de futbol de ${item.equipo}</p>
    </div>
    <div class="card-footer">
      <small class="text-muted">Actualizado hace 2 min.</small>
    </div>
    </div>
  </div>`;
  });

  let contenedor = document.getElementById('divCards');
  contenedor.innerHTML = contenido;
}

document.body.onload = cargarDiv;
