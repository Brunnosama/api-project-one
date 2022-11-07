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
    level: {
      type: DataTypes.INTEGER,
      validate: {
        min: {
          args: [[1]],
          msg: "Characters should start from level 1"
        },
        max: {
          args: [[20]],
          msg: "Characters can't have more than 20 levels"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Characters',
    paranoid: true
  });
  return Characters;
};