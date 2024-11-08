import { Router } from 'express';
import { UserController } from '../controllers/user.js';

export const userRouter = Router();

userRouter.get('/all', UserController.getAll);

userRouter.get('/search', UserController.getUser);
