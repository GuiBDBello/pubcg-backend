const Sequelize = require('sequelize');
const database = require('../db');

const Library = database.define('library', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
});

module.exports = Library;
