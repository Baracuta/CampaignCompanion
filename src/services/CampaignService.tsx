import { Campaign } from "../types/Campaign";
import { v4 as uuid } from "uuid";
import { NPC } from "../types/NPC";
import { Location } from "../types/Location";

//Every single "entity" should have the following: create, delete, get, getPlural(getCampaigns, getNPCs...), update, updatePlural

//Campaign Section

//Used in the CampaignForm to create a new campaign using the information given in the form.
export const createCampaign = async (campaign: Campaign): Promise<Campaign> => {
    const allCampaigns = await getCampaigns();

    campaign={
        ...campaign,
        id:uuid()
    };

    const newCampaigns = [
        ...allCampaigns,
        campaign
    ];

    localStorage.setItem("campaigns", JSON.stringify(newCampaigns));

    return campaign;
}

//
export const deleteCampaign = async (id:string): Promise<Array<Campaign>> =>{
    const allCampaigns = await getCampaigns();

    const campaign= await getCampaign(id);

    const updatedCampaigns = allCampaigns.filter((item) => item.id != campaign.id);

    updateCampaigns(updatedCampaigns)

    return updatedCampaigns
}

//
export const getCampaign = async (id: string): Promise<Campaign> =>{
    const allCampaigns= await getCampaigns();
    const campaign=allCampaigns.find((campaign)=>campaign.id===id);

    return campaign as Campaign;
}

//Needed in order for campaignList and findCampaign to work correctly.
export const getCampaigns = async ():Promise<Array<Campaign>>=>{
    const allCampaignsString = localStorage.getItem("campaigns");
    const allCampaigns = allCampaignsString == null ? [] : JSON.parse(allCampaignsString) as Campaign[];

    return allCampaigns;
}

//Should be functional now. Takes a campaign and saves it in a const, then finds and deletes the old one, then puts the new one back and updates the array.
export const updateCampaign = async (campaign:Campaign): Promise<Campaign> =>{

    const updatedCampaign = campaign;

    const removedOld = await deleteCampaign(campaign.id);

    const addingUpdated = [
        ...removedOld,
        updatedCampaign
    ];

    updateCampaigns(addingUpdated);

    return updatedCampaign;
}

//This is used to update the grand list of campaigns after a specific campaign has been updated
export const updateCampaigns = async (updatedCampaigns:Array<Campaign>): Promise<Array<Campaign>> =>{
    localStorage.setItem("campaigns", JSON.stringify(updatedCampaigns));
    return updatedCampaigns;
}


//NPC Section

//What this should do is create a new NPC, combine it with the NPC array of a campaign, then use an updateNPCs method to update/save that array in the campaign.
export const createNPC = async (npc: NPC, campaignId:string): Promise<NPC> => {
    const campaign = await getCampaign(campaignId)
    console.log(campaign.npcs)
    npc={
        ...npc,
        id:uuid()
    };

    const allNPCS= await getNPCs(campaignId)

    const newNPCs=[
        ...allNPCS,
        npc]

    updateNPCs(newNPCs,campaign)

    return npc;
}

//
export const deleteNPC = async (npc: NPC, id:string): Promise<Array<NPC>> => {

}

//
export const getNPC = async (id:string): Promise<NPC> => {

}

//This is needed for both the NPCList component as well as the createNPC method above.
export const getNPCs = async (campaignId:string): Promise<Array<NPC>>=>{
    const campaign =  await getCampaign(campaignId)
    return  campaign.npcs as Array<NPC>;
}

//
export const updateNPC = async (npc:NPC): Promise<Array<NPC>> => {

}

//
export const updateNPCs = async (newNPCs:Array<NPC>,campaign:Campaign): Promise<Array<NPC>> => {


    updateCampaign()
}