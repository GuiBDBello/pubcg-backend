const GameJam = require('../models/gameJam');

// index, show, store, update, destroy
module.exports = {
    async index(request, response) {
        let gameJams = await GameJam.findAll();
        return response.json(gameJams);
    },
    async show(request, response) {
        let gameJam = await GameJam.findByPk(request.params.id);
        return response.json(gameJam);
    },
    async store(request, response) {
        let { name, description, dateTimeStart, dateTimeEnd } = request.body;
        let gameJam = await GameJam.create({
            name,
            description,
            dateTimeStart,
            dateTimeEnd
        });
        return response.json(gameJam);
    },
    async update(request, response) {
        let { name, description, dateTimeStart, dateTimeEnd } = request.body;
        let gameJam = await GameJam.update({
            name,
            description,
            dateTimeStart,
            dateTimeEnd
        }, {
            where: {
                id: request.params.id
            }
        });
        return response.json(gameJam);
    },
    async destroy(request, response) {
        let gameJam = await GameJam.destroy({
            where: {
                id: request.params.id
            }
        });
        return response.json(gameJam);
    }
};
