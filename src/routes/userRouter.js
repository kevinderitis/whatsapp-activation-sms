import { Router } from 'express';
import { getUserData, addNumber, topUpBalance } from '../controllers/userController.js';
import { isAuthenticated } from '../middleware/middleware.js';

const userRouter = Router();

userRouter.get('/data',isAuthenticated, getUserData);
userRouter.post('/new/number', addNumber)
userRouter.post('/topup', topUpBalance)

export default userRouter;
