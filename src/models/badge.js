const Sequelize = require('sequelize');
const database = require('../db');

const Badge = database.define('badge', {
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
    logo: Sequelize.STRING(1000)
});

module.exports = Badge;
