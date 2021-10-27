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
        console.log('file', file);
        console.log('logo', logo);

        let originalFilename = file.originalname.split(".")[0];

        let gameFilename = file.filename;
        let logoFilename = logo.filename;
        console.log('gameFilename', gameFilename);
        console.log('logoFilename', logoFilename);

        let filePath = path.resolve('uploads', gameFilename)
        let logoPath = path.resolve('uploads', logoFilename);
        console.log('filePath', filePath);
        console.log('logoPath', logoPath);

        let gameDirectory = gameFilename.split(".")[0];
        console.log('gameDirectory', gameDirectory);

        let fileDestination = path.resolve('public', 'games', gameDirectory);
        let logoDestination = path.resolve('public', 'games', gameDirectory, logoFilename);
        console.log('fileDestination', fileDestination);
        console.log('logoDestination', logoDestination);

        extractFile(filePath, fileDestination);
        moveFile(logoPath, logoDestination, fileDestination);

        let { name, description, fundingGoal, gameJamId, developerId } = request.body;
        let game = await Game.create({
            name,
            description,
            logo: `${process.env.ENDPOINT}/games/${gameDirectory}/${logoFilename}`,
            file: `${process.env.ENDPOINT}/games/${gameDirectory}/${originalFilename}`,
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
