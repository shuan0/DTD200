import { Router } from 'express';

export const userRouter = Router();

userRouter.get('/load', (req, res) => {
    res.send(`${req.query['username']} ${req.query['password']}`);
});
