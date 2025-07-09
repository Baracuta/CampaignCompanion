import { Campaign } from "../types/Campaign";
import { v4 as uuid } from "uuid";
import { NPC } from "../types/NPC";
import { Location } from "../types/Location";
import { Item } from "../types/Item";
import { PC } from "../types/PlayerCharacter";
import { pool } from "../db";

//Every single "entity" should have the following: create, delete, get, getPlural(getCampaigns, getNPCs...), update, updatePlural

//Campaign Section

//Used in CampaignForm to generate a new campaign
export const createCampaign = async (campaign: Campaign): Promise<Campaign> => {
  const id = uuid();
  await pool.query(
    `INSERT INTO campaigns (id, name, players, entities, npcs, locations, items, player_characters)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
    [
      id,
      campaign.name,
      campaign.players,
      JSON.stringify(campaign.entities ?? []),
      JSON.stringify(campaign.npcs ?? []),
      JSON.stringify(campaign.locations ?? []),
      JSON.stringify(campaign.items ?? []),
      JSON.stringify(campaign.playerCharacters ?? []),
    ]
  );
  return { ...campaign, id };
};

export const deleteCampaign = async (id: string): Promise<Array<Campaign>> => {
  await pool.query("DELETE FROM campaigns WHERE id = $1", [id]);

  const allCampaigns = await getCampaigns();

  return allCampaigns;
};

//Used in the useCampaign hook, which itself is used anywhere where the campaign needs to be set.
export const getCampaign = async (id: string): Promise<Campaign> => {
  const result = await pool.query("SELECT * FROM campaigns WHERE id = $1",
    [id]
  );

  return result.rows[0] as Campaign;
};

//Used in the getCampaign method, as well as in the useCampaigns hook, which is used in the CampaignList component.
export const getCampaigns = async (): Promise<Campaign[]> => {
  const result = await pool.query("SELECT * FROM campaigns");
  return result.rows as Campaign[];
};

//Used anytime that something within a Campaign is changed or updated so that the new information can be saved.
export const updateCampaign = async (campaign: Campaign): Promise<Campaign> => {
  await pool.query(
    `UPDATE campaigns
    SET name = $2, players = $3, entities = $4, npcs = $5, locations = $6, items = $7, player_characters = $8
    WHERE id = $1`,
    [
      campaign.id,
      campaign.name,
      campaign.players,
      JSON.stringify(campaign.entities ?? []),
      JSON.stringify(campaign.npcs ?? []),
      JSON.stringify(campaign.locations ?? []),
      JSON.stringify(campaign.items ?? []),
      JSON.stringify(campaign.playerCharacters ?? []),
    ]
  );

  const updatedCampaign = campaign;

  return updatedCampaign;
};

//NPC Section

//Used in the AddNPC component to save a new NPC object to a campaign.
export const createNPC = async (campaignId: string, npc: NPC): Promise<NPC> => {
  npc = {
    ...npc,
    id: uuid(),
    type: "NPC",
    modifiedDate: Date.now(),
  };

  await pool.query(
    `INSERT INTO entities (id, type, name, description, notes, image, isfavourite, modifieddate, incampaign)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
    [
      npc.id,
      npc.type,
      npc.name,
      npc.description,
      npc.notes,
      npc.image,
      npc.isFavourite,
      npc.modifiedDate,
      campaignId
    ]
  );

  return npc;
};

//
export const deleteNPC = async (
  campaignId: string,
  npcId: string
): Promise<Array<NPC>> => {
  await pool.query("DELETE FROM entities WHERE id = $1", [npcId]);

  const campaignNpcs = await getNPCs(campaignId);

  return campaignNpcs;
};

//Acquires an NPC. Necessary for updating an NPC's props.
export const getNPC = async (
  campaignId: string,
  npcId: string
): Promise<NPC> => {
  const foundNpc = await pool.query(
    "SELECT * FROM entities WHERE id = $1 AND incampaign = $2",
    [npcId, campaignId]
  );

  return foundNpc.rows[0] as NPC;
};

//Used in getNPC, as well as in the ThingList component.
export const getNPCs = async (campaignId: string): Promise<Array<NPC>> => {
  const campaignNpcs = await pool.query("SELECT * FROM entities WHERE incampaign = $1 AND type = $2",
    [campaignId, "NPC"]
  );

  return campaignNpcs.rows as Array<NPC>;
};

//Uncertain if this works because I haven't had a way to test it yet, but it will be necessary anytime an NPC's props are updated.
export const updateNPC = async (campaignId: string, npc: NPC): Promise<NPC> => {
  await pool.query(
    `UPDATE entities
     SET name = $2, description = $3, notes = $4, image = $5, isfavourite = $6, modifieddate = $7
     WHERE id = $1 AND incampaign = $8`,
    [
      npc.id,
      npc.name,
      npc.description,
      npc.notes,
      npc.image,
      npc.isFavourite,
      Date.now(),
      campaignId
    ]
  );

  const updatedNpc = npc;

  return updatedNpc;
};

//Location Section

//
export const createLocation = async (location: Location,campaignId: string): Promise<Location> => {
  location = {
    ...location,
    id: uuid(),
    type: "Location",
    maps: location.maps ?? [],
    modifiedDate: Date.now(),
  };

  await pool.query(
    `INSERT INTO entities (id, type, name, description, notes, image, isfavourite, modifieddate, incampaign)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
    [
      location.id,
      location.type,
      location.name,
      location.description,
      location.notes,
      location.image,
      location.isFavourite,
      location.modifiedDate,
      campaignId
    ]
  );
  await pool.query(
    `INSERT INTO locations (entity, maps)
     VALUES ($1, $2)`,
     [
      location.id,
      location.maps
    ]
  );

  return location;
};

//
export const deleteLocation = async (campaignId: string,locationId: string): Promise<Array<Location>> => {
  await pool.query("DELETE FROM entities WHERE id = $1",
    [locationId]
  );
  // await pool.query("DELETE FROM locations WHERE entity = $1",
  //   [locationId]
  // ); This will only be necessary if cascadedeletion isn't set up in the database.

  const campaignLocations = await getLocations(campaignId);

  return campaignLocations;
};

//
export const getLocation = async (campaignId: string,locationId: string): Promise<Location> => {
  const foundLocation = await pool.query(
    "SELECT * FROM entities WHERE id = $1 AND incampaign = $2",
    [locationId, campaignId]
  );

  return foundLocation.rows[0] as Location;
};

//
export const getLocations = async (campaignId: string): Promise<Array<Location>> => {
  const campaignLocations = await pool.query(
    "SELECT * FROM entities WHERE incampaign = $1 AND type = $2",
    [campaignId, "Location"]
  );

  return campaignLocations.rows as Array<Location>;
};

//
export const updateLocation = async (campaignId: string,location: Location): Promise<Location> => {
  await pool.query(
    `UPDATE entities
     SET name = $2, description = $3, notes = $4, image = $5, isfavourite = $6, modifieddate = $7
     WHERE id = $1 AND incampaign = $8`,
    [
      location.id,
      location.name,
      location.description,
      location.notes,
      location.image,
      location.isFavourite,
      Date.now(),
      campaignId
    ]
  );
  await pool.query(
    `UPDATE locations
     SET maps = $2
     WHERE entity = $1`,
    [
      location.id,
      location.maps
    ]
  );

  const updatedLocation = location;

  return updatedLocation;
};


//Item Section

//
export const createItem = async (
  item: Item,
  campaignId: string
): Promise<Item> => {
  const campaign = await getCampaign(campaignId);

  item = {
    ...item,
    id: uuid(),
    type: "Item",
    modifiedDate: Date.now(),
  };

  const allItems = await getItems(campaignId);

  const newItems = [...allItems, item];

  await updateItems(newItems, campaign);

  return item;
};

//
export const deleteItem = async (
  campaignId: string,
  itemId: string
): Promise<Array<Item>> => {
  const campaign = await getCampaign(campaignId);
  const itemList = await getItems(campaignId);
  const item = await getItem(campaignId, itemId);

  const updatedItems = itemList.filter((datum) => datum.id != item.id);

  await updateItems(updatedItems, campaign);

  return updatedItems;
};

//
export const getItem = async (
  campaignId: string,
  itemId: string
): Promise<Item> => {
  const itemList = await getItems(campaignId);
  const finditem = itemList.find((datum) => datum.id === itemId);

  return finditem as Item;
};

//
export const getItems = async (campaignId: string): Promise<Array<Item>> => {
  const campaign = await getCampaign(campaignId);

  const items = campaign.items;
  return items as Array<Item>;
};

//
export const updateItem = async (
  campaignId: string,
  item: Item
): Promise<Item> => {
  const campaign = await getCampaign(campaignId);

  item = {
    ...item,
    modifiedDate: Date.now(),
  };
  const updatedItem = item;

  const removedOld = await deleteItem(campaign.id, item.id);

  const addingUpdated = [...removedOld, updatedItem];

  await updateItems(addingUpdated, campaign);

  return updatedItem;
};

//
export const updateItems = async (
  newItems: Array<Item>,
  campaign: Campaign
): Promise<Array<Item>> => {
  campaign.items = newItems;

  await updateCampaign(campaign);

  return campaign.items;
};

//PC Section

//
export const createPC = async (pc: PC, campaignId: string): Promise<PC> => {
  const campaign = await getCampaign(campaignId);

  pc = {
    ...pc,
    id: uuid(),
    type: "PC",
    modifiedDate: Date.now(),
  };

  const allPCs = await getPCs(campaignId);

  const newPCs = [...allPCs, pc];

  await updatePCs(newPCs, campaign);

  return pc;
};

//
export const deletePC = async (
  campaignId: string,
  pcId: string
): Promise<Array<PC>> => {
  const campaign = await getCampaign(campaignId);
  const pcList = await getPCs(campaignId);
  const pc = await getPC(campaignId, pcId);

  const updatedPCs = pcList.filter((datum) => datum.id != pc.id);

  await updatePCs(updatedPCs, campaign);

  return updatedPCs;
};

//
export const getPC = async (campaignId: string, pcId: string): Promise<PC> => {
  const pcList = await getPCs(campaignId);
  const findPC = pcList.find((datum) => datum.id === pcId);

  return findPC as PC;
};

//
export const getPCs = async (campaignId: string): Promise<Array<PC>> => {
  const campaign = await getCampaign(campaignId);

  const pcs = campaign.playerCharacters;
  return pcs as Array<PC>;
};

//
export const updatePC = async (campaignId: string, pc: PC): Promise<PC> => {
  const campaign = await getCampaign(campaignId);

  pc = {
    ...pc,
    modifiedDate: Date.now(),
  };
  const updatedPC = pc;

  const removedOld = await deletePC(campaign.id, pc.id);

  const addingUpdated = [...removedOld, updatedPC];

  await updatePCs(addingUpdated, campaign);

  return updatedPC;
};

//
export const updatePCs = async (
  newPCs: Array<PC>,
  campaign: Campaign
): Promise<Array<PC>> => {
  campaign.playerCharacters = newPCs;

  await updateCampaign(campaign);

  return campaign.playerCharacters;
};
