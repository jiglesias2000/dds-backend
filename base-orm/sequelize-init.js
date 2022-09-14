const { Sequelize, DataTypes } = require("sequelize");

//const sequelize = new Sequelize('sqlite::memory:');
const sequelize = new Sequelize("sqlite:./.data/pymes.db");

const DISABLE_SEQUELIZE_DEFAULTS = {
  timestamps: false,
  freezeTableName: true,
};

const articulosfamilias = sequelize.define(
  "articulosfamilias",
  {
    // Model attributes are defined here
    IdArticuloFamilia: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    //Nombre: DataTypes.STRING,

    Nombre: {
      type: DataTypes.STRING(30),
      allowNull: false,
      // https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/
      validate: {
        // is: /^[0-9a-f]{64}$/i ,
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
    timestamps: false,
    freezeTableName: true,
    // hooks: {
    //   beforeValidate: function (articulofamilia, options) {
    //     if (typeof articulofamilia.Nombre === "string") {
    //       articulofamilia.Nombre = articulofamilia.Nombre.toUpperCase();
    //     }
    //   },
    // },
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
    Nombre: { type: DataTypes.STRING, allowNull: false },
  },
  {
    DISABLE_SEQUELIZE_DEFAULTS,
  }
);

module.exports = {
  sequelize,
  articulosfamilias,
  articulos,
};
