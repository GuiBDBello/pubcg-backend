require('dotenv').config();

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

app.use((req, res, next) => {
    // Remove all white space characters from environment variable value
    const allowedOrigins = process.env.ALLOWED_ORIGINS.replace(/\s/g, '').split(',');

    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', true);
    return next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname, '..', 'public')));
// app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use('/api', routes);

function onStart() {
    createDatabase();

    // Add mock data to the database.
    let isMock = process.env.MOCK === 'true';
    let isLogging = process.env.MOCK_IS_LOGGING === 'true';
    mockData(isMock, isLogging);

    console.log(`Server running on port ${process.env.PORT}`);
}

app.listen(process.env.PORT || 5000, onStart);

async function createDatabase() {
    const database = require('./db');

    let force = process.env.DB_FORCE === 'true';
    await database.sync({ force });
}

async function mockData(isMock, isLogging) {
    if (isMock) {
        const badge = await Badge.create({
            name: "Played 100 Games",
            logo: "https://bropenbadge.com/wp-content/uploads/2017/10/logo.png"
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
            logo: "https://portal.if.uff.br/espaco-de-convivencia/wp-content/plugins/profilegrid-user-profiles-groups-and-communities/public/partials/images/default-group.png",
            description: "Studio de desenvolvimento do HubCG."
        });
        if (isLogging) console.log(group);

        const user = await User.create({
            email: "gdb@hubcg.gg",
            name: "GuiBDBello",
            photo: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
        });
        if (isLogging) console.log(user);

        await user.addBadge(badge);
        await user.addGroup(group);

        const game = await Game.create({
            name: "Sample",
            description: "Lorem Ipsum",
            logo: "https://cf.geekdo-images.com/0_kQMpe6dYXAIt-MnGdI9g__opengraph_letterbox/img/CpaYuHnToSCt0aa6ciVK9t69ULI=/fit-in/1200x630/filters:fill(auto):strip_icc()/pic648549.jpg",
            file: "https://www.youtube.com/embed/jC7l8Q7Chs0",
            fundingGoal: 100000,
            amountFunded: 200,
            gameJamId: gameJam.id,
            developerId: user.id
        });
        if (isLogging) console.log(game);

        await game.addCategory(category);
        await game.addUser(user);

        const media = await Media.create({
            file: "http://www.vintagecomputing.com/wp-content/images/pcworld/evolution_vgmedia_small.jpg",
            description: "Main Menu Screenshot",
            gameId: game.id
        });
        if (isLogging) console.log(media);

        const media2 = await Media.create({
            file: "https://m.media-amazon.com/images/I/51SJFSRe-XL._AC_SX522_.jpg",
            description: "Level Select Screenshot",
            gameId: game.id
        });
        if (isLogging) console.log(media2);

        const media3 = await Media.create({
            file: "https://s2.glbimg.com/N5c1MI6qCy0oWVijw9PIaUjfT_k=/0x0:4800x3200/924x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_f035dd6fd91c438fa04ab718d608bbaa/internal_photos/bs/2019/V/d/1L7cdjRvCGic45AZu5Yg/jeshoots-com-ecktzgjc-iu-unsplash.jpg",
            description: "Game Screenshot",
            gameId: game.id
        });
        if (isLogging) console.log(media3);

        const media4 = await Media.create({
            file: "https://static.independent.co.uk/s3fs-public/thumbnails/image/2017/12/28/10/gaming-disorder-reaction.jpg?width=982&height=726&auto=webp&quality=75",
            description: "Gameplay Screenshot",
            gameId: game.id
        });
        if (isLogging) console.log(media4);

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
}
