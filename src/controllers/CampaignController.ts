import type { RequestHandler } from "express";
import * as CampaignService from "../services/CampaignServiceBackend";
import Joi from "joi";
import { Campaign } from "../types/Campaign";

const CampaignSchema = {
  id: Joi.string().uuid().optional(),
  players: Joi.number().required(),
  game: Joi.string().optional(),
  name: Joi.string().required(),
};

export const createCampaign: RequestHandler = async (req, res): Promise<void> => {
  const { error, value } = Joi.object(CampaignSchema).validate(req.body);
  if (error) {
    res.status(400).json({ error: "Invalid campaign data" });
    return;
  }

  const newCampaign = await CampaignService.createCampaign(value as Campaign);
  if (!newCampaign) {
    res.status(500).json({ error: "Failed to create campaign" });
    return;
  }

  res.status(201).json(newCampaign);
  return;
};
//Problem might be that these don't actually do anything, I think
export const getCampaign: RequestHandler = async (req, res): Promise<void> => {
  const campaign = await CampaignService.getCampaign(req.params.id);
  if (!campaign) {
    res.status(404).json({ error: "Campaign not found" });
    return;
  }
  res.status(200).json(campaign);
  return;
};

export const getCampaigns: RequestHandler = async (_req, res): Promise<void> => {
  const campaigns = await CampaignService.getCampaigns();
  res.status(200).json(campaigns);
  return;
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
  const campaign = await CampaignService.getCampaign(campaignId);
  if (!campaign) {
    res.status(404).json({ error: "Campaign not found" });
    return;
  }

  await CampaignService.updateCampaign({ ...value, id: campaignId });
  
  const updatedCampaign = await CampaignService.getCampaign(campaignId);
  if (!updatedCampaign) {
    res.status(500).json({ error: "Failed to find updated campaign" });
    return;
  }

  res.status(201).json(updatedCampaign);
  return;
};

export const deleteCampaign: RequestHandler = async (req, res): Promise<void> => {
  const campaignId = req.params.id;

  if (!campaignId) {
    res.status(404).json({ error: "Invalid Campaign ID" });
    return;
  }

  const campaign = await CampaignService.getCampaign(campaignId);
  if (!campaign) {
    res.status(404).json({ error: "Campaign not found" });
    return;
  }

  await CampaignService.deleteCampaign(req.params.id);

  res.status(204).json("Campaign deleted successfully");
  return;
};
