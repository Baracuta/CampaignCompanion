import { Campaign } from "../types/Campaign";
import { NPC } from "../types/NPC";
import { Location } from "../types/Location";
import { Item } from "../types/Item";
import { PC } from "../types/PlayerCharacter";
import { User } from "../types/User";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

//Every single "entity" should have the following: create, delete, get, getPlural(getCampaigns, getNPCs...), update, updatePlural
export const handleUser = async (): Promise<User> => {
  try {
    const user = await getUser();
    return user;
  } catch (error: any) {
    console.log(error)
  
    const user = await createUser();
    return user;
  
  }
}
export const createUser = async (): Promise<User> => {
  const token = await localStorage.getItem("google_token");
  const response = await fetch(`${API_BASE_URL}/api/user`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `${token}`
    },
  });

  if (!response.ok) {
    throw new Error("Failed to create user: Frontend");
  }

  const createdUser = await response.json();
  return createdUser as User;
};

export const getUser = async (): Promise<User> => {
  const token = localStorage.getItem("google_token");
  const response = await fetch(`${API_BASE_URL}/api/user`, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `${token}`
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }

  const user = await response.json();
  return user as User;
};

//Campaign Section

export const createCampaign = async (campaign: Campaign): Promise<Campaign> => {
  const token = localStorage.getItem("google_token");
  const response = await fetch(`${API_BASE_URL}/api/campaign`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `${token}`
    },
    body: JSON.stringify(campaign),
  });

  if (!response.ok) {
    throw new Error("Failed to create campaign");
  }

  const createdCampaign = await response.json();
  return createdCampaign as Campaign;
};

export const deleteCampaign = async (id: string): Promise<void> => {
  const token = localStorage.getItem("google_token");
  const response = await fetch(`${API_BASE_URL}/api/campaign/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `${token}`
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete campaign");
  }

  return;
};

export const getCampaign = async (id: string): Promise<Campaign> => {
  const token = localStorage.getItem("google_token");
  const response = await fetch(`${API_BASE_URL}/api/campaign/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `${token}`
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch campaign");
  }

  const campaign = await response.json();

  return campaign as Campaign;
};

export const getCampaigns = async (): Promise<Array<Campaign>> => {
  const token = localStorage.getItem("google_token");
  const user = await getUser();
  const response = await fetch(`${API_BASE_URL}/api/campaign/user/${user.id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `${token}`
    }
  });

  if (!response.ok) {
    throw new Error("Failed to fetch campaigns");
  }

  const allCampaigns = await response.json();

  return allCampaigns as Array<Campaign>;
};

export const updateCampaign = async (campaign: Campaign): Promise<Campaign> => {
  const token = localStorage.getItem("google_token");
  const response = await fetch(`${API_BASE_URL}/api/campaign/${campaign.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `${token}`
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

export const createNPC = async (campaignId: string, npc: NPC): Promise<NPC> => {
  const token = localStorage.getItem("google_token");
  const response = await fetch(`${API_BASE_URL}/api/campaign/${campaignId}/npc`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `${token}`
    },
    body: JSON.stringify(npc),
  });

  if (!response.ok) {
    throw new Error("Failed to create NPC");
  }

  const createdNPC = await response.json();
  return createdNPC as NPC;
};

export const deleteNPC = async (campaignId: string, npcId: string): Promise<Array<NPC>> => {
  const token = localStorage.getItem("google_token");
  const response = await fetch(`${API_BASE_URL}/api/campaign/${campaignId}/npc/${npcId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `${token}`
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete NPC");
  }

  const allNPCs = await getNPCs(campaignId);
  return allNPCs;
};

export const getNPC = async (campaignId: string, npcId: string): Promise<NPC> => {
  const token = localStorage.getItem("google_token");
  const response = await fetch(`${API_BASE_URL}/api/campaign/${campaignId}/npc/${npcId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `${token}`
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch NPC");
  }

  const npc = await response.json();
  return npc as NPC;
};

export const getNPCs = async (campaignId: string): Promise<Array<NPC>> => {
  const token = localStorage.getItem("google_token");
  const response = await fetch(`${API_BASE_URL}/api/campaign/${campaignId}/npc`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `${token}`
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch NPCs");
  }

  const npcs = await response.json();
  return npcs as Array<NPC>;
};

export const updateNPC = async (campaignId: string, npc: NPC): Promise<NPC> => {
  const token = localStorage.getItem("google_token");
  const response = await fetch(`${API_BASE_URL}/api/campaign/${campaignId}/npc/${npc.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `${token}`
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

export const createLocation = async (location: Location, campaignId: string): Promise<Location> => {
  const token = localStorage.getItem("google_token");
  const response = await fetch(`${API_BASE_URL}/api/campaign/${campaignId}/location`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `${token}`
    },
    body: JSON.stringify(location),
  });

  if (!response.ok) {
    throw new Error("Failed to create location");
  }

  const createdLocation = await response.json();
  return createdLocation as Location;
};

export const deleteLocation = async (campaignId: string, locationId: string): Promise<Array<Location>> => {
  const token = localStorage.getItem("google_token");
  const response = await fetch(`${API_BASE_URL}/api/campaign/${campaignId}/location/${locationId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `${token}`
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete location");
  }

  const updatedLocations = await getLocations(campaignId);
  return updatedLocations;
};

export const getLocation = async (campaignId: string, locationId: string): Promise<Location> => {
  const token = localStorage.getItem("google_token");
  const response = await fetch(`${API_BASE_URL}/api/campaign/${campaignId}/location/${locationId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `${token}`
    },
  });
  
  if (!response.ok) {
    throw new Error("Failed to fetch location");
  }

  const location = await response.json();
  return location as Location;
};

export const getLocations = async (campaignId: string): Promise<Array<Location>> => {
  const token = localStorage.getItem("google_token");
  const response = await fetch(`${API_BASE_URL}/api/campaign/${campaignId}/location`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `${token}`
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch locations");
  }

  const locations = await response.json();
  return locations as Array<Location>;
};

export const updateLocation = async (campaignId: string, location: Location): Promise<Location> => {
  const token = localStorage.getItem("google_token");
  const response = await fetch(`${API_BASE_URL}/api/campaign/${campaignId}/location/${location.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `${token}`
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

export const createItem = async (item: Item, campaignId: string): Promise<Item> => {
  const token = localStorage.getItem("google_token");
  const response = await fetch(`${API_BASE_URL}/api/campaign/${campaignId}/item`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `${token}`
    },
    body: JSON.stringify(item),
  });

  if (!response.ok) {
    throw new Error("Failed to create item");
  }

  const createdItem = await response.json();
  return createdItem as Item;
};

export const deleteItem = async (campaignId: string, itemId: string): Promise<Array<Item>> => {
  const token = localStorage.getItem("google_token");
  const response = await fetch(`${API_BASE_URL}/api/campaign/${campaignId}/item/${itemId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `${token}`
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete item");
  }

  const updatedItems = await getItems(campaignId);

  return updatedItems;
};

export const getItem = async (campaignId: string, itemId: string): Promise<Item> => {
  const token = localStorage.getItem("google_token");
  const response = await fetch(`${API_BASE_URL}/api/campaign/${campaignId}/item/${itemId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `${token}`
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch item");
  }

  const item = await response.json();
  return item as Item;
};

export const getItems = async (campaignId: string): Promise<Array<Item>> => {
  const token = localStorage.getItem("google_token");
  const response = await fetch(`${API_BASE_URL}/api/campaign/${campaignId}/item`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `${token}`
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch items");
  }

  const items = await response.json();
  return items as Array<Item>;
};

export const updateItem = async (campaignId: string, item: Item): Promise<Item> => {
  const token = localStorage.getItem("google_token");
  const response = await fetch(`${API_BASE_URL}/api/campaign/${campaignId}/item/${item.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `${token}`
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

export const createPC = async (pc: PC, campaignId: string): Promise<PC> => {
  const token = localStorage.getItem("google_token");
  const response = await fetch(`${API_BASE_URL}/api/campaign/${campaignId}/pc`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `${token}`
    },
    body: JSON.stringify(pc),
  });

  if (!response.ok) {
    throw new Error("Failed to create PC");
  }

  const createdPC = await response.json();
  return createdPC as PC;
};

export const deletePC = async (campaignId: string, pcId: string): Promise<Array<PC>> => {
  const token = localStorage.getItem("google_token");
  const response = await fetch(`${API_BASE_URL}/api/campaign/${campaignId}/pc/${pcId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `${token}`
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete PC");
  }

  const updatedPCs = await getPCs(campaignId);
  return updatedPCs;
};

export const getPC = async (campaignId: string, pcId: string): Promise<PC> => {
  const token = localStorage.getItem("google_token");
  const response = await fetch(`${API_BASE_URL}/api/campaign/${campaignId}/pc/${pcId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `${token}`
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch PC");
  }

  const pc = await response.json();
  return pc as PC;
};

export const getPCs = async (campaignId: string): Promise<Array<PC>> => {
  const token = localStorage.getItem("google_token");
  const response = await fetch(`${API_BASE_URL}/api/campaign/${campaignId}/pc`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `${token}`
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch PCs");
  }

  const pcs = await response.json();
  return pcs as Array<PC>;
};

export const updatePC = async (campaignId: string, pc: PC): Promise<PC> => {
  const token = localStorage.getItem("google_token");
  const response = await fetch(`${API_BASE_URL}/api/campaign/${campaignId}/pc/${pc.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `${token}`
    },
    body: JSON.stringify(pc),
  });

  if (!response.ok) {
    throw new Error("Failed to update PC");
  }

  const updatedPC = await response.json();
  return updatedPC as PC;
};