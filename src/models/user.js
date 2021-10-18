const Sequelize = require('sequelize');
const database = require('../db');

const User = database.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    email: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    password: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    name: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    photo: Sequelize.BLOB,
    experience: Sequelize.DECIMAL
});

module.exports = User;
