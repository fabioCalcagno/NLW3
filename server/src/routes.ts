import express from 'express';
import multer from 'multer';

import uploadConfig from './config/upload ';
import OrphanagesController from './controllers/OrphanagesController';

const upload = multer(uploadConfig)
const routes = express.Router();


routes.get('/orphanages', OrphanagesController.index);
routes.get('/orphanages/:id', OrphanagesController.findById);
routes.post('/orphanages', upload.array('images', 10), OrphanagesController.create);


export default routes;