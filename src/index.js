const cors = require('cors');
const express = require('express');
const path = require('path');
const routes = require('./routes');

// Database Models
const Badge = require('./models/badge');
const Category = require('./models/category');
const Game = require('./models/game');
const GameJam = require('./models/gameJam');
const Group = require('./models/group');
const Media = require('./models/media');
const Review = require('./models/review');
const User = require('./models/user');

const GameCategory = require('./models/gameCategory');
const GroupMember = require('./models/groupMember');
const Library = require('./models/library');
const Participant = require('./models/participant');
const UserBadge = require('./models/userBadge');

// Express Middleware
const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

// app.use(express.static(path.resolve(__dirname, '..', 'public')));
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

async function createDatabase() {
    const database = require('./db');

    await database.sync();
    // Recreate the database.
    // await database.sync({ force: true });
}

function onStart() {
    createDatabase();
    // Add mock data to the database.
    // mockData(false);

    console.log(`Server running on port ${PORT}`);
}

app.listen(PORT, onStart);

async function mockData(isLogging) {
    const badge = await Badge.create({
        name: "Played 100 Games",
        logo: ""
    });
    if (isLogging) console.log(badge);

    const category = await Category.create({
        name: "Casual"
    });
    if (isLogging) console.log(category);

    const gameJam = await GameJam.create({
        name: "Costão Game Jam",
        description: "Game Jam do Costão do Santinho e HubCG.",
        dateTimeStart: new Date("2021-08-04T19:00:00"),
        dateTimeEnd: new Date("2021-12-04T21:00:00")
    });
    if (isLogging) console.log(gameJam);

    const group = await Group.create({
        name: "Costão Gamers",
        logo: "",
        description: "Studio de desenvolvimento do HubCG."
    });
    if (isLogging) console.log(group);

    const user = await User.create({
        email: "gdb@hubcg.gg",
        password: "gdb@hubcg.gg",
        name: "GuiBDBello",
        photo: "",
        experience: "25"
    });
    if (isLogging) console.log(user);

    await user.addBadge(badge);
    await user.addGroup(group);

    const game = await Game.create({
        name: "Sample Game",
        description: "Lorem Ipsum",
        logo: "",
        file: "",
        downloadAmount: 25,
        fundingGoal: 100000,
        amountFunded: 2,
        gameJamId: gameJam.id,
        developerId: user.id
    });
    if (isLogging) console.log(game);

    await game.addCategory(category);
    await game.addUser(user);

    const media = await Media.create({
        file: "",
        description: "Main Menu Screenshot",
        gameId: game.id
    });
    if (isLogging) console.log(media);

    const review = await Review.create({
        score: "9.5",
        description: "Muito bom!",
        gameId: game.id,
        userId: user.id
    });
    if (isLogging) console.log(review);

    if (isLogging) {
        const gameCategories = await GameCategory.findAll();
        console.log(gameCategories);
    }

    if (isLogging) {
        const groupMembers = await GroupMember.findAll();
        console.log(groupMembers);
    }

    if (isLogging) {
        const libraries = await Library.findAll();
        console.log(libraries);
    }

    if (isLogging) {
        const participants = await Participant.findAll();
        console.log(participants);
    }

    if (isLogging) {
        const userBadges = await UserBadge.findAll();
        console.log(userBadges);
    }
}
