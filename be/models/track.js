const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');

class Track extends Model {}

Track.init(
  {
    // Model attributes are defined here
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      // allowNull defaults to true
    },
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'Track', // We need to choose the model name
  },
);

module.exports = Track