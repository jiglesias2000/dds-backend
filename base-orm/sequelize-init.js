// configurar ORM sequelize
const { Sequelize, DataTypes } = require("sequelize");
//const sequelize = new Sequelize("sqlite:" + process.env.base );

console.log("sql engine: " + process.env.sqlengine);

let sequelize;
if (process.env.sqlengine === "sqlite") {
  sequelize = new Sequelize("sqlite:" + "./.data/pymes.db", {
    define: {
      //timezone: "local", // Establecer la zona horaria local  (ojo considera la fecha de la base como zona horaria 0)
      timezone: '-03:00', // Establecer la zona horaria en UTC
      freezeTableName: true, // para evitar que pluralise el nombre de la tabla
      timestamps: false,
    },
  });
} else if (process.env.sqlengine === "mysql") {
  sequelize = new Sequelize({
    dialect: "mysql", // Utilizamos el controlador de MySQL
    host: process.env.RDS_HOSTNAME || "localhost", // Cambiar por la dirección del servidor MySQL
    port: 3306, // Cambiar el puerto si es diferente para MySQL
    username: process.env.RDS_USERNAME || "root",
    password: process.env.RDS_PASSWORD || "passmysql",
    database: process.env.RDS_DB_NAME || "pymes",

    define: {
      timezone: "local", // Establecer la zona horaria local  
      // en mysql definir
      freezeTableName: true, // para evitar que pluralice el nombre de la tabla
      timestamps: false,
    },
  });
}

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
      type: DataTypes.DATEONLY,
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
      type: DataTypes.DATEONLY,
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


module.exports = {
  sequelize,
  articulosfamilias,
  articulos,
  Ventas,
  VentasDetalles,
};

const modelos_rutas_conmponentes = require("../configModelosRutasComponentes");
for (let i = 0; i < modelos_rutas_conmponentes.length; i++) {
  const element = modelos_rutas_conmponentes[i];
  const modelName = element.abmConfigAbm.Modelo_Recurso;
  const fieldPK = element.abmConfigAbm.IdCampo;

  let registro = {};
  registro[fieldPK] = {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  };
  for (let j = 0; j < element.abmConfigRegistro.length; j++) {
    const element2 = element.abmConfigRegistro[j];
    if (element2.typeForm === "subtitulo") continue; // 
    element2.type = element2.type ?? "C(30)";
    registro[element2.name] = {
      type: element2.type==="N(10,2)" ? DataTypes.DECIMAL(10,2): element2.type.startsWith("N") ? DataTypes.INTEGER : element2.type==="F" ? DataTypes.DATEONLY : element2.type==="B" ? DataTypes.BOOLEAN : DataTypes.TEXT,
      allowNull: element2.required ? false : true,
      validate: {}
    };
    
    if (element2.required) 
    {
      registro[element2.name].validate.notEmpty = {
        args: true,
        msg: element2.requiredMsj ?? "Este campo es requerido",
      }
    }
    if (element2.minLength && !element2.maxLength) {
      registro[element2.name].validate.len = {
        args: [element2.minLength],
        msg: element2.minLengthMsj ?? "Este campo debe tener como minimo " + element2.minLength + " caracteres",
      }
    }
    if (element2.maxLength && !element2.minLength) {
      registro[element2.name].validate.len = {
        args: [0,element2.maxLength],
        msg: element2.maxLengthMsj ?? "Este campo debe tener como maximo "+ element2.maxLength +" caracteres",
      }
    }
    if (element2.minLength && element2.maxLength) {
      registro[element2.name].validate.len = {
        args: [element2.minLength, element2.maxLength],
        msg: element2.minLengthMsj ?? "Este campo debe tener entre " + element2.minLength + " y " + element2.maxLength + " caracteres",
      }
    }

  }

  const modelo = sequelize.define(modelName, registro, {
    hooks: {
      beforeValidate: (item) => {
        element.abmConfigRegistro.forEach(element => {
          if (typeof item[element.name] === "string") {
            item[element.name] = item[element.name].toUpperCase().trim();
          }  
        });
        
      },
    },
    timestamps: false,
    freezeTableName: true,
  });

  module.exports[modelName] = modelo;

}
