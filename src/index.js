const cors = require('cors');
const express = require('express');
const path = require('path');
const routes = require('./routes');

// Express middleware
const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

// app.use(express.static(path.resolve(__dirname, '..', 'public')));
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
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

    await database.sync();
    // await database.sync({ force: true });

    // Mock
    // const user = await User.create({
    //     email: 'gdb@hubcg.gg',
    //     password: 'gdb@hubcg.gg',
    //     name: 'GuiBDBello',
    //     photo: '',
    //     experience: '25'
    // });
    // console.log(user);
    // const game = await Game.create({
    //     name: 'Sample Game',
    //     description: 'Lorem Ipsum',
    //     logo: '',
    //     file: '',
    //     downloadAmount: 25,
    //     fundingGoal: 100000,
    //     amountFunded: 2
    // });
    // console.log(game);
}

function onStart() {
    createDatabase();

    console.log(`Server running on port ${PORT}`);
}

app.listen(PORT, onStart);
