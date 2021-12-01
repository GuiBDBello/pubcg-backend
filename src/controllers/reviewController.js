const Review = require('../models/review');
const User = require('../models/user');

module.exports = {
    async index(request, response) {
        let reviews = await Review.findAll();
        return response.json(reviews);
    },
    async indexGame(request, response) {
        let reviews = await Review.findAll({
            include: User,
            where: {
                gameId: request.params.id
            }
        });
        return response.json(reviews);
    },
    async show(request, response) {
        let review = await Review.findByPk(request.params.id);
        return response.json(review);
    },
    async store(request, response) {
        let { score, description, gameId, userId } = request.body;
        let review = await Review.create({
            score,
            description,
            gameId,
            userId
        });
        return response.json(review);
    },
    async update(request, response) {
        let { score, description } = request.body;
        let review = await Review.update({
            score,
            description
        }, {
            where: {
                id: request.params.id
            }
        });
        return response.json(review);
    },
    async destroy(request, response) {
        let review = await Review.destroy({
            where: {
                id: request.params.id
            }
        });
        return response.json(review);
    }
};
