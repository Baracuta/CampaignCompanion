import express from 'express'
import path from 'path'

const app = express()
const port = 5000

// Serve static files at /CampaignCompanion
app.use('/CampaignCompanion', express.static(path.join(__dirname, 'dist')))

// Catch-all: serve index.html for all /CampaignCompanion routes (for React Router)
app.get('/CampaignCompanion/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}/CampaignCompanion`)
})