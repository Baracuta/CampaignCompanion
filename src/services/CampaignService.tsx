import { Campaign } from "../types/Campaign";
import { v4 as uuid } from "uuid";
import { NPC } from "../types/NPC";

//Used in the CampaignForm to create a new campaign using the information given in the form.
export const createCampaign = async (campaign: Campaign): Promise<Campaign> => {
    campaign={
        ...campaign,
        id:uuid()
    };

    const allCampaignsString = localStorage.getItem("campaigns");
    const allCampaigns = allCampaignsString == null ? [] : JSON.parse(allCampaignsString);

    const newCampaigns = [
        ...allCampaigns,
        campaign
    ];

    localStorage.setItem("campaigns", JSON.stringify(newCampaigns));

    return campaign;
}

//
export const getCampaign = async (id: string): Promise<Campaign> =>{
    const allCampaigns=getCampaigns();

    const campaign=(await allCampaigns).find((campaign)=>campaign.id===id)

    return(
        campaign as Campaign
    )
}

//Needed in order for campaignList and findCampaign to work correctly.
export const getCampaigns = async ():Promise<Array<Campaign>>=>{
    const allCampaignsString = localStorage.getItem("campaigns");

    const allCampaigns = allCampaignsString == null ? [] : JSON.parse(allCampaignsString) as Campaign[];

    return allCampaigns;
}

export const saveCampaign = async (campaignId:string): Promise<Campaign> =>{
    const allCampaigns=getCampaigns();

    const savedCampaign=getCampaign(campaignId);

    const savingCampaign = [
        ...await allCampaigns,
        savedCampaign
    ];

    localStorage.setItem("campaigns", JSON.stringify(savingCampaign));

    return(savedCampaign)

}

//NPC Section

//What this should do is create a new NPC, combine it with the NPC array of a campaign, then use an updateNPCs method to update/save that array in the campaign.
export const createNPC = async (npc: NPC, id:string): Promise<NPC> => {
    const campaign = await getCampaign(id)

    npc={
        ...npc,
        id:uuid()
    };

    const currentNPCS=getNPCs(id)
    const newNPC=[npc]

    const npcs=(await currentNPCS).concat(newNPC)

    saveCampaign(id)

    console.log(campaign?.npcs)

    return npcs;
}

//This is needed for both the NPCList component as well as the createNPC method above.
export const getNPCs = async (campaignId:string): Promise<Array<NPC>>=>{
    const campaign =  await getCampaign(campaignId)
    return  campaign.npcs as Array<NPC>;
}

export const updateNPCs = async (campaign:Campaign): Promise<Array<NPC>>=>{



}