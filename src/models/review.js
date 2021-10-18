const Sequelize = require('sequelize');
const database = require('../db');
const Game = require('./game');
const User = require('./user');

const Review = database.define('review', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    score: {
        type: Sequelize.NUMBER,
        allowNull: false
    },
    description: Sequelize.STRING(1000)
});

Review.belongsTo(Game, { constraint: true });
Game.hasMany(Review);

Review.belongsTo(User, { constraint: true });
User.hasMany(Review);

module.exports = Review;
