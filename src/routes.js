const { Router } = require('express');

const GameController = require('./controllers/gameController');
const UserController = require('./controllers/userController');

const routes = Router();

routes.get('/games', GameController.index);
routes.get('/games/:id', GameController.show);
routes.post('/games', GameController.store);

routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.show);
routes.post('/users', UserController.store);

module.exports = routes;
