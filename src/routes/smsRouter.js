import { Router } from 'express';
import { isAuthenticated } from '../middleware/middleware.js'
import { getNumber, receiveSMS, cancelOrder } from '../controllers/smsController.js';

const smsRouter = Router();

smsRouter.use(isAuthenticated);

smsRouter.get('/number', getNumber);
smsRouter.get('/receive/:orderId', receiveSMS);
smsRouter.get('/cancel/:orderId', cancelOrder);

export default smsRouter;
