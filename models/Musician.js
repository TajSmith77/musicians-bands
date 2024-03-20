const { DataTypes } = require('sequelize');
const {Sequelize, sequelize} = require('../db');

// TODO - define the Musician model
let Musician;

Musician = sequelize.define('Musician', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    instrument: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
{})

module.exports = {
    Musician
};