import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(); // No clientId needed for verification

import { Request, Response, NextFunction } from "express";

export const verifyGoogleToken = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  console.log(req.headers);
  console.log(req.body)
  if (!authHeader) {
    console.log("Verify Error")
    res.status(401).json({ error: "No token provided" });
    return;
  }

  const token = authHeader.split(" ")[1];
  console.log("post-token check", token)
  try {
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
    next();
  } catch (err) {
    // Error is happening here
    console.error("Token verification error:", err);
    res.status(401).json({ error: "Invalid token" });
  }
}