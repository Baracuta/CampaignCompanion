import { Campaign } from "../types/Campaign";
import { v4 as uuid } from "uuid";
import { NPC } from "../types/NPC";
import { Location } from "../types/Location";
import { Item } from "../types/Item";
import { PC } from "../types/PlayerCharacter";
import { pool } from "../db";
import { User } from "../types/User";

//Every single "entity" should have the following: create, delete, get, getPlural(getCampaigns, getNPCs...), update, updatePlural

//Users Section

export const createUser = async (user: User): Promise<User> => {
  const id = user.id;

  await pool.query(
    `INSERT INTO users (id, email, name)
     VALUES ($1, $2, $3)`,
    [
      user.id,
      user.email,
      user.name
    ]
  );
  return { ...user, id };
};

export const getUser = async (id: string): Promise<User> => {
  const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return result.rows[0] as User;
};

//Campaign Section

//Used in CampaignForm to generate a new campaign
export const createCampaign = async (campaign: Campaign): Promise<Campaign> => {
  const id = uuid();
  try {
    await pool.query(
      `INSERT INTO campaigns (id, name, players, game, userid) VALUES ($1, $2, $3, $4, $5)`,
    [
      id,
      campaign.name,
      campaign.players,
      campaign.game,
      campaign.user
    ]
  )} catch (error) {
    console.error("Error creating campaign:", error);
    throw new Error("Failed to create campaign");
  }
  return { ...campaign, id };
};

export const deleteCampaign = async (id: string): Promise<void> => {
  await pool.query("DELETE FROM campaigns WHERE id = $1", [id]);
};


//Used in the useCampaign hook, which itself is used anywhere where the campaign needs to be set.
export const getCampaign = async (id: string): Promise<Campaign> => {
  // Get campaign data
  const result = await pool.query("SELECT * FROM campaigns WHERE id = $1", [id]);
  const campaign = result.rows[0] as Campaign;

  // Get all entities for this campaign
  const entitiesResult = await pool.query(
    "SELECT * FROM entities WHERE incampaign = $1",
    [id]
  );
  const entities = entitiesResult.rows;

  // Separate entities by type
  campaign.npcs = entities.filter((e: any) => e.type === "NPC");
  campaign.locations = entities.filter((e: any) => e.type === "Location");
  campaign.items = entities.filter((e: any) => e.type === "Item");
  campaign.playerCharacters = entities.filter((e: any) => e.type === "PC");

  return campaign;
};

//Used in the getCampaign method, as well as in the useCampaigns hook, which is used in the CampaignList component.
export const getCampaigns = async (userId:string): Promise<Campaign[]> => {
  const result = await pool.query("SELECT * FROM campaigns WHERE userid = $1", [userId]);
  
  return result.rows as Campaign[];
};

//Used anytime that something within a Campaign is changed or updated so that the new information can be saved.
export const updateCampaign = async (campaign: Campaign): Promise<Campaign> => {
  await pool.query(
    `UPDATE campaigns
    SET name = $2, players = $3
    WHERE id = $1`,
    [
      campaign.id,
      campaign.name,
      campaign.players,
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
    modifieddate: Date.now(),
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
      npc.isfavourite,
      npc.modifieddate,
      campaignId
    ]
  );

  return npc;
};

//
export const deleteNPC = async (campaignId: string, npcId: string): Promise<Array<NPC>> => {
  await pool.query("DELETE FROM entities WHERE id = $1", [npcId]);

  const campaignNpcs = await getNPCs(campaignId);

  return campaignNpcs;
};

//Acquires an NPC. Necessary for updating an NPC's props.
export const getNPC = async (campaignId: string, npcId: string): Promise<NPC> => {
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

//
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
      npc.isfavourite,
      Date.now(),
      campaignId
    ]
  );

  return npc;
};

//Location Section

//
export const createLocation = async (location: Location,campaignId: string): Promise<Location> => {
  location = {
    ...location,
    id: uuid(),
    type: "Location",
    maps: location.maps ?? [],
    modifieddate: Date.now(),
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
      location.isfavourite,
      location.modifieddate,
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
    "SELECT * FROM entities INNER JOIN locations ON entities.id = locations.entity WHERE id = $1 AND incampaign = $2",
    [locationId, campaignId]
  );

  return foundLocation.rows[0] as Location;
};

//
export const getLocations = async (campaignId: string): Promise<Array<Location>> => {
  const campaignLocations = await pool.query(
    "SELECT * FROM entities INNER JOIN locations ON entities.id = locations.entity WHERE incampaign = $1 AND type = $2",
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
      location.isfavourite,
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

  return location;
};


//Item Section

//
export const createItem = async (item: Item,campaignId: string): Promise<Item> => {
  item = {
    ...item,
    id: uuid(),
    type: "Item",
    modifieddate: Date.now(),
  };
  await pool.query(
    `INSERT INTO entities (id, type, name, description, notes, image, isfavourite, modifieddate, incampaign)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
    [
      item.id,
      item.type,
      item.name,
      item.description,
      item.notes,
      item.image,
      item.isfavourite,
      item.modifieddate,
      campaignId
    ]
  );
  await pool.query(
    `INSERT INTO items (entity, effect, category)
     VALUES ($1, $2, $3)`,
    [
      item.id,
      item.effect,
      item.category
    ]
  );

  return item;
};

//
export const deleteItem = async (campaignId: string,itemId: string): Promise<Array<Item>> => {
  await pool.query("DELETE FROM entities WHERE id = $1",
    [itemId]
  );

  const campaignItems = await getItems(campaignId);

  return campaignItems;
};

//
export const getItem = async (campaignId: string,itemId: string): Promise<Item> => {
  const foundItem = await pool.query(
    "SELECT * FROM entities INNER JOIN items ON entities.id = items.entity WHERE id = $1 AND incampaign = $2",
    [itemId, campaignId]
  );

  return foundItem.rows[0] as Item;
};

//
export const getItems = async (campaignId: string): Promise<Array<Item>> => {
  const campaignItems = await pool.query(
    "SELECT * FROM entities INNER JOIN items ON entities.id = items.entity WHERE incampaign = $1 AND type = $2",
    [campaignId, "Item"]
  );

  return campaignItems.rows as Array<Item>;
};

//
export const updateItem = async (campaignId: string,item: Item): Promise<Item> => {
  await pool.query(
    `UPDATE entities
     SET name = $2, description = $3, notes = $4, image = $5, isfavourite = $6, modifieddate = $7
     WHERE id = $1 AND incampaign = $8`,
    [
      item.id,
      item.name,
      item.description,
      item.notes,
      item.image,
      item.isfavourite,
      Date.now(),
      campaignId
    ]
  );
  await pool.query(
    `UPDATE items
     SET effect = $2, category = $3
     WHERE entity = $1`,
    [
      item.id,
      item.effect,
      item.category
    ]
  );

  return item;
};


//PC Section

//
export const createPC = async (pc: PC, campaignId: string): Promise<PC> => {
  pc = {
    ...pc,
    id: uuid(),
    type: "PC",
    modifieddate: Date.now(),
  };

  await pool.query(
    `INSERT INTO entities (id, type, name, description, notes, image, isfavourite, modifieddate, incampaign)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
    [
      pc.id,
      pc.type,
      pc.name,
      pc.description,
      pc.notes,
      pc.image,
      pc.isfavourite,
      pc.modifieddate,
      campaignId
    ]
  );
  await pool.query(
    `INSERT INTO player_characters (entity, pc_class, level, player_name)
     VALUES ($1, $2, $3, $4)`,
    [
      pc.id,
      pc.pc_class,
      pc.level,
      pc.player_name
    ]
  );

  return pc;
};

//
export const deletePC = async (campaignId: string,pcId: string): Promise<Array<PC>> => {
  await pool.query("DELETE FROM entities WHERE id = $1",
    [pcId]
  );

  const campaignPCs = await getPCs(campaignId);

  return campaignPCs;
};

//
export const getPC = async (campaignId: string, pcId: string): Promise<PC> => {
  const foundPC = await pool.query(
    "SELECT * FROM entities INNER JOIN player_characters ON entities.id = player_characters.entity WHERE id = $1 AND incampaign = $2",
    [pcId, campaignId]
  );

  return foundPC.rows[0] as PC;
};

//
export const getPCs = async (campaignId: string): Promise<Array<PC>> => {
  const campaignPCs = await pool.query(
    "SELECT * FROM entities INNER JOIN player_characters ON entities.id = player_characters.entity WHERE incampaign = $1 AND type = $2",
    [campaignId, "PC"]
  );

  return campaignPCs.rows as Array<PC>;
};

//
export const updatePC = async (campaignId: string, pc: PC): Promise<PC> => {
  await pool.query(
    `UPDATE entities
     SET name = $2, description = $3, notes = $4, image = $5, isfavourite = $6, modifieddate = $7
     WHERE id = $1 AND incampaign = $8`,
    [
      pc.id,
      pc.name,
      pc.description,
      pc.notes,
      pc.image,
      pc.isfavourite,
      Date.now(),
      campaignId
    ]
  );
  await pool.query(
    `UPDATE player_characters
     SET pc_class = $2, level = $3, player_name = $4
     WHERE entity = $1`,
    [
      pc.id,
      pc.pc_class,
      pc.level,
      pc.player_name
    ]
  );

  return pc;
};