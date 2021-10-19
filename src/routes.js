const { Router } = require('express');

const GameController = require('./controllers/gameController');
const UserController = require('./controllers/userController');

const routes = Router();

routes.get('/games', GameController.index);
routes.get('/games/:id', GameController.show);
routes.post('/games', GameController.store);
routes.put('/games', GameController.update);
routes.delete('/games', GameController.destroy);

routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.show);
routes.post('/users', UserController.store);
routes.put('/users', UserController.update);
routes.delete('/users', UserController.destroy);

module.exports = routes;
