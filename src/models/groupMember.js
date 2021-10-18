const Sequelize = require('sequelize');
const database = require('../db');
const Group = require('./group');
const User = require('./user');

const GroupMember = database.define('groupMember', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
});

Group.belongsToMany(User, {
    through: {
        model: GroupMember
    },
    constraint: true
});
User.belongsToMany(Group, {
    through: {
        model: GroupMember
    },
    constraint: true
});

module.exports = GroupMember;
