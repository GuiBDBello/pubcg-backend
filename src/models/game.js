const Sequelize = require('sequelize');
const database = require('../db');
const GameJam = require ('./gameJam');
const Media = require ('./media');
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
    logo: Sequelize.BLOB,
    file: Sequelize.BLOB,
    downloadAmount: Sequelize.BIGINT,
    fundingGoal: Sequelize.DOUBLE,
    amountFunded: Sequelize.DOUBLE
});

Game.belongsTo(GameJam, { constraint: true });
GameJam.hasMany(Game);

Media.belongsTo(Game, { constraint: true });
Game.hasMany(Media);

Game.belongsTo(User, {
    constraint: true,
    foreignKey: 'developerId'
})

module.exports = Game;
