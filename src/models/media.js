const Sequelize = require('sequelize');
const database = require('../db');
const Game = require ('./game');

const Media = database.define('media', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    file: {
        type: Sequelize.STRING(1000),
        allowNull: false
    },
    description: Sequelize.STRING(100),
});

// 1:N Game-Media Relationship
Game.hasMany(Media);
Media.belongsTo(Game, { constraint: true });

module.exports = Media;
