'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Players extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Players.hasMany(models.Sessions, {
        foreignKey: "narrator_id"
      });
      Players.hasMany(models.Characters, {
        foreignKey: "player_id"
      });
    }
  }
  Players.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    role: DataTypes.ENUM('Player', 'Narrator')
  }, {
    sequelize,
    modelName: 'Players',
    paranoid: true,
    defaultScope: {
      where: {
        active: true
      }
    }
  });
  return Players;
};