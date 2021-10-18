const Sequelize = require('sequelize');
const database = require('../db');
const GameJam = require('./gameJam');
const User = require('./user');

const Participant = database.define('participant', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
});

GameJam.belongsToMany(User, {
    through: {
        model: Participant
    },
    constraint: true
});
User.belongsToMany(GameJam, {
    through: {
        model: Participant
    },
    constraint: true
});

module.exports = Participant;
