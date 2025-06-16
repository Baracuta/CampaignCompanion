import { Router } from 'express'
import * as CampaignController from '../services/CampaignService'

const router = Router()

router.post('/create', async (req, res, next) => {
	try {
		const campaign = await CampaignController.createCampaign(req.body);
		res.json(campaign);
	} catch (err) {
		next(err);
	}
})


export default router