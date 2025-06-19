import type { RequestHandler } from "express";
import * as CampaignService from '../services/CampaignService';
import Joi from "joi";
import { Campaign } from "../types/Campaign";

const CampaignSchema = {
    id: Joi.string().uuid().optional(),
    name: Joi.string().required(),
}

const Campaigns = await CampaignService.getCampaigns();

export const createCampaign: RequestHandler =   (req, res): void => {
    const { error, value } = Joi.object(CampaignSchema).validate(req.body);
    if (error) {
        res.status(400).json({ error: "Invalid campaign data" });
        return;
    }
    
    const newCampaign = {
        ...value,
    }

    const campaign =  CampaignService.createCampaign(newCampaign as Campaign);
    if (!campaign) {
        res.status(500).json({ error: "Failed to create campaign" });
        return;
    }

    const newCampaigns = [...Campaigns, campaign];

    CampaignService.updateCampaigns(newCampaigns);
    res.status(201).json(campaign);
};