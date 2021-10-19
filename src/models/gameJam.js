const Sequelize = require('sequelize');
const database = require('../db');

const GameJam = database.define('gameJam', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    description: Sequelize.STRING(1000),
    dateTimeStart: Sequelize.DATE,
    dateTimeEnd: Sequelize.DATE
});

module.exports = GameJam;
