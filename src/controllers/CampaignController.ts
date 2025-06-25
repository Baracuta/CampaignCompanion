import type { RequestHandler } from "express";
import * as CampaignService from '../services/CampaignServiceConnect';
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
    res.status(201).json(newCampaigns);
};

export const getCampaign: RequestHandler = async (req, res): Promise<void> => {
    const campaignId = req.params.id;
    const Campaigns = await CampaignService.getCampaigns();
    const campaign = Campaigns.find(c => c.id === campaignId);
    if (!campaign) {
        res.status(404).json({ error: "Campaign not found" });
        return;
    }
    res.status(200).json(campaign);
};

export const updateCampaign: RequestHandler = async (req, res): Promise<void> => {
    const campaignId = req.params.id;
    if (!campaignId) {
        res.status(400).json({ error: "Invalid campaign ID format" });
        return;
    }

    const { error, value } = Joi.object(CampaignSchema).validate(req.body);
    if (error) {
        res.status(400).json({ error: "Invalid campaign data" });
        return;
    }

    const Campaigns = await CampaignService.getCampaigns();
    const index = Campaigns.findIndex(c => c.id === campaignId);
    if (index === -1) {
        res.status(404).json({ error: "Campaign not found" });
        return;
    }

    const updatedCampaign = { ...Campaigns[index], ...value };
    Campaigns[index] = updatedCampaign;

    CampaignService.updateCampaigns(Campaigns);
    res.status(200).json(updatedCampaign);
};

export const deleteCampaign: RequestHandler = async (req, res): Promise<void> => {
    const campaignId = req.params.id;
    if (!campaignId) {
        res.status(400).json({ error: "Invalid campaign ID format" });
        return;
    }

    const Campaigns = await CampaignService.getCampaigns();
    const index = Campaigns.findIndex(c => c.id === campaignId);
    if (index === -1) {
        res.status(404).json({ error: "Campaign not found" });
        return;
    }

    CampaignService.deleteCampaign(campaignId);

    res.status(204).json('Campaign deleted successfully');
}