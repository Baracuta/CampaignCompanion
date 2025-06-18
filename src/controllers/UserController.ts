import { RequestHandler } from "express";
import { Campaign } from "../types/Campaign";
import { User } from "../types/User";
import Joi from "joi";
import { v4 as uuid } from "uuid";

const USERS: User[] = [];

const UserSchema = Joi.object<User>({
    id: Joi.string().uuid(),
    username: Joi.string().min(3).max(21),
    password: Joi.string().min(6).max(21),
    campaigns: Joi.array<Campaign>,
})


export const createUser: RequestHandler = async (req, res, next) => {
    const {error, value} = UserSchema.validate(req.body)
    if (error !== undefined) {
        res.status(400).json(new Joi.ValidationError(
            'User data is not formatted correctly',
            error?.details || [],
            req.body
        ))

        const user= value;
        if ('id' in user) {
            res.send('User ID will be generated automatically');
        }

        const id = uuid();

        const createdUser = {
            ...user,
            id
        }

        USERS.push(createdUser);
        res.status(201).json(createdUser);
    }
}