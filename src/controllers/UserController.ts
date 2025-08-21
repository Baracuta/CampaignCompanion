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

  const token = authheader;

  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: "1090280266148-hhbspb3t1g9rontnmbpc0gopeqapo3nq.apps.googleusercontent.com",
  });
  const payload = ticket.getPayload();
  if (!payload) {
    console.log("Verify Payload Error");
    res.status(401).json({ error: "Invalid token payload" });
    return;
  }

  const newUser = {
    id: payload.sub,
    email: payload.email,
    name: payload.name,
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
  
  const token = authheader;

  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: "1090280266148-hhbspb3t1g9rontnmbpc0gopeqapo3nq.apps.googleusercontent.com",
  });
  const payload = ticket.getPayload();
  if (!payload) {
    console.log("Verify Payload Error");
    res.status(401).json({ error: "Invalid token payload" });
    return;
  }

  const userId = payload.sub;
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