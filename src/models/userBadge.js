const Sequelize = require('sequelize');
const database = require('../db');

const UserBadge = database.define('userBadge', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
});

module.exports = UserBadge;
