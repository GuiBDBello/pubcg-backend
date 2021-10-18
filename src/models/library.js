const Sequelize = require('sequelize');
const database = require('../db');
const Game = require('./game');
const User = require('./user');

const Library = database.define('library', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
});

Game.belongsToMany(User, {
    through: {
        model: Library
    },
    constraint: true
});
User.belongsToMany(Game, {
    through: {
        model: Library
    },
    constraint: true
});

module.exports = Library;
