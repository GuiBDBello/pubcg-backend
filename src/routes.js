const { Router } = require('express');

const BadgeController = require('./controllers/badgeController');
const CategoryController = require('./controllers/categoryController');
const FileController = require('./controllers/fileController');
const GameController = require('./controllers/gameController');
const GameJamController = require('./controllers/gameJamController');
const GroupController = require('./controllers/groupController');
const MediaController = require('./controllers/mediaController');
const ReviewController = require('./controllers/reviewController');
const UserController = require('./controllers/userController');

const routes = Router();

routes.get('/badges', BadgeController.index);
routes.get('/badges/:id', BadgeController.show);
routes.post('/badges', BadgeController.store);
routes.put('/badges/:id', BadgeController.update);
routes.delete('/badges/:id', BadgeController.destroy);

routes.get('/categories', CategoryController.index);
routes.get('/categories/:id', CategoryController.show);
routes.post('/categories', CategoryController.store);
routes.put('/categories/:id', CategoryController.update);
routes.delete('/categories/:id', CategoryController.destroy);

routes.post('/uploads', FileController.store);

routes.get('/games', GameController.index);
routes.get('/games/:id', GameController.show);
routes.post('/games', GameController.store);
routes.put('/games/:id', GameController.update);
routes.delete('/games/:id', GameController.destroy);

routes.get('/gameJams', GameJamController.index);
routes.get('/gameJams/:id', GameJamController.show);
routes.post('/gameJams', GameJamController.store);
routes.put('/gameJams/:id', GameJamController.update);
routes.delete('/gameJams/:id', GameJamController.destroy);

routes.get('/groups', GroupController.index);
routes.get('/groups/:id', GroupController.show);
routes.post('/groups', GroupController.store);
routes.put('/groups/:id', GroupController.update);
routes.delete('/groups/:id', GroupController.destroy);

routes.get('/medias', MediaController.index);
routes.get('/medias/:id', MediaController.show);
routes.post('/medias', MediaController.store);
routes.put('/medias/:id', MediaController.update);
routes.delete('/medias/:id', MediaController.destroy);

routes.get('/reviews', ReviewController.index);
routes.get('/reviews/:id', ReviewController.show);
routes.post('/reviews', ReviewController.store);
routes.put('/reviews/:id', ReviewController.update);
routes.delete('/reviews/:id', ReviewController.destroy);

routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.show);
routes.post('/users', UserController.store);
routes.put('/users/:id', UserController.update);
routes.delete('/users/:id', UserController.destroy);

module.exports = routes;
