// // definicion unica, frontend y backend
// const modelos_rutas_conmponentes = [
//   {
//     abmConfigAbm: {
//       Titulo: "Equipos", // Titulo del ABM
//       Modelo_Recurso: "Equipos", //Modelo Orm, ruta // solo back
//       IdCampo: "IdEquipo", // convencion: autonumerico
//       ActivoCampo: "Activo", // convencion: booleano
//       Consultar: true,
//       Modificar: true,
//       ActivarDesactivar: true,
//       Paginacion: true,
//       OrdenCampo: [["Nombre", "ASC"]],
//     },
//     abmConfigRegistro: [
//       {
//         name: "Nombre",
//         type: "text",
//         validation: {
//           required: { value: true, message: "El nombre es requerido" },
//           minLength: {
//             value: 5,
//             message: "El nombre debe tener al menos 5 caracteres",
//           },
//         },
//         Buscar: true,
//         Listado: true,
//       },
//       {
//         name: "Precio",
//         type: "number",
//         validation: {
//           required: { value: true, message: "El Precio es requerido" },
//         },
//         Buscar: true,
//         Listado: true,
//       },
//       {
//         name: "FechaAlta",
//         label: "Fecha de Alta",
//         type: "date",
//       },
//       {
//         name: "CdadJugadores",
//         label: "Cant de Jugadores",
//         type: "number",
//         Buscar: true,
//         Listado: true,
//       },
//       {
//         name: "Activo",
//         type: "boolean",
//         typeForm: "select",
//         disabled: true,
//         data: [
//           { Id: null, Nombre: null },
//           { Id: true, Nombre: "SI" },
//           { Id: false, Nombre: "NO" },
//         ],
//         value: true,
//         Buscar: true,
//         Listado: true,
//       },
//     ],
//   }, // ------------------------------
//   {
//     abmConfigAbm: {
//       Titulo: "Copas",
//       Modelo_Recurso: "Copas",
//       IdCampo: "IdCopa",
//       ActivoCampo: "",
//       Consultar: true,
//       Modificar: true,
//       ActivarDesactivar: false,
//       Paginacion: true,
//     },
//     abmConfigRegistro: [
//       {
//         name: "Nombre",
//         type: "text",
//         validation: {
//           required: { value: true, message: "El nombre es requerido" },
//           minLength: {
//             value: 5,
//             message: "El nombre debe tener al menos 5 caracteres",
//           },
//         },
//         Buscar: true,
//         Listado: true,
//       },
//       {
//         name: "FechaInicio",
//         label: "Fecha de Inicio",
//         type: "date",
//         Listado: true,
//       },
//     ],
//   }, // ------------------------------

//   {
//     abmConfigAbm: {
//       Titulo: "Jugadores",
//       Modelo_Recurso: "Jugadores",
//       IdCampo: "IdJugador",
//       ActivoCampo: "Activo",

//       Consultar: true,
//       Modificar: true,
//       ActivarDesactivar: true,
//       Paginacion: true,
//     },
//     abmConfigRegistro: [
//       {
//         name: "Nombre",
//         type: "text",
//         validation: {
//           required: { value: true, message: "El nombre es requerido" },
//           minLength: {
//             value: 5,
//             message: "El nombre debe tener al menos 5 caracteres",
//           },
//         },
//         Buscar: true,
//         Listado: true,
//       },
//       {
//         name: "Apellido",
//         type: "text",
//         validation: {
//           required: { value: true, message: "El Apellido es requerido" },
//           minLength: {
//             value: 5,
//             message: "El Apellido debe tener al menos 5 caracteres",
//           },
//         },
//         Buscar: true,
//         Listado: true,
//       },
//       {
//         name: "FechaNacimiento",
//         label: "Fecha de Nacimiento",
//         type: "date",
//       },
//       {
//         name: "Activo",
//         type: "boolean",
//         typeForm: "select",
//         disabled: true,
//         data: [
//           { Id: null, Nombre: null },
//           { Id: true, Nombre: "SI" },
//           { Id: false, Nombre: "NO" },
//         ],
//         value: true,
//         Buscar: true,
//         Listado: true,
//       },
//     ],
//   }, // ------------------------------
//   {
//     abmConfigAbm: {
//       Titulo: "Estadios",
//       Modelo_Recurso: "Estadios",
//       IdCampo: "IdEstadio",
//       ActivoCampo: "",

//       Consultar: true,
//       Modificar: true,
//       ActivarDesactivar: false,
//       Paginacion: true,
//     },
//     abmConfigRegistro: [
//       {
//         name: "Nombre",
//         type: "text",
//         validation: {
//           required: { value: true, message: "El nombre es requerido" },
//           minLength: {
//             value: 5,
//             message: "El nombre debe tener al menos 5 caracteres",
//           },
//         },
//         Buscar: true,
//         Listado: true,
//       },
//       {
//         name: "FechaInauguracion",
//         label: "Fecha de Inauguracion",
//         type: "date",
//         Listado: true,
//       },
//     ],
//   }, // ------------------------------
//   {
//     abmConfigAbm: {
//       Titulo: "Ligas",
//       Modelo_Recurso: "Ligas",
//       IdCampo: "IdLiga",
//       ActivoCampo: "",

//       Consultar: true,
//       Modificar: true,
//       ActivarDesactivar: false,
//       Paginacion: true,
//     },
//     abmConfigRegistro: [
//       {
//         name: "Nombre",
//         type: "text",
//         validation: {
//           required: { value: true, message: "El nombre es requerido" },
//           minLength: {
//             value: 5,
//             message: "El nombre debe tener al menos 5 caracteres",
//           },
//         },
//         Buscar: true,
//         Listado: true,
//       },
//       {
//         name: "Descripcion",
//         type: "text",
//         validation: {
//           required: { value: true, message: "La descripcion es requerida" },
//           minLength: {
//             value: 10,
//             message: "La descripcion debe tener al menos 5 caracteres",
//           },
//         },
//         Buscar: false,
//         Listado: false,
//       },

//       {
//         name: "NumEquipos",
//         label: "Numero de Equipos",
//         type: "number",
//         Buscar: false,
//         Listado: false,
//       },
//       {
//         name: "IngresosMediosEquipo",
//         label: "Ingreso Medio del Equipo",
//         type: "number",
//         Buscar: false,
//         Listado: false,
//       },

//       {
//         name: "FechaInicio",
//         label: "Fecha de Inicio",
//         type: "date",
//         Buscar: true,
//         Listado: true,
//       },
//       {
//         name: "Pais",
//         type: "text",
//         Buscar: true,
//         Listado: true,
//       },
//       {
//         name: "Activo",
//         type: "boolean",
//         typeForm: "select",
//         disabled: true,
//         data: [
//           { Id: null, Nombre: null },
//           { Id: true, Nombre: "SI" },
//           { Id: false, Nombre: "NO" },
//         ],
//         value: true,
//         Buscar: true,
//         Listado: true,
//       },
//     ],
//   },
// ];

// definicion unica, frontend y backend
const modelos_rutas_conmponentes = [
  {
    abmConfigAbm: {
      Titulo: "Equipos", // Titulo del ABM
      Modelo_Recurso: "Equipos", //Modelo Orm, Recurso para url
      IdCampo: "IdEquipo", // convencion: autonumerico
      ActivoCampo: "Activo", // convencion: booleano
      Consultar: true,
      Modificar: true,
      ActivarDesactivar: true,
      Paginacion: true,
      OrdenCampo: [["Nombre", "ASC"]],
    },
    abmConfigRegistro: [
      {
        name: "Nombre",
        type: "C(100)",
        required: true,
        requiredMsj: "El nombre es requerido",
        minLength: 5,
        minLengthMsj: "El nombre debe tener al menos 5 caracteres",
        Buscar: true,
        Listado: true,
      },
      {
        name: "Precio",
        type: "N(10,2)",
        required: true,
        requiredMsj: "El precio es requerido",
        Buscar: true,
        Listado: true,
      },
      {
        name: "FechaAlta",
        label: "Fecha de Alta",
        type: "F",
      },
      {
        name: "CdadJugadores",
        label: "Cant de Jugadores",
        type: "N(10)",
        Buscar: true,
        Listado: true,
      },
      {
        name: "Activo",
        type: "B",
        typeForm: "select",
        disabled: true,
        data: [
          { Id: null, Nombre: null },
          { Id: true, Nombre: "SI" },
          { Id: false, Nombre: "NO" },
        ],
        value: true,
        Buscar: true,
        Listado: true,
      },
    ],
  }, // ------------------------------
  {
    abmConfigAbm: {
      Titulo: "Copas",
      Modelo_Recurso: "Copas",
      IdCampo: "IdCopa",
      ActivoCampo: "",
      Consultar: true,
      Modificar: true,
      ActivarDesactivar: false,

      Paginacion: true,
    },
    abmConfigRegistro: [
      {
        name: "Nombre",
        type: "C(100)",
        required: true,
        requiredMsj: "El nombre es requerido",
        minLength: 5,
        minLengthMsj: "El nombre debe tener al menos 5 caracteres",
        Buscar: true,
        Listado: true,
      },
      {
        name: "FechaInicio",
        label: "Fecha de Inicio",
        type: "F",
        Listado: true,
      },
    ],
  }, // ------------------------------

  {
    abmConfigAbm: {
      Titulo: "Jugadores",
      Modelo_Recurso: "Jugadores",
      IdCampo: "IdJugador",
      ActivoCampo: "Activo",
      Consultar: true,
      Modificar: true,
      ActivarDesactivar: true,
      Paginacion: true,
    },
    abmConfigRegistro: [
      {
        name: "Nombre",
        type: "C(100)",
        required: true,
        requiredMsj: "El nombre es requerido",
        minLength: 5,
        minLengthMsj: "El nombre debe tener al menos 5 caracteres",
        Buscar: true,
        Listado: true,
      },
      {
        name: "Apellido",
        type: "C(100)",
        required: true,
        requiredMsj: "El Apellido es requerido",
        minLength: 5,
        minLengthMsj: "El Apellido debe tener al menos 5 caracteres",
        Buscar: true,
        Listado: true,
      },
      {
        name: "FechaNacimiento",
        label: "Fecha de Nacimiento",
        type: "F",
      },
      {
        name: "Activo",
        type: "B",
        typeForm: "select",
        disabled: true,
        data: [
          { Id: null, Nombre: null },
          { Id: true, Nombre: "SI" },
          { Id: false, Nombre: "NO" },
        ],
        value: true,
        Buscar: true,
        Listado: true,
      },
    ],
  }, // ------------------------------
  {
    abmConfigAbm: {
      Titulo: "Estadios",
      Modelo_Recurso: "Estadios",
      IdCampo: "IdEstadio",
      ActivoCampo: "",
      Consultar: true,
      Modificar: true,
      ActivarDesactivar: false,
      Paginacion: true,
    },
    abmConfigRegistro: [
      {
        name: "Nombre",
        type: "C(100)",
        required: true,
        requiredMsj: "El nombre es requerido",
        minLength: 5,
        minLengthMsj: "El nombre debe tener al menos 5 caracteres",
        Buscar: true,
        Listado: true,
      },
      {
        name: "FechaInauguracion",
        label: "Fecha de Inauguracion",
        type: "F",
        Listado: true,
      },
    ],
  }, // ------------------------------
  {
    abmConfigAbm: {
      Titulo: "Ligas",
      Modelo_Recurso: "Ligas",
      IdCampo: "IdLiga",
      ActivoCampo: "",
      Consultar: true,
      Modificar: true,
      ActivarDesactivar: false,
      Paginacion: true,
    },
    abmConfigRegistro: [
      {
        name: "Datos Identificatorios",
        typeForm: "subtitulo",
        icon: "fa fa-id-card",
      },
      {
        name: "Nombre",
        type: "C(100)",
        required: true,
        requiredMsj: "El nombre es requerido",
        minLength: 5,
        minLengthMsj: "El nombre debe tener al menos 5 caracteres",
        Buscar: true,
        Listado: true,
      },
      {
        name: "Descripcion",
        type: "C(100)",
        required: true,
        requiredMsj: "La descripcion es requerida",
        minLength: 10,
        minLengthMsj: "La descripcion debe tener al menos 10 caracteres",
        Buscar: false,
        Listado: false,
      },
      {
        name: "Datos Comerciales",
        typeForm: "subtitulo",
        icon: "fa fa-money",
      },

      {
        name: "NumEquipos",
        label: "Numero de Equipos",
        type: "N(10)",
        required: true,
        Buscar: false,
        Listado: false,
      },
      {
        name: "IngresosMediosEquipo",
        label: "Ingreso Medio del Equipo",
        type: "N(10)",
        Buscar: false,
        Listado: false,
      },

      {
        name: "FechaInicio",
        label: "Fecha de Inicio",
        type: "F",
        Buscar: true,
        Listado: true,
      },
      {
        name: "Pais",
        type: "C(100)",
        Buscar: true,
        Listado: true,
      },
      {
        name: "Activo",
        type: "B",
        typeForm: "select",
        disabled: true,
        data: [
          { Id: null, Nombre: null },
          { Id: true, Nombre: "SI" },
          { Id: false, Nombre: "NO" },
        ],
        value: true,
        Buscar: true,
        Listado: true,
      },
    ],
  }, // ------------------------------

  {
    abmConfigAbm: {
      Titulo: "Personas",
      Modelo_Recurso: "Personas",
      IdCampo: "IdPersona",
      ActivoCampo: "",
      Consultar: true,
      Modificar: true,
      ActivarDesactivar: true,
      Paginacion: true,
    },
    abmConfigRegistro: [
      {
        name: "Datos Personales",
        typeForm: "subtitulo",
        icon: "fa fa-id-card",
      },
      {
        name: "Nombre",
        placeholder: "Apellido y Nombre",
        type: "C(60)",
        required: true,
        requiredMsj: "El nombre es requerido", //default Dato requerido
        minLength: 3,
        minLengthMsj: "El nombre debe tener al menos 3 caracteres", // default
        maxLength: 20, //default segun type, define la propidad html
        maxLengthMsj: "El nombre debe como maximo 100 caracteres", //default
        Buscar: true,
        Listado: true,
      },
      {
        name: "IdTipoDocumento",
        label: "Tipo Documento",
        type: "C(3)",
        data: [
          { i: "DNI", n: "Documento Nacional de Identidad" },
          { i: "LC", n: "Libreta Civica" },
          { i: "LE", n: "Libreta de Enrolamiento" },
          { i: "PSP", n: "Pasaporte" },
        ],
        typeForm: "select", //exige data ó urlData
        value: "LE",
      },
      {
        name: "NumeroDocumento",
        label: "Numero de Documento",
        type: "N(10,0)",
        required: true,
        maxLength: 8,
      },
      {
        name: "IdSexo",
        label: "Sexo",
        type: "C(1)",
        typeForm: "radio", //exige data ó urlData
        data: [
          { i: "M", n: "Masculino" },
          { i: "F", n: "Femenino" },
        ],
      },

      {
        name: "FechaNacimiento",
        label: "Fecha de Nacimiento",
        type: "F", // F ó FH
        value: "today", // calcular dia de hoy
      },
      {
        name: "IdEstadoCivil",
        label: "Estado Civil",
        type: "C(1)",
        typeForm: "select",
        data: [
          { i: "S", n: "Soltero" },
          { i: "C", n: "Casado" },
          { i: "D", n: "Divorciado" },
          { i: "V", n: "Viudo" },
        ],
      },
      {
        name: "Mail",
        type: "C(60)",
        typeForm: "email",
        required: true,
        requiredMsj: "El mail es requerido",
        pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$/,
      },
      //{ name: "Telefono" },
      {
        name: "IngresosMensuales",
        label: "Ingresos Mensuales",
        type: "N(10,2)", // N(10,2) es moneda, con icono en pantalla
      },
      {
        name: "ComidaPreferida",
        label: "Comida Preferida", // (generar label from PascalCase)
        typeForm: "select",
        data: [
          { i: "lom", n: "Lomito" },
          { i: "pza", n: "Pizza" },
          { i: "emp", n: "Empanada" },
        ],
      },
      { name: "Observaciones", type: "C()", typeForm: "textarea", maxLength: 1000 },
      {
        name: "TieneAutoPropio",
        label: "Tiene auto propio",
        type: "B", // por defecto en un checkbox
      },
      {
        name: "TieneCasaPropia",
        label: "Tiene Casa Propia",
        type: "B", // por defecto en un checkbox
      },

      {
        name: "CasaPropiaDomicilio",
        typeForm: "subtitulo",
        label: "Casa Propia - Domicilio",
      },
      { name: "Calle" },
      { name: "Altura", type: "N(5)" },
      { name: "Localidad", type: "C(100)" },
      {
        name: "Provincia",
        type: "N(10)",
        typeForm: "select",
        data: [
          { i: 1, n: "Cordoba" },
          { i: 2, n: "Buenos Aires" },
          { i: 3, n: "Santa Fe" },
        ],
      },
      { name: "CodigoPostal", type: "C(6)", pattern: "[A-Z]2" },
    ],
  },
  // ------------------------------

  {
    abmConfigAbm: {
      Titulo: "Clientes",
      Modelo_Recurso: "Clientes",
      IdCampo: "IdCliente",
      ActivoCampo: "Activo",
      Consultar: true,
      Modificar: true,
      ActivarDesactivar: true,
      Paginacion: true,
      OrdenCampo: [["Nombre", "ASC"]],
    },
    abmConfigRegistro: [
      {
        name: "Datos Personales",
        typeForm: "subtitulo",
        icon: "fas fa-user-alt",
      },
      {
        name: "Nombre",
        placeholder: "Apellidos, Nombres",
        type: "C(50)",
        required: true,
        requiredMsj: "El nombre es requerido", //default Dato requerido
        minLength: 3,
        minLengthMsj: "El nombre debe tener al menos 3 caracteres", // default
        maxLength: 50, //default segun type, define la propidad html
        maxLengthMsj: "El nombre debe como maximo 50 caracteres", //default
        Buscar: true,
        Listado: true,

      },
      {
        name: "Activo",
        type: "B",
        typeForm: "select",
        disabled: true,
        data: [
          { Id: null, Nombre: null },
          { Id: true, Nombre: "SI" },
          { Id: false, Nombre: "NO" },
        ],
        value: true,
        Buscar: true,
        Listado: true,
      },
      {
        name: "IdTipoDocumento",
        label: "Tipo Documento",
        type: "C(3)",
        data: [
          { i: "DNI", n: "Documento Nacional de Identidad" },
          { i: "LC", n: "Libreta Civica" },
          { i: "LE", n: "Libreta de Enrolamiento" },
          { i: "PSP", n: "Pasaporte" },
        ],
        typeForm: "select", //exige data ó urlData
        value: "LE",
      },
      {
        name: "NumeroDocumento",
        label: "Numero de Documento",
        type: "N(10,0)",
        required: true,
        maxLength: 8,
      },
      {
        name: "IdSexo",
        type: "C(1)",
        typeForm: "radio", //exige data ó urlData
        data: [
          { i: "M", n: "Masculino" },
          { i: "F", n: "Femenino" },
        ],
      },

      {
        name: "FechaNacimiento",
        label: "Fecha de Nacimiento",
        type: "F", // F ó FH
        value: "today", // calcular dia de hoy
      },
      {
        name: "IdEstadoCivil",
        label: "Estado Civil",
        type: "C(1)",
        typeForm: "select",
        data: [
          { i: "S", n: "Soltero" },
          { i: "C", n: "Casado" },
          { i: "D", n: "Divorciado" },
          { i: "V", n: "Viudo" },
        ],
      },
      {
        name: "Mail",
        type: "C(60)",
        typeForm: "email",
        required: true,
        requiredMsj: "El mail es requerido",
        pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$/,
      },
      {
        name: "Observaciones",
        type: "C()",
        typeForm: "textarea",
        required: false,
      },
      {
        name: "Datos Comerciales",
        typeForm: "subtitulo",
        icon: "fa fa-id-card",
      },
      {
        name: "Cuit",
        type: "N(13)", 
      },
      {
        name: "CreditoMaximo",
        label: "Credito Maximo",
        type: "N(10,2)", // N(10,2) es moneda, con icono en pantalla
      },
      {
        name: "TieneTrabajo",
        label: "Tienda Trabajo",
        type: "B"
      },
      {
        name: "TieneAuto",
        label: "Tiene auto",
        type: "B"
      },
      {
        name: "TieneCasa",
        label: "Tiene casa",
        type: "B"
      },

      {
        name: "Datos Domicilio",
        typeForm: "subtitulo",
        icon: "fa fa-id-card",
      },
      {
        name: "IdPais",
        type: "N(10)",
        typeForm: "select",
        data: [
          { i: 1, n: "ARGENTINA" },
          { i: 2, n: "BRASIL" },
          { i: 3, n: "CHILE" },
        ],
      },
      {
        name: "IdProvincia",
        type: "N(10)",
        typeForm: "select",
        data: [
          { i: 1, n: "CORDOBA" },
          { i: 2, n: "BUENOS AIRES" },
          { i: 3, n: "SANTA FE" },
        ],
      },
      {
        name: "IdDepartamento",
        type: "N(10)",
        typeForm: "select",
        data: [
          { i: 1, n: "CAPITAL" },
          { i: 2, n: "NORTE" },
          { i: 3, n: "SUR" },
        ],
      },
      {
        name: "Localidad",
        type: "C(100)",
      },
      { name: "Calle" },
      { name: "NumeroCalle", label:"Numero Calle", type: "N(5)" },
    ],
  },
];

module.exports = modelos_rutas_conmponentes;
