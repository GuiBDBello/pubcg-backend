const Sequelize = require('sequelize');
const database = require('../db');

const GameCategory = database.define('gameCategory', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
});

module.exports = GameCategory;
