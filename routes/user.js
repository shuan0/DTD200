import { Router } from 'express';
import { UserController } from '../controllers/user';

export const userRouter = Router();

userRouter.get('/all', UserController.getAll);

userRouter.get('/load', (req, res) => {
    res.send(`${req.query['username']} ${req.query['password']}`);
});
