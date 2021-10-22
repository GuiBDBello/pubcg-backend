const Group = require('../models/group');

module.exports = {
    async index(request, response) {
        let groups = await Group.findAll();
        return response.json(groups);
    },
    async show(request, response) {
        let group = await Group.findByPk(request.params.id);
        return response.json(group);
    },
    async store(request, response) {
        let { name, logo, description } = request.body;
        let group = await Group.create({
            name,
            logo,
            description
        });
        return response.json(group);
    },
    async update(request, response) {
        let { name, logo, description } = request.body;
        let group = await Group.update({
            name,
            logo,
            description
        }, {
            where: {
                id: request.params.id
            }
        });
        return response.json(group);
    },
    async destroy(request, response) {
        let group = await Group.destroy({
            where: {
                id: request.params.id
            }
        });
        return response.json(group);
    }
};
