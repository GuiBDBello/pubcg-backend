const Sequelize = require('sequelize');
const database = require('../db');
const Badge = require('./badge');
const GameJam = require('./gameJam');
const Group = require('./group');
const GroupMember = require('./groupMember');
const Participant = require('./participant');
const UserBadge = require('./userBadge');

const User = database.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    email: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    name: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    photo: Sequelize.BLOB,
    experience: Sequelize.DECIMAL
});

// N:N User-Badge Relationship
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

// N:N User-Group Relationship
User.belongsToMany(Group, {
    through: {
        model: GroupMember
    },
    constraint: true
});
Group.belongsToMany(User, {
    through: {
        model: GroupMember
    },
    constraint: true
});

// N:N User-GameJam Relationship
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

module.exports = User;
