'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sessions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Sessions.hasMany(models.Characters, {
        foreignKey: "session_id"
      });
      Sessions.belongsTo(models.Players, {
        foreignKey: "narrator_id"
      });
    }
  }
  Sessions.init({
    name: DataTypes.STRING,
    start_date: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'Sessions',
    paranoid: true
  });
  return Sessions;
};