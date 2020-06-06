import express  from 'express';
const routes = express.Router();
import multer from 'multer';
import multerConfig from './config/multer';

import ItemsController from './controllers/ItemsControllers';
import PointsController from './controllers/PointsController';

const upload = multer(multerConfig);

routes
  .get('/items', ItemsController.index)
  .get('/points/:id', PointsController.show)
  .get('/points', PointsController.index)
  .post('/points', upload.single('image'), PointsController.store)



export default routes