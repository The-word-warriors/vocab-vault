const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const User = require('./User'); // import User model
const Word = require('./Words'); // import Word model

class Vocab extends Model { }

Vocab.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: "id",
            }
        },
        vocab_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Word,
                key: "id",
            }
        },
    },
    {
        sequelize, // pass the Sequelize instance
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'vocab',
    }
);

module.exports = { Vocab };
