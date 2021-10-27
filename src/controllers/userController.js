const User = require('../models/user');

// index, show, store, update, destroy
module.exports = {
    async index(request, response) {
        const users = await User.findAll();
        return response.json(users);
    },
    async show(request, response) {
        const user = await User.findByPk(request.params.id);
        return response.json(user);
    },
    async store(request, response) {
        const { email, password, name, photo } = request.body;
        const user = await User.create({
            email,
            password,
            name,
            photo,
            experience: 0
        }).then((res) => {
            return res;
        }).catch((error) => {
            return error;
        });
        return response.json(user);
    },
    async update(request, response) {
        const { email, password, name, photo } = request.body;
        const user = await User.update({
            email,
            password,
            name,
            photo,
        }, {
            where: {
                id: request.params.id
            }
        }).then((res) => {
            return res;
        }).catch((error) => {
            if (error.errors[0].message) return error.errors[0].message;
            if (error.name) return error.name;
            return error;
        });
        return response.json(user);
    },
    async destroy(request, response) {
        const user = await User.destroy({
            where: {
                id: request.params.id
            }
        });
        return response.json(user);
    },
    async login(request, response) {
        const { email } = request.body;
        const user = await User.findOne({
            where: { email }
        }).then(res => {
            return res;
        }).catch(err => {
            return err;
        });
        return response.json(user);
    }
};
