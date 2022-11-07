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
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: "Invalid e-mail!"
        }
      }
    },
    active: DataTypes.BOOLEAN,
    role: {
      type: DataTypes.ENUM('Player', 'Narrator'),
      validate: {
        isIn: {
          args: [['Player', 'Narrator']],
          msg: "Choose if you'll be a 'Player' or a 'Narrator'"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Players',
    paranoid: true,
    defaultScope: {
      where: {
        active: true
      }
    },
    scopes: {
      all: {
        where: {}
      }
    }
  });
  return Players;
};