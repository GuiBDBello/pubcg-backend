const Sequelize = require('sequelize');
const database = require('../db');
const Category = require('./category');
const Game = require('./game');

const GameCategory = database.define('gameCategory', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
});

Category.belongsToMany(Game, {
    through: {
        model: GameCategory
    },
    constraint: true
});
Game.belongsToMany(Category, {
    through: {
        model: GameCategory
    },
    constraint: true
});

module.exports = GameCategory;
