import { UserModel } from '../models/user.js';

export class UserController {
    static async getAll(req, res) {
        const result = await UserModel.getAll();
        res.json(result);
    }
};
