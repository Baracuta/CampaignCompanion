import type { RequestHandler } from "express";
import * as CampaignService from '../services/CampaignService';
import Joi from "joi";

const CampaignSchema = {
    id: Joi.string().uuid().optional(),
    name: Joi.string().required(),
}

const Campaigns = CampaignService.getCampaigns();

export const createCampaign: RequestHandler =   (req, res): void => {
    const { error, value } = Joi.object(CampaignSchema).validate(req.body);
    if (error) {
        res.status(400).json({ error: "Invalid campaign data" });
        return;
    }
    
    const campaign =  CampaignService.createCampaign(value);
    if (!campaign) {
        res.status(500).json({ error: "Failed to create campaign" });
        return;
    }

    CampaignService.updateCampaigns([...Campaigns, campaign]);
    res.status(201).json(campaign);
};