const Sequelize = require('sequelize');
const database = require('../db');

const Participant = database.define('participant', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
});

module.exports = Participant;
