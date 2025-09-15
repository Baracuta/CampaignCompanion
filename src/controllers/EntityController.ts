import type { RequestHandler } from "express";
import * as CampaignService from "../services/CampaignServiceBackend";
import Joi from "joi";
import { NPC } from "../types/NPC";
import { Location } from "../types/Location";
import { Item } from "../types/Item";
import { PC } from "../types/PlayerCharacter";

// Basically, all the logic that handles the different entity types
// is going to be in this controller.



// NPC Section

const BaseSchema = {
  id: Joi.string().uuid().optional(),
  type: Joi.string().optional(),
  name: Joi.string().optional(),
  description: Joi.string().optional().allow(null),
  notes: Joi.string().optional().allow(null),
  image: Joi.string().optional().allow(null),
  isfavourite: Joi.boolean().optional().allow(null),
  modifieddate: Joi.date().optional(),
  incampaign: Joi.string().uuid().optional(),
};

export const createNPC: RequestHandler = async (req, res): Promise<void> => {
  const { error, value } = Joi.object(BaseSchema).validate(req.body);
  if (error) {
      res.status(400).json({ error: "Invalid NPC data" });
      return;
  }

  const campaign = await CampaignService.getCampaign(req.params.campaignId);

  await CampaignService.createNPC(campaign.id, value as NPC);

  res.status(201).json("NPC created successfully");
};

export const getNPC: RequestHandler = async (req, res): Promise<void> => {
  const campaign = await CampaignService.getCampaign(req.params.campaignId);
  if (!campaign) {
    res.status(404).json({ error: "Campaign not found" });
    return;
  }

  const npc = await CampaignService.getNPC(campaign.id, req.params.id);

  if (!npc) {
    res.status(404).json({ error: "NPC not found" });
    return;
  }

  await CampaignService.getNPC(campaign.id, npc.id);

  res.status(200).json("NPC retrieved successfully");
};

export const getNPCs: RequestHandler = async (req, res): Promise<void> => {
  const campaign = await CampaignService.getCampaign(req.params.campaignId);
  if (!campaign) {
    res.status(404).json({ error: "Campaign not found" });
    return;
  }

  const npcs = await CampaignService.getNPCs(campaign.id);
  res.status(200).json(npcs);
};

export const updateNPC: RequestHandler = async (req, res): Promise<void> => {
  const { error, value } = Joi.object(BaseSchema).validate(req.body);
  if (error) {
    res.status(400).json({ error: "Invalid NPC data" });
    return;
  }

  const campaign = await CampaignService.getCampaign(req.params.campaignId);
  if (!campaign) {
    res.status(404).json({ error: "Campaign not found" });
    return;
  }

  const npc = await CampaignService.getNPC(campaign.id, req.params.id);
  if (!npc) {
    res.status(404).json({ error: "NPC not found" });
    return;
  }
  const updatedNPC = value as NPC;
  await CampaignService.updateNPC(campaign.id, updatedNPC);

  res.status(200).json("NPC updated successfully");
};

export const deleteNPC: RequestHandler = async (req, res): Promise<void> => {
  const campaign = await CampaignService.getCampaign(req.params.campaignId);
  if (!campaign) {
    res.status(404).json({ error: "Campaign not found" });
    return;
  }

  const npc = await CampaignService.getNPC(campaign.id, req.params.id);
  if (!npc) {
    res.status(404).json({ error: "NPC not found" });
    return;
  }

  await CampaignService.deleteNPC(campaign.id, npc.id);

  res.status(200).json("NPC deleted successfully");
};



// Location Section

const LocationSchema = {
  ...BaseSchema,
  entity: Joi.string().uuid().optional(),
  maps: Joi.array().items(Joi.string()).optional().allow(null),
};

export const createLocation: RequestHandler = async (req, res): Promise<void> => {
    const { error, value } = Joi.object(LocationSchema).validate(req.body);
    if (error) {
        res.status(400).json({ error: "Invalid Location data" });
        return;
    }
    
    const campaign = await CampaignService.getCampaign(req.params.campaignId);

    await CampaignService.createLocation(value as Location, campaign.id);

    res.status(201).json("Location created successfully");
};

export const getLocation: RequestHandler = async (req, res): Promise<void> => {
  const campaign = await CampaignService.getCampaign(req.params.campaignId);
  if (!campaign) {
      res.status(404).json({ error: "Campaign not found" });
      return;
  }

  const location = await CampaignService.getLocation(campaign.id, req.params.id);
  if (!location) {
      res.status(404).json({ error: "Location not found" });
      return;
  }

  await CampaignService.getLocation(campaign.id, location.id);

  res.status(200).json("Location retrieved successfully");
};

export const getLocations: RequestHandler = async (req, res): Promise<void> => {
  const campaign = await CampaignService.getCampaign(req.params.campaignId);
  if (!campaign) {
    res.status(404).json({ error: "Campaign not found" });
    return;
  }

  const locations = await CampaignService.getLocations(campaign.id);
  res.status(200).json(locations);
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

  const location = await CampaignService.getLocation(campaign.id, req.params.id);
  if (!location) {
    res.status(404).json({ error: "Location not found" });
    return;
  }

  await CampaignService.updateLocation(campaign.id, { ...location, ...value } as Location);

  res.status(200).json("Location updated successfully");
};

export const deleteLocation: RequestHandler = async (req, res): Promise<void> => {
  const campaign = await CampaignService.getCampaign(req.params.campaignId);
  if (!campaign) {
    res.status(404).json({ error: "Campaign not found" });
    return;
  }

  const location = await CampaignService.getLocation(campaign.id, req.params.id);
  if (!location) {
    res.status(404).json({ error: "Location not found" });
    return;
  }

  await CampaignService.deleteLocation(campaign.id, location.id);

  res.status(200).json("Location deleted successfully");
};



// Item Section

const ItemSchema = {
  ...BaseSchema,
  entity: Joi.string().uuid().optional(),
  effect: Joi.string().optional().allow(null),
  category: Joi.string().optional().allow(null),
};

export const createItem: RequestHandler = async (req, res): Promise<void> => {
  const { error, value } = Joi.object(ItemSchema).validate(req.body);
  if (error) {
    res.status(400).json({ error: "Invalid Item data" });
    return;
  }
  const campaign = await CampaignService.getCampaign(req.params.campaignId);

  await CampaignService.createItem(value as Item, campaign.id);

  res.status(201).json("Item created successfully");
};

export const getItem: RequestHandler = async (req, res): Promise<void> => {
  const campaign = await CampaignService.getCampaign(req.params.campaignId);
  if (!campaign) {
    res.status(404).json({ error: "Campaign not found" });
    return;
  }

  const item = await CampaignService.getItem(campaign.id, req.params.id);

  if (!item) {
    res.status(404).json({ error: "Item not found" });
    return;
  }

  await CampaignService.getItem(campaign.id, item.id);

  res.status(200).json("Item retrieved successfully");
};

export const getItems: RequestHandler = async (req, res): Promise<void> => {
  const campaign = await CampaignService.getCampaign(req.params.campaignId);
  if (!campaign) {
    res.status(404).json({ error: "Campaign not found" });
    return;
  }

  const items = await CampaignService.getItems(campaign.id);
  res.status(200).json(items);
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

  const item = await CampaignService.getItem(campaign.id, req.params.id);
  if (!item) {
    res.status(404).json({ error: "Item not found" });
    return;
  }

  await CampaignService.updateItem(campaign.id, { ...item, ...value } as Item);

  res.status(200).json("Item updated successfully");
};

export const deleteItem: RequestHandler = async (req, res): Promise<void> => {
  const campaign = await CampaignService.getCampaign(req.params.campaignId);
  if (!campaign) {
    res.status(404).json({ error: "Campaign not found" });
    return;
  }

  const item = await CampaignService.getItem(campaign.id, req.params.id);
  if (!item) {
    res.status(404).json({ error: "Item not found" });
    return;
  }

  await CampaignService.deleteItem(campaign.id, item.id);

  res.status(200).json("Item deleted successfully");
};



// PC Section

const PCSchema = {
  ...BaseSchema,
  entity: Joi.string().uuid().optional(),
  pc_class: Joi.string().optional().allow(null),
  level: Joi.string().optional().allow(null),
  player_name: Joi.string().optional().allow(null),
};

export const createPC: RequestHandler = async (req, res): Promise<void> => {
  const { error, value } = Joi.object(PCSchema).validate(req.body);
  if (error) {
    res.status(400).json({ error: "Invalid Player Character data" });
    return;
  }
  const campaign = await CampaignService.getCampaign(req.params.campaignId);

  await CampaignService.createPC(value as PC, campaign.id);

  res.status(201).json("PC created successfully");
};

export const getPC: RequestHandler = async (req, res): Promise<void> => {
  const campaign = await CampaignService.getCampaign(req.params.campaignId);
  if (!campaign) {
    res.status(404).json({ error: "Campaign not found" });
    return;
  }

  const pc = await CampaignService.getPC(campaign.id, req.params.id);

  if (!pc) {
    res.status(404).json({ error: "Player Character not found" });
    return;
  }

  await CampaignService.getPC(campaign.id, pc.id);

  res.status(200).json("PC retrieved successfully");
};

export const getPCs: RequestHandler = async (req, res): Promise<void> => {
  const campaign = await CampaignService.getCampaign(req.params.campaignId);
  if (!campaign) {
    res.status(404).json({ error: "Campaign not found" });
    return;
  }

  const pcs = await CampaignService.getPCs(campaign.id);
  res.status(200).json(pcs);
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

  const pc = await CampaignService.getPC(campaign.id, req.params.id);
  if (!pc) {
    res.status(404).json({ error: "Player Character not found" });
    return;
  }

  await CampaignService.updatePC(campaign.id, { ...pc, ...value } as PC);

  res.status(200).json("PC updated successfully");
};

export const deletePC: RequestHandler = async (req, res): Promise<void> => {
  const campaign = await CampaignService.getCampaign(req.params.campaignId);
  if (!campaign) {
    res.status(404).json({ error: "Campaign not found" });
    return;
  }

  const pc = await CampaignService.getPC(campaign.id, req.params.id);
  if (!pc) {
    res.status(404).json({ error: "Player Character not found" });
    return;
  }

  await CampaignService.deletePC(campaign.id, pc.id);

  res.status(200).json("PC deleted successfully");
};