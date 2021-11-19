const Game = require('../models/game');

const fs = require('fs');
const path = require('path');
const unzipper = require('unzipper');

function moveFile(oldPath, newPath, directory) {
    let directoryCreated = fs.mkdirSync(directory, { recursive: true });
    console.log('directoryCreated', directoryCreated);

    fs.rename(oldPath, newPath, function (error) {
        if (error) throw error;
        console.log('Successfully renamed - AKA moved!')
    })
}

function extractFile(file, destination) {
    fs.createReadStream(file)
        .pipe(unzipper.Extract({ path: destination }));
}

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
        console.log('files', request.files);

        let logo = request.files.logo[0];
        let media = request.files.media;
        let file = request.files.file[0];

        let gameDirectory = file.filename.split(".")[0];
        console.log('gameDirectory', gameDirectory);

        let logoFilename = logo.filename;

        let fileDestination = path.resolve('public', 'games', gameDirectory);
        let logoDestination = path.resolve('public', 'games', gameDirectory, logoFilename);

        extractFile(file.path, fileDestination);
        moveFile(logo.path, logoDestination, fileDestination);

        let originalFilename = file.originalname.split(".")[0];

        let { name, description, fundingGoal, gameJamId, developerId } = request.body;
        let game = await Game.create({
            name,
            description,
            logo: `${process.env.PUBLIC_DIR}/games/${gameDirectory}/${logoFilename}`,
            file: `${process.env.PUBLIC_DIR}/games/${gameDirectory}/${originalFilename}`,
            downloadAmount: 0,
            fundingGoal,
            amountFunded: 0,
            gameJamId,
            developerId
        });

        return response.json(game);
    },
    async update(request, response) {
        let { name, description, logo, file } = request.body;
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
