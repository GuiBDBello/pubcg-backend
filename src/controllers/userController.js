const User = require('../models/user');

const fs = require("fs");
const path = require("path");

const s3 = require("../s3Client");

async function moveFile(oldPath, newPath, directory) {
    console.log("Moving from oldPath", oldPath, "\nto newPath", newPath, "\ninto directory", directory);

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
        const { email, password, name, description/*, photo*/ } = request.body;
        const user = await User.create({
            email,
            password,
            name,
            description,
            photo: "https://pubcg-bucket.s3.sa-east-1.amazonaws.com/public/users/0-user.jpg",
            experience: 0,
        }).then((newUser) => {
            return newUser;
        }).catch((error) => {
            return error;
        });

        console.log("user", user);
        console.log("user.id", user.id);
        console.log("request.files", request.files);

        let photo = request.files.photo[0];
        let photoDestination = path.resolve("public", "users", "" + user.id);
        let photoPath = path.resolve(photoDestination, photo.filename);

        await moveFile(photo.path, photoPath, photoDestination);

        let photoUrl = `${process.env.PUBLIC_DIR}/users/${user.id}/${photo.filename}`;
        console.log("photoUrl", photoUrl);

        if (process.env.NODE_ENV.toUpperCase() === "PRD"
            && photoDestination) {

            await s3.uploadFile(photo.filename, data.gameDirectory);
        }

        const updatedUser = await User.update({
            photo: photoUrl
        }, {
            where: {
                id: user.id
            }
        });
        console.log("updatedUser", updatedUser);

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
