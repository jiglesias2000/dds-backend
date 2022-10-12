// configurar ORM sequelize
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite:./.data/pymes.db");

const DISABLE_SEQUELIZE_DEFAULTS = {
  timestamps: false,
  freezeTableName: true,
};

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
      type: DataTypes.STRING(30),
      allowNull: false,
      // https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/
      validate: {
        notEmpty: {
          args: true,
          msg: "este dato no puede estar vacio",
        },
        len: {
          args: [5, 30],
          msg: "dato tipo carateres, entre 5 y 30",
        },
      },
    },
  },
  {
    // pasar a mayusculas
    // hooks: {
    //   beforeValidate: function (articulofamilia, options) {
    //     if (typeof articulofamilia.Nombre === "string") {
    //       articulofamilia.Nombre = articulofamilia.Nombre.toUpperCase();
    //     }
    //   },
    // },
    ... DISABLE_SEQUELIZE_DEFAULTS
  }
);

const articulos = sequelize.define(
  "articulos",
  {
    IdArticulo: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    Nombre: { 
      type: DataTypes.STRING, 
      allowNull: false 
    }
  },
  {
    DISABLE_SEQUELIZE_DEFAULTS
  }
);

module.exports = {
  sequelize,
  articulosfamilias,
  articulos,
};
