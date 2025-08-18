import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(); // No clientId needed for verification

import { Request, Response, NextFunction } from "express";

export async function verifyGoogleToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ error: "No token provided" });
    return;
  }

  const token = authHeader.split(" ")[1];
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: "1090280266148-hhbspb3t1g9rontnmbpc0gopeqapo3nq.apps.googleusercontent.com",
    });
    const payload = ticket.getPayload();
    if (!payload) {
      res.status(401).json({ error: "Invalid token payload" });
      return;
    }
    req.body.user = payload;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
}