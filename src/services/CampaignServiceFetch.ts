import { Campaign } from "../types/Campaign";
import { v4 as uuid } from "uuid";
import { NPC } from "../types/NPC";
import { Location } from "../types/Location";
import { Item } from "../types/Item";
import { PC } from "../types/PlayerCharacter";

//Every single "entity" should have the following: create, delete, get, getPlural(getCampaigns, getNPCs...), update, updatePlural

//Campaign Section

//Used in CampaignForm to generate a new campaign
export const createCampaign = async (campaign: Campaign): Promise<Campaign> => {
  const response = await fetch("http://localhost:5000/api/campaign", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(campaign),
  });

  if (!response.ok) {
    throw new Error("Failed to create campaign");
  }

  const createdCampaign = await response.json();
  return createdCampaign as Campaign;
};

export const deleteCampaign = async (id: string): Promise<Array<Campaign>> => {
  const response = await fetch(`http://localhost:5000/api/campaign/${id}`, {
    method: "DELETE",
    headers:{
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete campaign");
  }

  const allCampaigns = await getCampaigns();

  return allCampaigns;
};

//Used in the useCampaign hook, which itself is used anywhere where the campaign needs to be set.
export const getCampaign = async (id: string): Promise<Campaign> => {
  const response = await fetch(`http://localhost:5000/api/campaign/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch campaign");
  }

  const campaign = await response.json();

  return campaign as Campaign;
};

//Used in the getCampaign method, as well as in the useCampaigns hook, which is used in the CampaignList component.
export const getCampaigns = async (): Promise<Array<Campaign>> => {
  const response = await fetch("http://localhost:5000/api/campaign", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch campaigns");
  }

  const allCampaigns = await response.json();

  return allCampaigns as Array<Campaign>;
};

//Used anytime that something within a Campaign is changed or updated so that the new information can be saved.
export const updateCampaign = async (campaign: Campaign): Promise<Campaign> => {
  const response = await fetch(`http://localhost:5000/api/campaign/${campaign.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(campaign),
  });

  if (!response.ok) {
    throw new Error("Failed to update campaign");
  }

  const updatedCampaign = await response.json();

  return updatedCampaign as Campaign;
};



//NPC Section

//Used in the AddNPC component to save a new NPC object to a campaign.
export const createNPC = async (campaignId: string, npc: NPC): Promise<NPC> => {
  const response = await fetch(`http://localhost:5000/api/campaign/${campaignId}/npc`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(npc),
  });

  if (!response.ok) {
    throw new Error("Failed to create NPC");
  }

  const createdNPC = await response.json();
  return createdNPC as NPC;
};

//
export const deleteNPC = async (campaignId: string, npcId: string): Promise<Array<NPC>> => {
  const response = await fetch(`http://localhost:5000/api/campaign/${campaignId}/npc/${npcId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete NPC");
  }

  const allNPCs = await getNPCs(campaignId);
  return allNPCs;
};

//Acquires an NPC. Necessary for updating an NPC's props.
export const getNPC = async (campaignId: string, npcId: string): Promise<NPC> => {
  const response = await fetch(`http://localhost:5000/api/campaign/${campaignId}/npc/${npcId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch NPC");
  }

  const npc = await response.json();
  return npc as NPC;
};

//Used in getNPC, as well as in the ThingList component.
export const getNPCs = async (campaignId: string): Promise<Array<NPC>> => {
  const response = await fetch(`http://localhost:5000/api/campaign/${campaignId}/npcs`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch NPCs");
  }

  const npcs = await response.json();
  return npcs as Array<NPC>;
};

//
export const updateNPC = async (campaignId: string, npc: NPC): Promise<NPC> => {
  const response = await fetch(`http://localhost:5000/api/campaign/${campaignId}/npc/${npc.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(npc),
  });

  if (!response.ok) {
    throw new Error("Failed to update NPC");
  }

  const updatedNpc = await response.json();
  return updatedNpc as NPC;
};


//Location Section

//
export const createLocation = async (location: Location, campaignId: string): Promise<Location> => {
  const campaign = await getCampaign(campaignId);

  location = {
    ...location,
    id: uuid(),
    type:"Location",
    maps:(location.maps ?? []),
    modifiedDate:Date.now(),
  };

  const allLocations = await getLocations(campaignId);

  const newLocations = [...allLocations, location];

  await updateLocations(newLocations, campaign);

  return location;
};

//
export const deleteLocation = async (
  campaignId: string,
  locationId: string
): Promise<Array<Location>> => {
  const campaign = await getCampaign(campaignId);
  const locationList = await getLocations(campaignId);
  const location = await getLocation(campaignId, locationId);

  const updatedLocations = locationList.filter((datum) => datum.id != location.id);

  await updateLocations(updatedLocations, campaign);

  return updatedLocations;
};

//
export const getLocation = async (
  campaignId: string,
  locationId: string
): Promise<Location> => {
  const locationList = await getLocations(campaignId);
  const findlocation = locationList.find((datum) => datum.id === locationId);

  return findlocation as Location;
};

//
export const getLocations = async (campaignId: string): Promise<Array<Location>> => {
  const campaign = await getCampaign(campaignId);

  const locations = campaign.locations;
  return locations as Array<Location>;
};

//
export const updateLocation = async (campaignId: string, location: Location): Promise<Location> => {
  const campaign = await getCampaign(campaignId);

  location = {
    ...location,
    modifiedDate:Date.now(),
  }
  const updatedLocation = location;

  const removedOld = await deleteLocation(campaign.id, location.id);

  const addingUpdated = [...removedOld, updatedLocation];

  await updateLocations(addingUpdated, campaign);

  return updatedLocation;
};

//
export const updateLocations = async (
  newlocations: Array<Location>,
  campaign: Campaign
): Promise<Array<Location>> => {
  campaign.locations = newlocations;

  await updateCampaign(campaign);

  return campaign.locations;
};


//Item Section

//
export const createItem = async (item: Item, campaignId: string): Promise<Item> => {
  const campaign = await getCampaign(campaignId);

  item = {
    ...item,
    id: uuid(),
    type:"Item",
    modifiedDate:Date.now(),
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
export const updateItem = async (campaignId: string, item: Item): Promise<Item> => {
  const campaign = await getCampaign(campaignId);

  item = {
    ...item,
    modifiedDate:Date.now(),
  }
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
    type:"PC",
    modifiedDate:Date.now(),
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
export const getPC = async (
  campaignId: string,
  pcId: string
): Promise<PC> => {
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
    modifiedDate:Date.now(),
  }
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
