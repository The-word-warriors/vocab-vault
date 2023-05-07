// models/savedWord.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class SavedWord extends Model { }

SavedWord.init(
  {
    word: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    definitions: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    modelName: 'saved_word',
    underscored: true,
  }
);

module.exports = SavedWord;