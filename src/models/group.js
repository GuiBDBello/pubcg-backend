const Sequelize = require('sequelize');
const database = require('../db');

const Group = database.define('group', {
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
    logo: Sequelize.STRING(1000),
    description: Sequelize.STRING(400)
});

module.exports = Group;
