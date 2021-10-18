const Game = require('../models/game');

// index, show, store, update, destroy
module.exports = {
    async index(request, response) {
        let games = Game.findAll();
        return response.json(games);
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
