const Media = require("../models/media");

module.exports = {
    async index(request, response) {
        let medias = await Media.findAll();
        return response.json(medias);
    },
    async indexGame(request, response) {
        let medias = await Media.findAll({
            where: {
                gameId: request.params.id
            }
        });
        return response.json(medias);
    },
    async show(request, response) {
        let media = await Media.findByPk(request.params.id);
        return response.json(media);
    },
    async store(request, response) {
        let { file, description, gameId } = request.body;
        let media = await Media.create({
            file,
            description,
            gameId
        });
        return response.json(media);
    },
    async update(request, response) {
        let { file, description } = request.body;
        let media = await Media.update({
            file,
            description
        }, {
            where: {
                id: request.params.id
            }
        });
        return response.json(media);
    },
    async destroy(request, response) {
        let media = await Media.destroy({
            where: {
                id: request.params.id
            }
        });
        return response.json(media);
    }
};
