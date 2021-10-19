const User = require('../models/user');

// index, show, store, update, destroy
module.exports = {
    async index(request, response) {
        let users = await User.findAll();
        return response.json(users);
    },
    async show(request, response) {
        let user = await User.findByPk(request.params.id);
        return response.json(user);
    },
    async store(request, response) {
        let { email, password, name, photo } = request.body;
        let user = await User.create({
            email,
            password,
            name,
            photo,
            experience: 0
        });
        return response.json(user);
    },
    async update(request, response) {
        let { email, password, name, photo } = request.body;
        let user = await User.update({
            email,
            password,
            name,
            photo,
        }, {
            where: {
                id: request.params.id
            }
        });
        return response.json(user);
    },
    async destroy(request, response) {
        let user = await User.destroy({
            where: {
                id: request.params.id
            }
        });
        return response.json(user);
    }
};
