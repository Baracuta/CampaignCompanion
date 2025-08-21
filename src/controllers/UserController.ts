import { RequestHandler } from "express";
import * as CampaignService from "../services/CampaignServiceBackend";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client();


export const createUser: RequestHandler = async (req, res): Promise<void> => {
  const authheader = req.headers.authorization;
  if (!authheader) {
    res.status(401).json("No token provided");
    return;
  }

  const token = authheader.split(" ")[1];
  const r = await client.getToken(token);
  if (!r.tokens) {
    res.status(401).json("Missing tokens");
    return;
  }
  await client.setCredentials(r.tokens);
  
  if (!client.credentials.access_token) {
    res.status(401).json("No access token found");
    return;
  }
  const tokeninfo = await client.getTokenInfo(client.credentials.access_token);
  if (!tokeninfo) {
    res.status(401).json("Invalid token");
    return;
  }

  const newUser = {
    id: tokeninfo.sub,
    email: tokeninfo.email,
    name: tokeninfo.user_id,
  };

  const newestUser = await CampaignService.createUser(newUser)
  if (!newestUser) {
    res.status(500).json("Failed to create user");
    return;
  }
  res.status(201).json(newestUser);
};

export const getUser: RequestHandler = async (req, res): Promise<void> => {
  const authheader = req.headers.authorization;
  if (!authheader) {
    res.status(401).json("No token provided");
    return;
  }
  
  const token = authheader.split(" ")[1];
  const r = await client.getToken(token);
  if (!r.tokens) {
    res.status(401).json("Missing tokens");
    return;
  }
  await client.setCredentials(r.tokens);
  
  if (!client.credentials.access_token) {
    res.status(401).json("No access token found");
    return;
  }
  const tokeninfo = await client.getTokenInfo(client.credentials.access_token);
  if (!tokeninfo) {
    res.status(401).json("Invalid token");
    return;
  }

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