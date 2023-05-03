const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Word extends Model { }

Word.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        word: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        definition: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    });