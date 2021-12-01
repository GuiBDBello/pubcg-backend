const Game = require("../models/game");
// Má prática, eu sei, mas to sem tempo
const Media = require("../models/media");

const fs = require("fs");
const path = require("path");
const unzipper = require("unzipper");

const s3 = require("../s3Client");

function extractFile(file, destination) {
    return new Promise((resolve, reject) => {
        fs.createReadStream(file)
            .pipe(unzipper.Extract({ path: destination })
                .on("close", () => {
                    resolve();
                }));
        // reject();
    });
}

async function moveFile(oldPath, newPath, directory) {
    console.log("Moving from oldPath", oldPath, "\nto newPath", newPath, "\ninto directory", directory);
    // const fsPromises = fs.promises;

    return new Promise((resolve, reject) => {
        fs.mkdir(directory, { recursive: true }, (err) => {
            if (err) reject();
            else resolve();
        });
    }).then(() => {
        fs.rename(oldPath, newPath, (err) => {
            if (err) throw err;
        });
    }).catch((err) => {
        if (err) throw err;
    });
}

async function getFileData(request) {
    console.log("files", request.files);

    let logo = request.files.logo[0];
    let file = request.files.file[0];

    let gameDirectory = file.filename.split(".")[0];
    console.log("gameDirectory", gameDirectory);

    let logoFilename = logo.filename;

    let fileDestination = path.resolve("public", "games", gameDirectory);
    let logoDestination = path.resolve("public", "games", gameDirectory, logoFilename);
    let mediaDestination = path.resolve("public", "games", gameDirectory, "medias");

    console.log("file.path", file.path);
    console.log("fileDestination", fileDestination);
    console.log("logoDestination", logoDestination);
    console.log("mediaDestination", mediaDestination);

    await extractFile(file.path, fileDestination)
        .then(data => console.log("Extracted data!"))
        .catch(err => console.error(err));

    await moveFile(logo.path, logoDestination, fileDestination);

    let originalFilename = file.originalname.split(".")[0];
    console.log("originalFilename", originalFilename);

    return {
        gameDirectory,
        logoFilename,
        originalFilename,
        fileDestination,
        mediaDestination,
    };
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
        let mediaPath;

        let data;
        try {
            data = await getFileData(request);
            logo = `${process.env.PUBLIC_DIR}/games/${data.gameDirectory}/${data.logoFilename}`;
            file = `${process.env.PUBLIC_DIR}/games/${data.gameDirectory}/${data.originalFilename}/index.html`;
            mediaPath = `${process.env.PUBLIC_DIR}/games/${data.gameDirectory}/medias`;

            if (process.env.NODE_ENV.toUpperCase() === "PRD"
                && data.gameDirectory && data.fileDestination) {

                await s3.uploadFolder(data.fileDestination, data.gameDirectory);
            }
        } catch (e) {
            console.error(e);
            logo = "";
            file = "";
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
            developerId,
        });

        let mediaFiles = request.files.media;
        mediaFiles.map(async (mediaFile) => {
            console.log("data.mediaDestination", data.mediaDestination);
            console.log("mediaFile.filename", mediaFile.filename);
            let mediaDestination = path.resolve(data.mediaDestination, mediaFile.filename);
            await moveFile(mediaFile.path, mediaDestination, data.mediaDestination);

            let file = `${mediaPath}/${mediaFile.filename}`;
            console.log("media file", file);

            let media = await Media.create({
                file: file,
                description: "",
                gameId: game.id,
            })
            console.log("media", media);

            if (process.env.NODE_ENV.toUpperCase() === "PRD"
                && data.gameDirectory && data.fileDestination) {

                await s3.uploadFile(`public/games/medias/${mediaFile.filename}`,
                    data.fileDestination);
            }
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
