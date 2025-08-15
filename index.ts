import express from 'express'
import path from 'path'
import campaignRouter from './src/routers/CampaignRouter'
import userRouter from './src/routers/UserRouter'
import * as entityRouter from './src/routers/EntityRouter'

// Middlewares
const app = express()
const cors = require('cors')
const port = 5000
const { OAuth2Client } = require('@react-oauth/google')

app.use(cors());
app.use(express.json());


const oAuth2Client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'postmessage',
)

app.post('/api/user/google-login', async (req, res) => {
  const { code } = req.body.code;

  try {
    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);
    res.json(tokens);
  } catch (error) {
    console.error("Error exchanging code for tokens:", error);
    res.status(500).json({ error: "Failed to exchange code for tokens" });
  }
});

app.post('/api/user/google-login/refresh-token', async (req, res) => {
  const { refreshToken } = req.body;

  try {
    oAuth2Client.setCredentials({ refresh_token: refreshToken });
    const { credentials } = await oAuth2Client.refreshAccessToken();
    res.json(credentials);
  } catch (error) {
    console.error("Error refreshing access token:", error);
    res.status(500).json({ error: "Failed to refresh access token" });
  }
});

// Serve static files at /CampaignCompanion
app.use('/CampaignCompanion', express.static(path.join(__dirname, 'dist')))

// Use this catch-all route for Express 5
app.get(/^\/CampaignCompanion(\/.*)?$/, (_req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

app.use('/api/campaign', campaignRouter)

app.use('/api/campaign/:campaignId/npc', entityRouter.npcRouter)
app.use('/api/campaign/:campaignId/location', entityRouter.locationRouter)
app.use('/api/campaign/:campaignId/item', entityRouter.itemRouter)
app.use('/api/campaign/:campaignId/pc', entityRouter.pcRouter)

app.use('/api/user', userRouter)

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}/CampaignCompanion`)
})