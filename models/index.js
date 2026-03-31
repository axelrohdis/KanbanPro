const sequelize = require("../config/database");

const Usuario = require("./Usuario");
const Tablero = require("./Tablero");
const Lista = require("./Lista");
const Tarjeta = require("./Tarjeta");

// Relaciones entre Bases de Datos:

Usuario.hasMany(Tablero);
Tablero.belongsTo(Usuario);

Tablero.hasMany(Lista);
Lista.belongsTo(Tablero);

Lista.hasMany(Tarjeta, { foreignKey: "ListaId" });
Tarjeta.belongsTo(Lista, { foreignKey: "ListaId" });

module.exports = {
  sequelize,
  Usuario,
  Tablero,
  Lista,
  Tarjeta,
};