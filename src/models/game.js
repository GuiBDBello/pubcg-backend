const Sequelize = require('sequelize');
const database = require('../db');
const Category = require('./category');
const GameCategory = require('./gameCategory');
const GameJam = require ('./gameJam');
const Library = require('./library');
const User = require ('./user');

const Game = database.define('game', {
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
    description: Sequelize.STRING(1000),
    logo: Sequelize.STRING(200),
    file: Sequelize.STRING(1000),
    downloadAmount: Sequelize.BIGINT,
    fundingGoal: Sequelize.DOUBLE,
    amountFunded: Sequelize.DOUBLE
});

// N:N Game-Category Relationship
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

// 1:N GameJam-Game Relationship
GameJam.hasMany(Game);
Game.belongsTo(GameJam, { constraint: true });

// 1:N User-Game Relationship
Game.belongsTo(User, {
    constraint: true,
    foreignKey: 'developerId'
});

// N:N Game-User Relationship
User.belongsToMany(Game, {
    through: {
        model: Library
    },
    constraint: true
});
Game.belongsToMany(User, {
    through: {
        model: Library
    },
    constraint: true
});

module.exports = Game;
