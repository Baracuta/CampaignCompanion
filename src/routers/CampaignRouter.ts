import { Router } from 'express'
import * as CampaignController from '../services/CampaignService'

const router = Router()

router.post('/', async (req, res, next) => {
	try {
		const campaign = await CampaignController.createCampaign(req.body);
		res.json(campaign);
	} catch (err) {
		next(err);
	}
})
// router.get('/:id', async (req, res, next) => {
// 	try {
// 		const campaign = await CampaignController.getCampaign(req.params.id);
// 		res.json(campaign);
// 	} catch (err) {
// 		next(err);
// 	}
// })
// router.put('/:id', async (req, res, next) => {
// 	try {
// 		const updatedCampaign = await CampaignController.updateCampaign(await CampaignController.getCampaign(req.params.id));
// 		res.json(updatedCampaign);
// 	} catch (err) {
// 		next(err);
// 	}
// })
// router.delete('/:id', async (req, res, next) => {
// 	try {
// 		await CampaignController.deleteCampaign(req.params.id);
// 		res.sendStatus(204);
// 	} catch (err) {
// 		next(err);
// 	}
// })

export default router