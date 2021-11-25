const Game = require('../models/game');

const fs = require('fs');
const path = require('path');
const unzipper = require('unzipper');

const s3 = require('../s3Client');

function moveFile(oldPath, newPath, directory) {
    let directoryCreated = fs.mkdirSync(directory, { recursive: true });
    console.log('directoryCreated', directoryCreated);

    fs.rename(oldPath, newPath, function (error) {
        if (error) throw error;
        console.log('Successfully renamed - AKA moved!')
    })
}

function extractFile(file, destination) {
    return new Promise((resolve, reject) => {
        fs.createReadStream(file)
            .pipe(unzipper.Extract({ path: destination })
                .on('close', () => {
                    resolve();
                }));
        // reject();
    });
}

async function getFileData(request) {
    console.log('files', request.files);

    let logo = request.files.logo[0];
    let media = request.files.media;
    let file = request.files.file[0];

    let gameDirectory = file.filename.split(".")[0];
    console.log('gameDirectory', gameDirectory);

    let logoFilename = logo.filename;

    let fileDestination = path.resolve('public', 'games', gameDirectory);
    let logoDestination = path.resolve('public', 'games', gameDirectory, logoFilename);

    console.log('fileDestination', fileDestination);
    console.log('logoDestination', logoDestination);

    console.log('file.path', file.path);
    console.log('fileDestination', fileDestination);

    await extractFile(file.path, fileDestination)
        .then(data => console.log('Extracted data:\n', data))
        .catch(err => console.error(err));

    moveFile(logo.path, logoDestination, fileDestination);

    let originalFilename = file.originalname.split(".")[0];
    console.log('originalFilename', originalFilename);

    return { gameDirectory, logoFilename, fileDestination, originalFilename };
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
        let logo;
        let file;
        let gameDirectory;
        let fileDestination;
        let originalFilename;

        try {
            const fileData = await getFileData(request);
            gameDirectory = fileData.gameDirectory;
            fileDestination = fileData.fileDestination;
            originalFilename = fileData.originalFilename;
            logo = `${process.env.PUBLIC_DIR}/games/${gameDirectory}/${fileData.logoFilename}`;
            file = `${process.env.PUBLIC_DIR}/games/${gameDirectory}/${originalFilename}/index.html`
        } catch (e) {
            console.error(e);
            logo = "";
            file = "";
        }

        if (process.env.NODE_ENV.toUpperCase() === 'PRD'
            && gameDirectory && fileDestination) {

            s3.uploadFolderToS3(fileDestination, gameDirectory, process.env.AWS_S3_BUCKET);
        }

        let { name, description, fundingGoal, gameJamId, developerId } = request.body;
        let game = await Game.create({
            name,
            description,
            logo,
            file,
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
