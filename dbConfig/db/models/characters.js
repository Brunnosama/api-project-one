'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Characters extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Characters.belongsTo(models.Players, {
        foreignKey: "player_id"
      });
      Characters.belongsTo(models.Sessions, {
        foreignKey: "session_id"
      })
    }
  }
  Characters.init({
    name: DataTypes.STRING,
    character_class: DataTypes.STRING,
    level: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Characters',
  });
  return Characters;
};