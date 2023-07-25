const RutasGenericasDefinicion = [
    {
      modelName: "articulos",
      fieldPK: "IdArticulo",
      fieldActivo: "Activo",
      arrayOrder: [["Nombre", "ASC"]],
      filterFields: { Nombre: "text", Activo: "boolean" },
    },
    {
      modelName: "Jugadores",
      fieldPK: "IdJugador",
      fieldActivo: "Activo",
      arrayOrder: [
        ["Nombre", "ASC"],
        ["Apellido", "ASC"],
      ],
      filterFields: { Nombre: "text", Apellido: "text", Activo: "boolean" },
    },
    {
      modelName: "Ligas",
      fieldPK: "IdLiga",
      fieldActivo: "Activo",
      filterFields: { Nombre: "text", FechaInicio: "date", Pais:"text", Activo: "boolean" },
      arrayOrder: [["Nombre", "ASC"]],
    },
    {
      modelName: "Equipos",
      fieldPK: "IdEquipo",
      fieldActivo: "Activo",
      arrayOrder: [["Nombre", "ASC"]],
      filterFields: { Nombre: "text", FechaAlta: "date", Activo: "boolean" },
    },
    {
      modelName: "Copas",
      fieldPK: "IdCopa",
      fieldActivo: "",
      arrayOrder: [["Nombre", "ASC"]],
      filterFields: { Nombre: "text", FechaInicio: "date" },
    },
    {
      modelName: "Estadios",
      fieldPK: "IdEstadio",
      fieldActivo: "",
      arrayOrder: [["Nombre", "ASC"]],
      filterFields: { Nombre: "text", FechaInauguracion: "date" },
    },
  ];

  module.exports = RutasGenericasDefinicion;