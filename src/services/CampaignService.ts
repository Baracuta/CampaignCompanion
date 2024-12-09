import { Campaign } from "../types/Campaign";
import { v4 as uuid } from "uuid";
import { NPC } from "../types/NPC";
import { Location } from "../types/Location";
import { Item } from "../types/Item";
import { PlayerCharacter } from "../types/PlayerCharacter";

//Every single "entity" should have the following: create, delete, get, getPlural(getCampaigns, getNPCs...), update, updatePlural

//Campaign Section

//Good
export const createCampaign = async (campaign: Campaign): Promise<Campaign> => {
  const allCampaigns = await getCampaigns();

  campaign = {
    ...campaign,
    id: uuid(),
    npcs: [],
    locations: [],
    items: [],
    playerCharacters: [],
  };

  const newCampaigns = [...allCampaigns, campaign];

  updateCampaigns(newCampaigns);

  return campaign;
};

//Good
export const deleteCampaign = async (id: string): Promise<Array<Campaign>> => {
  const allCampaigns = await getCampaigns();

  const campaign = await getCampaign(id);

  const updatedCampaigns = allCampaigns.filter(
    (item) => item.id != campaign.id
  );

  updateCampaigns(updatedCampaigns);

  return updatedCampaigns;
};

//Good
export const getCampaign = async (id: string): Promise<Campaign> => {
  const allCampaigns = await getCampaigns();
  const campaign = allCampaigns.find((campaign) => campaign.id === id);

  return campaign as Campaign;
};

//Good
export const getCampaigns = async (): Promise<Array<Campaign>> => {
  const allCampaignsString = localStorage.getItem("campaigns");
  const allCampaigns =
    allCampaignsString == null
      ? []
      : (JSON.parse(allCampaignsString) as Campaign[]);

  return allCampaigns;
};

//Good
export const updateCampaign = async (campaign: Campaign): Promise<Campaign> => {
  const updatedCampaign = campaign;

  const removedOld = await deleteCampaign(campaign.id);

  const addingUpdated = [...removedOld, updatedCampaign];

  updateCampaigns(addingUpdated);

  return updatedCampaign;
};

//Good
export const updateCampaigns = async (
  updatedCampaigns: Array<Campaign>
): Promise<Array<Campaign>> => {
  localStorage.setItem("campaigns", JSON.stringify(updatedCampaigns));
  return updatedCampaigns;
};

//NPC Section

//Good
export const createNPC = async (npc: NPC, campaignId: string): Promise<NPC> => {
  const campaign = await getCampaign(campaignId);

  npc = {
    ...npc,
    id: uuid(),
  };

  const allNPCS = await getNPCs(campaignId);

  const newNPCs = [...allNPCS, npc];

  updateNPCs(newNPCs, campaign);

  return npc;
};

//Should be good
export const deleteNPC = async (
  campaignId: string,
  npcId: string
): Promise<Array<NPC>> => {
  const campaign = await getCampaign(campaignId);
  const npcList = await getNPCs(campaignId);
  const npc = await getNPC(campaignId, npcId);

  const updatedNpcs = npcList.filter((item) => item.id != npc.id);

  updateNPCs(updatedNpcs, campaign);

  return updatedNpcs;
};

//Should be good
export const getNPC = async (
  campaignId: string,
  npcId: string
): Promise<NPC> => {
  const npcList = await getNPCs(campaignId);
  const findNpc = npcList.find((npc) => npc.id === npcId);

  return findNpc as NPC;
};

//Good
export const getNPCs = async (campaignId: string): Promise<Array<NPC>> => {
  const campaign = await getCampaign(campaignId);

  const npcs = campaign.npcs;
  return npcs as Array<NPC>;
};

//Probably good, but could possibly be made more efficient
export const updateNPC = async (campaignId: string, npc: NPC): Promise<NPC> => {
  const campaign = await getCampaign(campaignId);
  const updatedNpc = npc;

  const removedOld = await deleteNPC(campaign.id, npc.id);

  const addingUpdated = [...removedOld, updatedNpc];

  updateNPCs(addingUpdated, campaign);

  return updatedNpc;
};

//Good
export const updateNPCs = async (
  newNPCs: Array<NPC>,
  campaign: Campaign
): Promise<Array<NPC>> => {
  campaign.npcs = newNPCs;

  updateCampaign(campaign);

  return campaign.npcs;
};

//Location Section

//Good
export const createLocation = async (location: Location, campaignId: string): Promise<Location> => {
  const campaign = await getCampaign(campaignId);

  location = {
    ...location,
    id: uuid(),
  };

  const allLocations = await getLocations(campaignId);

  const newLocations = [...allLocations, location];

  updateLocations(newLocations, campaign);

  return location;
};

//Should be good
export const deleteLocation = async (
  campaignId: string,
  locationId: string
): Promise<Array<Location>> => {
  const campaign = await getCampaign(campaignId);
  const locationList = await getLocations(campaignId);
  const location = await getLocation(campaignId, locationId);

  const updatedLocations = locationList.filter((item) => item.id != location.id);

  updateLocations(updatedLocations, campaign);

  return updatedLocations;
};

//Should be good
export const getLocation = async (
  campaignId: string,
  locationId: string
): Promise<Location> => {
  const locationList = await getLocations(campaignId);
  const findlocation = locationList.find((location) => location.id === locationId);

  return findlocation as Location;
};

//Good
export const getLocations = async (campaignId: string): Promise<Array<Location>> => {
  const campaign = await getCampaign(campaignId);

  const locations = campaign.locations;
  return locations as Array<Location>;
};

//Probably good, but could possibly be made more efficient
export const updateLocation = async (campaignId: string, location: Location): Promise<Location> => {
  const campaign = await getCampaign(campaignId);
  const updatedLocation = location;

  const removedOld = await deleteLocation(campaign.id, location.id);

  const addingUpdated = [...removedOld, updatedLocation];

  updateLocations(addingUpdated, campaign);

  return updatedLocation;
};

//Good
export const updateLocations = async (
  newlocations: Array<Location>,
  campaign: Campaign
): Promise<Array<Location>> => {
  campaign.locations = newlocations;

  updateCampaign(campaign);

  return campaign.locations;
};
