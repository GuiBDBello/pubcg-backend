const cors = require('cors');
const express = require('express');
const path = require('path');
const routes = require('./routes');

// Express middleware
const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.static(path.resolve(__dirname, '..', 'public')));

// parses incoming requests with JSON payloads
app.use(express.json());
// parses incoming requests with urlencoded payloads
// extended: true - parsing the URL-encoded data with the querystring library
//app.use(express.urlencoded({ extended: true }));

app.use(routes);

async function createDatabase() {
    const database = require('./db');

    const User = require('./models/user');
    const Badge = require('./models/badge');
    const Group = require('./models/group');
    
    const Game = require('./models/game');
    const Category = require('./models/category');
    const Media = require('./models/media');

    const GameJam = require('./models/gameJam');
    const Review = require('./models/review');

    // Mock
    const user = await User.create({
        email: 'gdb@hubcg.gg',
        password: 'gdb@hubcd.gg',
        name: 'GuiBDBello',
        photo: '',
        experience: '25'
    });

    const game = await Game.create({
        name: 'Sample Game',
        description: 'Lorem Ipsum',
        logo: '',
        file: '',
        downloadAmount: 25,
        fundingGoal: 100000,
        amountFunded: 2
    });

    await database.sync();
    // await database.sync({ force: true });
}

function onStart() {
    createDatabase();

    console.log(`Server running on port ${PORT}`);
}

app.listen(PORT, onStart);
