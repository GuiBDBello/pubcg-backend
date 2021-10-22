const Category = require('../models/category');

module.exports = {
    async index(request, response) {
        let categories = await Category.findAll();
        return response.json(categories);
    },
    async show(request, response) {
        let category = await Category.findByPk(request.params.id);
        return response.json(category);
    },
    async store(request, response) {
        let { name } = request.body;
        let category = await Category.create({
            name
        });
        return response.json(category);
    },
    async update(request, response) {
        let { name } = request.body;
        let category = await Category.update({
            name
        }, {
            where: {
                id: request.params.id
            }
        });
        return response.json(category);
    },
    async destroy(request, response) {
        let category = await Category.destroy({
            where: {
                id: request.params.id
            }
        });
        return response.json(category);
    }
};
