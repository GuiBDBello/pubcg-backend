const Sequelize = require('sequelize');
const database = require('../db');

const Media = database.define('media', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    file: {
        type: Sequelize.BLOB,
        allowNull: false
    },
    description: Sequelize.STRING(100),
});

module.exports = Media;
