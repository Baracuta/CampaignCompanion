import type { RequestHandler } from "express";
import * as CampaignService from "../services/CampaignServiceConnect";
import Joi from "joi";
import { NPC } from "../types/NPC";
import { Location } from "../types/Location";
import { Item } from "../types/Item";
import { PC } from "../types/PlayerCharacter";

// Basically, all the logic that handles the different entity types
// is going to be in this controller.



// NPC Section

const NPCSchema = {
  id: Joi.string().uuid().optional(),
  name: Joi.string().optional(),
  description: Joi.string().optional(),
  campaignId: Joi.string().uuid().optional(),
};

export const createNPC: RequestHandler = async (req, res): Promise<void> => {
  const { error, value } = Joi.object(NPCSchema).validate(req.body);
  if (error) {
      res.status(400).json({ error: "Invalid NPC data" });
      return;
  }
  const campaign = await CampaignService.getCampaign(req.body.campaignId);

  await CampaignService.createNPC(campaign.id, value as NPC);

  res.status(201).json("NPC created successfully");
};

export const getNPC: RequestHandler = async (req, res): Promise<void> => {
  const campaign = await CampaignService.getCampaign(req.params.campaignId);
  if (!campaign) {
    res.status(404).json({ error: "Campaign not found" });
    return;
  }

  const npc = await CampaignService.getNPC(campaign.id, req.params.npcId);

  if (!npc) {
    res.status(404).json({ error: "NPC not found" });
    return;
  }

  await CampaignService.getNPC(campaign.id, npc.id);

  res.status(200).json("NPC retrieved successfully");
};

export const updateNPC: RequestHandler = async (req, res): Promise<void> => {
  const { error, value } = Joi.object(NPCSchema).validate(req.body);
  if (error) {
    res.status(400).json({ error: "Invalid NPC data" });
    return;
  }

  const campaign = await CampaignService.getCampaign(req.params.campaignId);
  if (!campaign) {
    res.status(404).json({ error: "Campaign not found" });
    return;
  }

  const npc = await CampaignService.getNPC(campaign.id, req.params.npcId);
  if (!npc) {
    res.status(404).json({ error: "NPC not found" });
    return;
  }
  
  await CampaignService.updateNPC(campaign.id, { ...npc, ...value } as NPC);

  res.status(200).json("NPC updated successfully");
};

// export const deleteNPC: RequestHandler = async (req, res): Promise<void> => {

// };



// Location Section

const LocationSchema = {
id: Joi.string().uuid().optional(),
name: Joi.string().required(),
description: Joi.string().optional(),
campaignId: Joi.string().uuid().required(),
};

export const createLocation: RequestHandler = async (req, res): Promise<void> => {
    const { error, value } = Joi.object(LocationSchema).validate(req.body);
    if (error) {
        res.status(400).json({ error: "Invalid Location data" });
        return;
    }
    const campaign = await CampaignService.getCampaign(req.body.campaignId);

    await CampaignService.createLocation(value as Location, campaign.id);

    res.status(201).json("Location created successfully");
};

export const getLocation: RequestHandler = async (req, res): Promise<void> => {
  const campaign = await CampaignService.getCampaign(req.params.campaignId);
  if (!campaign) {
      res.status(404).json({ error: "Campaign not found" });
      return;
  }

  const location = await CampaignService.getLocation(campaign.id, req.params.locationId);

  if (!location) {
      res.status(404).json({ error: "Location not found" });
      return;
  }

  await CampaignService.getLocation(campaign.id, location.id);

  res.status(200).json("Location retrieved successfully");
};

export const updateLocation: RequestHandler = async (req, res): Promise<void> => {
  const { error, value } = Joi.object(LocationSchema).validate(req.body);
  if (error) {
    res.status(400).json({ error: "Invalid Location data" });
    return;
  }

  const campaign = await CampaignService.getCampaign(req.params.campaignId);
  if (!campaign) {
    res.status(404).json({ error: "Campaign not found" });
    return;
  }

  const location = await CampaignService.getLocation(campaign.id, req.params.locationId);
  if (!location) {
    res.status(404).json({ error: "Location not found" });
    return;
  }

  await CampaignService.updateLocation(campaign.id, { ...location, ...value } as Location);

  res.status(200).json("Location updated successfully");
};

// export const deleteLocation: RequestHandler = async (req, res): Promise<void> => {

// };



// Item Section

const ItemSchema = {
  id: Joi.string().uuid().optional(),
  name: Joi.string().required(),
  description: Joi.string().optional(),
  campaignId: Joi.string().uuid().required(),
};

export const createItem: RequestHandler = async (req, res): Promise<void> => {
  const { error, value } = Joi.object(ItemSchema).validate(req.body);
  if (error) {
    res.status(400).json({ error: "Invalid Item data" });
    return;
  }
  const campaign = await CampaignService.getCampaign(req.body.campaignId);

  await CampaignService.createItem(value as Item, campaign.id);

  res.status(201).json("Item created successfully");
};

export const getItem: RequestHandler = async (req, res): Promise<void> => {
  const campaign = await CampaignService.getCampaign(req.params.campaignId);
  if (!campaign) {
    res.status(404).json({ error: "Campaign not found" });
    return;
  }

  const item = await CampaignService.getItem(campaign.id, req.params.itemId);

  if (!item) {
    res.status(404).json({ error: "Item not found" });
    return;
  }

  await CampaignService.getItem(campaign.id, item.id);

  res.status(200).json("Item retrieved successfully");
};

export const updateItem: RequestHandler = async (req, res): Promise<void> => {
  const { error, value } = Joi.object(ItemSchema).validate(req.body);
  if (error) {
    res.status(400).json({ error: "Invalid Item data" });
    return;
  }

  const campaign = await CampaignService.getCampaign(req.params.campaignId);
  if (!campaign) {
    res.status(404).json({ error: "Campaign not found" });
    return;
  }

  const item = await CampaignService.getItem(campaign.id, req.params.itemId);
  if (!item) {
    res.status(404).json({ error: "Item not found" });
    return;
  }

  await CampaignService.updateItem(campaign.id, { ...item, ...value } as Item);

  res.status(200).json("Item updated successfully");
};

// export const deleteItem: RequestHandler = async (req, res): Promise<void> => {

// };



// PC Section

const PCSchema = {
  id: Joi.string().uuid().optional(),
  name: Joi.string().required(),
  description: Joi.string().optional(),
  campaignId: Joi.string().uuid().required(),
};

export const createPC: RequestHandler = async (req, res): Promise<void> => {
  const { error, value } = Joi.object(PCSchema).validate(req.body);
  if (error) {
    res.status(400).json({ error: "Invalid Player Character data" });
    return;
  }
  const campaign = await CampaignService.getCampaign(req.body.campaignId);

  await CampaignService.createPC(value as PC, campaign.id);

  res.status(201).json("Player Character created successfully");
};

export const getPC: RequestHandler = async (req, res): Promise<void> => {
  const campaign = await CampaignService.getCampaign(req.params.campaignId);
  if (!campaign) {
    res.status(404).json({ error: "Campaign not found" });
    return;
  }

  const pc = await CampaignService.getPC(campaign.id, req.params.pcId);

  if (!pc) {
    res.status(404).json({ error: "Player Character not found" });
    return;
  }

  await CampaignService.getPC(campaign.id, pc.id);

  res.status(200).json("Player Character retrieved successfully");
};

export const updatePC: RequestHandler = async (req, res): Promise<void> => {
  const { error, value } = Joi.object(PCSchema).validate(req.body);
  if (error) {
    res.status(400).json({ error: "Invalid Player Character data" });
    return;
  }

  const campaign = await CampaignService.getCampaign(req.params.campaignId);
  if (!campaign) {
    res.status(404).json({ error: "Campaign not found" });
    return;
  }

  const pc = await CampaignService.getPC(campaign.id, req.params.pcId);
  if (!pc) {
    res.status(404).json({ error: "Player Character not found" });
    return;
  }

  await CampaignService.updatePC(campaign.id, { ...pc, ...value } as PC);

  res.status(200).json("Player Character updated successfully");
};

// export const deletePC: RequestHandler = async (req, res): Promise<void> => {

// };
