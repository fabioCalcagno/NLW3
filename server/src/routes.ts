import express from 'express';

import TesteController from './controllers/teste/TesteController';


const routes = express.Router();
const testeController = new TesteController();

routes.get('/teste', testeController.teste);


export default routes;