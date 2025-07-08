import type { RequestHandler } from "express";
import * as CampaignService from "../services/CampaignServiceConnect";
import Joi from "joi";
import { Campaign } from "../types/Campaign";

const CampaignSchema = {
  id: Joi.string().uuid().optional(),
  name: Joi.string().required(),
  players: Joi.number().required(),
};

export const createCampaign: RequestHandler = async (
  req,
  res
): Promise<void> => {
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

  res.status(201).json("Campaign created successfully");
};

export const getCampaign: RequestHandler = async (req, res): Promise<void> => {
  const campaign = await CampaignService.getCampaign(req.params.id);
  if (!campaign) {
    res.status(404).json({ error: "Campaign not found" });
    return;
  }
  res.status(200).json("Campaign retrieved successfully");
};

export const updateCampaign: RequestHandler = async (
  req,
  res
): Promise<void> => {
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
  res.status(201).json("Campaign updated successfully");
};

export const deleteCampaign: RequestHandler = async (
  req,
  res
): Promise<void> => {
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
};
