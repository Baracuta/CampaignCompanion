import { RequestHandler } from "express";
import { User } from "../types/User";
import Joi from "joi";
import { v4 as uuid } from "uuid";

const USERS: User[] = [
  {
    id:'123',
    email: "test@example.com",
    name: "Test User",
  },
];

const UserSchema = Joi.object<User>({
  id: Joi.string().uuid().optional(),
  email: Joi.string().email().required(),
  name: Joi.string().required(),
});

export const createUser: RequestHandler = (req, res): void => {
  const { error, value } = UserSchema.validate(req.body);
  if (error !== undefined) {
    res.status(400).json("User data is invalid");
  }

  const user = value;
  if ("id" in user) {
    res.status(400).json("User ID will be generated automatically");
  }

  const id = uuid();

  const createdUser = {
    ...user,
    id,
  };

  USERS.push(createdUser);
  res.status(200).json(createdUser);
};

export const getUser: RequestHandler = (req, res): void => {
  const userId = req.params.id;
  const user = USERS.find((u) => u.id === userId);
  if (!user) {
    res.status(404).json("User not found");
    return;
  }
  res.status(200).json(user);
};

export const updateUser: RequestHandler = (req, res): void => {
  const id = req.params.id;
  if (!id) {
    res.status(400).json("Invalid user ID format");
    return;
  }

  const { error, value } = UserSchema.validate(req.body);
  if (error !== undefined) {
    res.status(400).json("User data is invalid");
    return;
  }

  const userIndex = USERS.findIndex((u) => u.id === id);
  if (userIndex === -1) {
    res.status(404).json("User not found");
    return;
  }

  const updatedUser = {
    ...USERS[userIndex],
    ...value,
    id,
  };

  USERS[userIndex] = updatedUser;
  res.status(200).json(updatedUser);
};

export const deleteUser: RequestHandler = (req, res): void => {
  const userId = req.params.id;
  const userIndex = USERS.findIndex((u) => u.id === userId);
  if (userIndex === -1) {
    res.status(404).json("User not found");
    return;
  }

  USERS.splice(userIndex, 1);
  res.status(200).json("User deleted successfully");
};
