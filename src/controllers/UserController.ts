import { RequestHandler } from "express";
import { User } from "../types/User";
import * as CampaignService from "../services/CampaignServiceBackend";
import Joi from "joi";


const UserSchema = {
  id: Joi.string().uuid().optional(),
  email: Joi.string().email().required(),
  name: Joi.string().required(),
};

export const createUser: RequestHandler = async (req, res): Promise<void> => {
  const { error, value } = Joi.object(UserSchema).validate(req.body.user);
  if (error) {
    res.status(400).json("User data is invalid");
    return;
  }

  const userId = value.sub;
  const user = await CampaignService.getUser(userId);

  if (user) {
    await CampaignService.getUser(userId);
    res.status(200).json(user);
    return;
  }

  const newUser = {
    id: userId,
    email: value.email,
    name: value.name,
  };

  await CampaignService.createUser(newUser)
    .then((createdUser) => {
      res.status(201).json(createdUser);
    })
    .catch((error) => {
      console.error("Error creating user:", error);
      res.status(500).json("Internal server error");
    });
};

export const getUser: RequestHandler = async (req, res): Promise<void> => {
  const userId = req.params.id;
  const user = await CampaignService.getUser(userId);
  if (!user) {
    res.status(404).json("User not found");
    return;
  }
  res.status(200).json(user);
};