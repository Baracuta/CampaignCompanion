import express from 'express'
import path from 'path'
import campaignRouter from './src/routers/CampaignRouter'
import userRouter from './src/routers/UserRouter'
import entityRouter from './src/routers/EntityRouter'

const app = express()
const cors = require('cors')
const port = 5000

app.use(cors());

// Serve static files at /CampaignCompanion
app.use('/CampaignCompanion', express.static(path.join(__dirname, 'dist')))

// Use this catch-all route for Express 5
app.get(/^\/CampaignCompanion(\/.*)?$/, (_req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

app.use('/api/campaign', campaignRouter)

app.use('/api/entity', entityRouter)

app.use('/api/user', userRouter)

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}/CampaignCompanion`)
})