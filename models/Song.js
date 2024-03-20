const { DataTypes } = require('sequelize');
const {Sequelize, sequelize} = require('../db');

// TODO - define the Song model
let Song;

Song = sequelize.define('Song', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    year: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    length: {
        type: DataTypes.NUMBER,
        allowNull: false
    }
},
{})

module.exports = {
    Song
};