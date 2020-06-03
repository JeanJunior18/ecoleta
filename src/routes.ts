import express  from 'express';
const routes = express.Router();
import knex from './database';

import ItemsController from './controllers/ItemsControllers';
import PointsController from './controllers/PointsController';

routes
  .get('/items', ItemsController.index)
  .get('/points/:id', PointsController.show)
  .get('/points', PointsController.index)
  .post('/points', PointsController.store)



export default routes