const User = require('../models/user');

// index, show, store, update, destroy
module.exports = {
    async index(request, response) {
        let users = User.findAll();
        return response.json(users);
    },
    async show(request, response) {
        return response.json('');
    },
    async store(request, response) {
        return response.json('');
    },
    async update(request, response) {
        return response.json('');
    },
    async destroy(request, response) {
        return response.json('');
    }
};
