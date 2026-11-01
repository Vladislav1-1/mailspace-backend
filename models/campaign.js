'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Campaign extends Model {
    static associate(models) {}
  }
  Campaign.init({
    title: DataTypes.STRING,
    subject: DataTypes.STRING,
    template: DataTypes.STRING,
    status: DataTypes.STRING,
    recipientsCount: DataTypes.INTEGER,
    openRate: DataTypes.FLOAT,
    priority: {
      type: DataTypes.STRING,
      defaultValue: 'normal'
    },
    scheduledDate: DataTypes.STRING,
    authorEmail: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Campaign',
  });
  return Campaign;
};