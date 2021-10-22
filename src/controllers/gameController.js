const Game = require('../models/game');

// index, show, store, update, destroy
module.exports = {
    async index(request, response) {
        let games = await Game.findAll();
        return response.json(games);
    },
    async show(request, response) {
        let game = await Game.findByPk(request.params.id);
        return response.json(game);
    },
    async store(request, response) {
        let { name, description, logo, file, fundingGoal, gameJamId, developerId } = request.body;
        let game = await Game.create({
            name,
            description,
            logo,
            file,
            downloadAmount: 0,
            fundingGoal,
            amountFunded: 0,
            gameJamId,
            developerId
        });
        return response.json(game);
    },
    async update(request, response) {
        let { name, description, logo, file, fundingGoal } = request.body;
        let game = await Game.update({
            name,
            description,
            logo,
            file
        }, {
            where: {
                id: request.params.id
            }
        });
        return response.json(game);
    },
    async destroy(request, response) {
        let game = await Game.destroy({
            where: {
                id: request.params.id
            }
        });
        return response.json(game);
    }
};
