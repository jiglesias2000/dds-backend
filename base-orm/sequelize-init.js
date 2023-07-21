// configurar ORM sequelize
const { Sequelize, DataTypes } = require("sequelize");
//const sequelize = new Sequelize("sqlite:" + process.env.base );
const sequelize = new Sequelize("sqlite:" + "./.data/pymes.db", {
  define: {
    freezeTableName: true,   // para evitar que pluralise el nombre de la tabla
    timestamps: false,
  },
});

// definicion del modelo de datos
const articulosfamilias = sequelize.define(
  "articulosfamilias",
  {
    IdArticuloFamilia: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Nombre: {
      // todo evitar que string autocomplete con espacios en blanco, deberia ser varchar sin espacios
      type: DataTypes.STRING(30),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Nombre es requerido",
        },
        len: {
          args: [5, 30],
          msg: "Nombre debe ser tipo carateres, entre 5 y 30 de longitud",
        },
      },
    },
  },
  {
    // pasar a mayusculas
    hooks: {
      beforeValidate: function (articulofamilia, options) {
        if (typeof articulofamilia.Nombre === "string") {
          articulofamilia.Nombre = articulofamilia.Nombre.toUpperCase().trim();
        }
      },
    },

    timestamps: false,
    freezeTableName: true,
  }
);

const articulos = sequelize.define(
  "articulos",
  {
    IdArticulo: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Nombre: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Nombre es requerido",
        },
        len: {
          args: [5, 60],
          msg: "Nombre debe ser tipo carateres, entre 5 y 60 de longitud",
        },
      },
      unique: {
        args: true,
        msg: "este Nombre ya existe en la tabla!",
      },
    },
    Precio: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Precio es requerido",
        },
      },
    },
    CodigoDeBarra: {
      type: DataTypes.STRING(13),
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Codigo De Barra es requerido",
        },
        is: {
          args: ["^[0-9]{13}$", "i"],
          msg: "Codigo de Barra debe ser numerico de 13 digitos",
        },
      },
    },
    IdArticuloFamilia: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "IdArticuloFamilia es requerido",
        },
      },
    },
    Stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Stock es requerido",
        },
      },
    },
    FechaAlta: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Fecha Alta es requerido",
        },
      },
    },
    Activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Activo es requerido",
        },
      },
    },
  },
  {
    // pasar a mayusculas
    hooks: {
      beforeValidate: function (articulo, options) {
        if (typeof articulo.Nombre === "string") {
          articulo.Nombre = articulo.Nombre.toUpperCase().trim();
        }
      },
    },

    timestamps: false,
    freezeTableName: true,
  }
);

// Definición del modelo Ventas
const Ventas = sequelize.define(
  "Ventas",
  {
    IdVenta: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    IdCliente: {
      type: DataTypes.INTEGER,
    },
    Fecha: {
      type: DataTypes.TEXT,
    },
    Total: {
      type: DataTypes.REAL,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

// Definición del modelo VentasDetalles
const VentasDetalles = sequelize.define(
  "VentasDetalles",
  {
    IdDetalle: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    IdVenta: {
      type: DataTypes.INTEGER,
    },
    IdArticulo: {
      type: DataTypes.INTEGER,
    },
    Cantidad: {
      type: DataTypes.INTEGER,
    },
    Precio: {
      type: DataTypes.REAL,
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

// Establecer la relación entre los modelos Ventas y VentasDetalles
Ventas.hasMany(VentasDetalles, { foreignKey: "IdVenta" });
VentasDetalles.belongsTo(Ventas, { foreignKey: "IdVenta" });

//--------------------------------------------
const Equipos = sequelize.define(
  "Equipos",
  {
    IdEquipo: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Nombre: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Nombre equipo es requerido",
        },
        len: {
          args: [5, 30],
          msg: "Nombre equipo debe ser tipo caracteres, entre 5 y 30 de longitud",
        },
      },
      unique: {
        args: true,
        msg: "Este Nombre ya existe en la tabla!",
      },
    },
    Precio: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Precio es requerido",
        },
      },
    },
    CdadJugadores: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Cantidad de jugadores es requerido",
        },
      },
    },
    FechaAlta: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Fecha Alta  es requerida",
        },
      },
    },
    Activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Activo es requerido",
        },
      },
    },
  },
  {
    hooks: {
      beforeValidate: (equipo) => {
        if (typeof equipo.Nombre === "string") {
          equipo.Nombre = equipo.Nombre.toUpperCase().trim();
        }
      },
    },
    timestamps: false,
    freezeTableName: true,
  }
);

const Copas = sequelize.define(
  "Copas",
  {
    IdCopa: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    Nombre: {
      type: DataTypes.STRING(30),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Nombre copa es requerido",
        },
        len: {
          args: [5, 15],
          msg: "Nombre copa debe ser tipo carateres, entre 5 y 15 de longitud",
        },
      },
    },

    FechaInicio: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Fecha inicio copa es requerida",
        },
      },
    },
  },
  {
    hooks: {
      beforeValidate: (copa) => {
        if (typeof copa.Nombre === "string") {
          copa.Nombre = copa.Nombre.toUpperCase().trim();
        }
      },
    },
    timestamps: false,
    freezeTableName: true,
  }
);

const Estadios = sequelize.define(
  "Estadios",
  {
    IdEstadio: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Nombre: {
      type: DataTypes.STRING(30),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Nombre Estadio es requerido",
        },
        len: {
          args: [5, 15],
          msg: "Nombre Estadio debe ser tipo caracteres, entre 5 y 15 de longitud",
        },
      },
    },
    FechaInauguracion: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Fecha Inauguracion es requerida",
        },
      },
    },
  },
  {
    hooks: {
      beforeValidate: (estadio) => {
        if (typeof estadio.Nombre === "string") {
          estadio.Nombre = estadio.Nombre.toUpperCase().trim();
        }
      },
    },
    timestamps: false,
    freezeTableName: true,
  }
);

const Jugadores = sequelize.define(
  "Jugadores",
  {
    IdJugador: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Nombre: {
      type: DataTypes.STRING(30),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Nombre jugador es requerido",
        },
        len: {
          args: [5, 15],
          msg: "Nombre jugador debe ser tipo caracteres, entre 5 y 15 de longitud",
        },
      },
    },
    Apellido: {
      type: DataTypes.STRING(30),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Apellido es requerido",
        },
        len: {
          args: [5, 15],
          msg: "Apellido debe ser tipo caracteres, entre 5 y 15 de longitud",
        },
      },
    },
    FechaNacimiento: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Fecha nacimiento es requerida",
        },
      },
    },
    Activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Activo es requerido",
        },
      },
    },
  },
  {
    hooks: {
      beforeValidate: (jugador) => {
        if (typeof jugador.Nombre === "string") {
          jugador.Nombre = jugador.Nombre.toUpperCase().trim();
        }
        if (typeof jugador.Apellido === "string") {
          jugador.Apellido = jugador.Apellido.toUpperCase().trim();
        }
      },
    },
    timestamps: false,
    freezeTableName: true,
  }
);
const Ligas = sequelize.define(
  "Ligas",
  {
    IdLiga: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Nombre: {
      type: DataTypes.STRING(30),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Nombre liga es requerido",
        },
        len: {
          args: [5, 15],
          msg: "Nombre liga debe ser tipo caracteres, entre 5 y 15 de longitud",
        },
      },
    },
    FechaInicio: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Fecha inicio es requerida",
        },
      },
    },
  },
  {
    hooks: {
      beforeValidate: (liga) => {
        if (typeof liga.Nombre === "string") {
          liga.Nombre = liga.Nombre.toUpperCase().trim();
        }
      },
    },
    timestamps: false,
    freezeTableName: true,
  }
);

//--------------------------------------------

module.exports = {
  sequelize,
  articulosfamilias,
  articulos,
  Ventas,
  VentasDetalles,
  Copas,
  Equipos,
  Estadios,
  Jugadores,
  Ligas,
};
