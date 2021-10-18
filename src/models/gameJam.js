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
    dateTimeStart: Sequelize.DATE,
    dateTimeEnd: Sequelize.DATE
});

module.exports = GameJam;
