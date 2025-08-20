import { RequestHandler } from "express";
import * as CampaignService from "../services/CampaignServiceBackend";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client();


export const createUser: RequestHandler = async (req, res): Promise<void> => {
  const token = req.headers.authorization;
  if (!token) {
    res.status(401).json("No token provided");
    return;
  }
  const tokeninfo = await client.getTokenInfo(token);
  const newUser = {
    id: tokeninfo.sub,
    email: tokeninfo.email,
    name: tokeninfo.user_id,
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
  const token = req.headers.authorization;
  if (!token) {
    res.status(401).json("No token provided");
    return;
  }
  const tokeninfo = await client.getTokenInfo(token);

  const userId = tokeninfo.sub;
  if (!userId) {
    res.status(400).json("Invalid user ID format");
    return;
  }
  const user = await CampaignService.getUser(userId);

  if (!user) {
    res.status(404).json("User not found");
    return;
  }
  
  res.status(200).json(user);
  return;
};