// Dependencies
// =============================================================
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Pokemon extends Model {}

Pokemon.init(
  {
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    pokemon: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize
  }
);

module.exports = Pokemon;