const Sequelize = require('sequelize');
const database = require('../db');
const Badge = require('./badge');
const User = require('./user');

const UserBadge = database.define('userBadge', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
});

Badge.belongsToMany(User, {
    through: {
        model: UserBadge
    },
    constraint: true
});
User.belongsToMany(Badge, {
    through: {
        model: UserBadge
    },
    constraint: true
});

module.exports = UserBadge;
