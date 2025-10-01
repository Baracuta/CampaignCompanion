import express from 'express'
import path from 'path'
import CampaignRouter from './src/routers/CampaignRouter'
import UserRouter from './src/routers/UserRouter'
import * as entityRouter from './src/routers/EntityRouter'
import { verifyGoogleToken } from './src/middleware/verifyGoogleToken'

require('dotenv').config({path: ".env"});

// Middlewares
const app = express();
const cors = require('cors');
const port = process.env.VITE_PORT;
const verify = verifyGoogleToken;


app.use(cors());
app.use(express.json());


// Serve static files at /CampaignCompanion
app.use('/CampaignCompanion', express.static(path.join(__dirname, 'dist')))

// Use this catch-all route for Express 5
app.get(/^\/CampaignCompanion(\/.*)?$/, (_req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

app.use('/api/campaign', cors(), CampaignRouter)

app.use('/api/campaign/:campaignId/npc', cors(), entityRouter.npcRouter)
app.use('/api/campaign/:campaignId/location', cors(), entityRouter.locationRouter)
app.use('/api/campaign/:campaignId/item', cors(), entityRouter.itemRouter)
app.use('/api/campaign/:campaignId/pc', cors(), entityRouter.pcRouter)

app.use('/api/user', verify, cors(), UserRouter)

app.listen(port, () => {
  console.log(`App listening at http://${process.env.VITE_HOSTNAME}:${port}/CampaignCompanion`)
})

