import { Router } from 'express'
import * as CampaignController from '../controllers/CampaignController'

const router = Router()

router.post('/', CampaignController.createCampaign);
// router.get('/:id', CampaignController.getCampaign);
// router.put('/:id', CampaignController.updateCampaign);
// router.delete('/:id', CampaignController.deleteCampaign);

export default router