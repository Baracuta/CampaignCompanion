import express from 'express'
import path from 'path'
import campaignRouter from './src/routers/CampaignRouter'
import userRouter from './src/routers/UserRouter'
import * as entityRouter from './src/routers/EntityRouter'
import { verifyGoogleToken } from './src/middleware/verifyGoogleToken'

// Middlewares
const app = express();
const cors = require('cors');
const port = 5000;
const verify = verifyGoogleToken;


app.use(cors());
app.use(express.json());
app.use(verify)


// Serve static files at /CampaignCompanion
app.use('/CampaignCompanion', express.static(path.join(__dirname, 'dist')))

// Use this catch-all route for Express 5
app.get(/^\/CampaignCompanion(\/.*)?$/, (_req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

app.use('/api/campaign', verify, campaignRouter)

app.use('/api/campaign/:campaignId/npc', entityRouter.npcRouter)
app.use('/api/campaign/:campaignId/location', entityRouter.locationRouter)
app.use('/api/campaign/:campaignId/item', entityRouter.itemRouter)
app.use('/api/campaign/:campaignId/pc', entityRouter.pcRouter)

app.use('/api/user', verify, userRouter)

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}/CampaignCompanion`)
})

