const Sequelize = require('sequelize');
const database = require('../db');

const GroupMember = database.define('groupMember', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
});

module.exports = GroupMember;
