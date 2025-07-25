import { Campaign } from "../types/Campaign";
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
  const response = await fetch(`http://localhost:5000/api/campaign/${campaignId}/location`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(location),
  });

  if (!response.ok) {
    throw new Error("Failed to create location");
  }

  const createdLocation = await response.json();
  return createdLocation as Location;
};


//
export const deleteLocation = async (campaignId: string, locationId: string): Promise<Array<Location>> => {
  const response = await fetch(`http://localhost:5000/api/campaign/${campaignId}/location/${locationId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete location");
  }

  const updatedLocations = await getLocations(campaignId);
  return updatedLocations;
};


//
export const getLocation = async (campaignId: string, locationId: string): Promise<Location> => {
  const response = await fetch(`http://localhost:5000/api/campaign/${campaignId}/location/${locationId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  if (!response.ok) {
    throw new Error("Failed to fetch location");
  }

  const location = await response.json();
  return location as Location;
};

//
export const getLocations = async (campaignId: string): Promise<Array<Location>> => {
  const response = await fetch(`http://localhost:5000/api/campaign/${campaignId}/locations`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch locations");
  }

  const locations = await response.json();
  return locations as Array<Location>;
};

//
export const updateLocation = async (campaignId: string, location: Location): Promise<Location> => {
  const response = await fetch(`http://localhost:5000/api/campaign/${campaignId}/location/${location.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(location),
  });

  if (!response.ok) {
    throw new Error("Failed to update location");
  }

  const updatedLocation = await response.json();
  return updatedLocation as Location;
};


//Item Section

//
export const createItem = async (item: Item, campaignId: string): Promise<Item> => {
  const response = await fetch(`http://localhost:5000/api/campaign/${campaignId}/item`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });

  if (!response.ok) {
    throw new Error("Failed to create item");
  }

  const createdItem = await response.json();
  return createdItem as Item;
};


//
export const deleteItem = async (campaignId: string, itemId: string): Promise<Array<Item>> => {
  const response = await fetch(`http://localhost:5000/api/campaign/${campaignId}/item/${itemId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete item");
  }

  const updatedItems = await getItems(campaignId);

  return updatedItems;
};

//
export const getItem = async (campaignId: string, itemId: string): Promise<Item> => {
  const response = await fetch(`http://localhost:5000/api/campaign/${campaignId}/item/${itemId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch item");
  }

  const item = await response.json();
  return item as Item;
};

//
export const getItems = async (campaignId: string): Promise<Array<Item>> => {
  const response = await fetch(`http://localhost:5000/api/campaign/${campaignId}/items`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch items");
  }

  const items = await response.json();
  return items as Array<Item>;
};

//
export const updateItem = async (campaignId: string, item: Item): Promise<Item> => {
  const response = await fetch(`http://localhost:5000/api/campaign/${campaignId}/item/${item.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });

  if (!response.ok) {
    throw new Error("Failed to update item");
  }

  const updatedItem = await response.json();

  return updatedItem as Item;
};



//PC Section

//
export const createPC = async (pc: PC, campaignId: string): Promise<PC> => {
  const response = await fetch(`http://localhost:5000/api/campaign/${campaignId}/pc`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(pc),
  });

  if (!response.ok) {
    throw new Error("Failed to create PC");
  }

  const createdPC = await response.json();
  return createdPC as PC;
};


//
export const deletePC = async (campaignId: string, pcId: string): Promise<Array<PC>> => {
  const response = await fetch(`http://localhost:5000/api/campaign/${campaignId}/pc/${pcId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete PC");
  }

  const updatedPCs = await getPCs(campaignId);
  return updatedPCs;
};


//
export const getPC = async (campaignId: string, pcId: string): Promise<PC> => {
  const response = await fetch(`http://localhost:5000/api/campaign/${campaignId}/pc/${pcId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch PC");
  }

  const pc = await response.json();
  return pc as PC;
};

//
export const getPCs = async (campaignId: string): Promise<Array<PC>> => {
  const response = await fetch(`http://localhost:5000/api/campaign/${campaignId}/pcs`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch PCs");
  }

  const pcs = await response.json();
  return pcs as Array<PC>;
};

//
export const updatePC = async (campaignId: string, pc: PC): Promise<PC> => {
  const response = await fetch(`http://localhost:5000/api/campaign/${campaignId}/pc/${pc.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(pc),
  });

  if (!response.ok) {
    throw new Error("Failed to update PC");
  }

  const updatedPC = await response.json();
  return updatedPC as PC;
};