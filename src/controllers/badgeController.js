const Badge = require('../models/badge');

module.exports = {
    async index(request, response) {
        let badges = await Badge.findAll();
        return response.json(badges);
    },
    async show(request, response) {
        let badge = await Badge.findByPk(request.params.id);
        return response.json(badge);
    },
    async store(request, response) {
        let { name, logo } = request.body;
        let badge = await Badge.create({
            name,
            logo
        });
        return response.json(badge);
    },
    async update(request, response) {
        let { name, logo } = request.body;
        let badge = await Badge.update({
            name,
            logo
        }, {
            where: {
                id: request.params.id
            }
        });
        return response.json(badge);
    },
    async destroy(request, response) {
        let badge = await Badge.destroy({
            where: {
                id: request.params.id
            }
        });
        return response.json(badge);
    }
};
