'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class institution extends Model {
    static associate(models) {
      this.hasMany(models.team)
    }
  }
  institution.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'institution',
  });
  return institution;
};