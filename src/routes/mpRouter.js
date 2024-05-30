import { Router } from 'express';
import { receivePayment } from '../controllers/mpController';

const mpRouter = Router();

mpRouter.get('/callback', receivePayment);

export default mpRouter;
