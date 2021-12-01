const { Router } = require("express");
const multer = require("multer");
const path = require("path");

// const BadgeController = require("./controllers/badgeController");
// const CategoryController = require("./controllers/categoryController");
const GameController = require("./controllers/gameController");
// const GameJamController = require("./controllers/gameJamController");
// const GroupController = require("./controllers/groupController");
const MediaController = require("./controllers/mediaController");
const ReviewController = require("./controllers/reviewController");
const UserController = require("./controllers/userController");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve("uploads"));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + "-" + file.originalname);
    }
});

const upload = multer({
    limits: { fileSize: 250000000 /* 250 MB */ },
    storage: storage,
});

const routes = Router();

routes.get("/", (request, response) => {
    response.send(`<h1>Hello World!</h1>
    <h2>PubCG environment variables (some of them).</h2>
    <ul>
        <li>DB_FORCE: ${process.env.DB_FORCE}</li>
        <li>MOCK: ${process.env.MOCK}</li>
        <li>MOCK_IS_LOGGING: ${process.env.MOCK_IS_LOGGING}</li>
        <li>NODE_ENV: ${process.env.NODE_ENV}</li>
        <li>PORT: ${process.env.PORT}</li>
        <li>PUBLIC_DIR: ${process.env.PUBLIC_DIR}</li>
    </ul>
    <h1>Goodbye World!</h1>`);
});

// Badges
// routes.get("/badges", BadgeController.index);
// routes.get("/badges/:id", BadgeController.show);
// routes.post("/badges", BadgeController.store);
// routes.put("/badges/:id", BadgeController.update);
// routes.delete("/badges/:id", BadgeController.destroy);

// Categories
// routes.get("/categories", CategoryController.index);
// routes.get("/categories/:id", CategoryController.show);
// routes.post("/categories", CategoryController.store);
// routes.put("/categories/:id", CategoryController.update);
// routes.delete("/categories/:id", CategoryController.destroy);

// Games
routes.get("/games", GameController.index);
routes.get("/games/:id", GameController.show);
routes.post("/games", upload.fields([
    { name: "file", maxCount: 1 },
    { name: "logo", maxCount: 1 },
    { name: "media", maxCount: 8 },
]), GameController.store);
routes.put("/games/:id", GameController.update);
routes.delete("/games/:id", GameController.destroy);

// Game Jams
// routes.get("/gameJams", GameJamController.index);
// routes.get("/gameJams/:id", GameJamController.show);
// routes.post("/gameJams", GameJamController.store);
// routes.put("/gameJams/:id", GameJamController.update);
// routes.delete("/gameJams/:id", GameJamController.destroy);

// Groups
// routes.get("/groups", GroupController.index);
// routes.get("/groups/:id", GroupController.show);
// routes.post("/groups", GroupController.store);
// routes.put("/groups/:id", GroupController.update);
// routes.delete("/groups/:id", GroupController.destroy);

// Medias
routes.get("/medias", MediaController.index);
routes.get("/medias/game/:id", MediaController.indexGame);
routes.get("/medias/:id", MediaController.show);
routes.post("/medias", /*upload.fields([
    { name: "media", maxCount: 8 },
]), */MediaController.store);
routes.put("/medias/:id", MediaController.update);
routes.delete("/medias/:id", MediaController.destroy);

// Reviews
routes.get("/reviews", ReviewController.index);
routes.get("/reviews/game/:id", ReviewController.indexGame);
routes.get("/reviews/:id", ReviewController.show);
routes.post("/reviews", ReviewController.store);
routes.put("/reviews/:id", ReviewController.update);
routes.delete("/reviews/:id", ReviewController.destroy);

// Users
routes.get("/users", UserController.index);
routes.get("/users/:id", UserController.show);
routes.post("/users", upload.fields([
    { name: "photo", maxCount: 1 },
]), UserController.store);
routes.put("/users/:id", UserController.update);
routes.delete("/users/:id", UserController.destroy);

// Login
routes.post("/login", UserController.login);

module.exports = routes;
