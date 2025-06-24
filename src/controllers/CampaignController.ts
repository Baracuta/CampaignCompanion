import type { RequestHandler } from "express";
import * as CampaignService from '../services/CampaignService';
import Joi from "joi";
import { Campaign } from "../types/Campaign";

const CampaignSchema = {
    id: Joi.string().uuid().optional(),
    name: Joi.string().required(),
    players: Joi.number().required(),
};

export const createCampaign: RequestHandler = async (req, res): Promise<void> => {
    const { error, value } = Joi.object(CampaignSchema).validate(req.body);
    if (error) {
        res.status(400).json({ error: "Invalid campaign data" });
        return;
    }
    const Campaigns = await CampaignService.getCampaigns();


    const newCampaign = await CampaignService.createCampaign(value as Campaign);
    if (!newCampaign) {
        res.status(500).json({ error: "Failed to create campaign" });
        return;
    }

    const newCampaigns = [...Campaigns, newCampaign];

    CampaignService.updateCampaigns(newCampaigns);
    res.status(201).json(newCampaign);
};