import { RequestHandler } from "express";
import { Campaign } from "../types/Campaign";
import { User } from "../types/User";
import Joi from "joi";
import { v4 as uuid } from "uuid";

const USERS: User[] = [];

const UserSchema = Joi.object<User>({
  id: Joi.string().optional(),
  username: Joi.string().required(),
  password: Joi.string().required(),
  campaigns: Joi.array<Campaign>().optional(),
});

export const createUser: RequestHandler = (req, res): void => {
  const {error, value } = UserSchema.validate(req.body);
  if (error !== undefined) {
    res.status(400).json("User data is invalid");
  }

  const user = value;
  if ('id' in user) {
    res.status(400).json('User ID will be generated automatically')
  }

  const id = uuid();

  const createdUser = {
    ...user,
    id,
  };

  USERS.push(createdUser);
  res.status(200).json(createdUser);
};
