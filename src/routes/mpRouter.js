import { Router } from 'express';
import { receivePayment } from '../controllers/mpController.js';

const mpRouter = Router();

mpRouter.post('/callback', receivePayment);

export default mpRouter;
