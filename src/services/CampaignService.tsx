import { Campaign } from "../types/Campaign";
import { v4 as uuid } from "uuid";

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
    return{
        id
    }
}

export const findCampaign= async (campaign:Campaign):Promise<Campaign>=>{
    const allCampaigns=(getCampaigns as unknown as Array<Campaign>);
    const result=allCampaigns.find((campaign: Campaign)=>campaign.id===id)

    console.log(result)
    return {
        id
        
    }
}


export const getCampaigns = ()=>{
    const allCampaignsString = localStorage.getItem("campaigns");
    const allCampaigns = allCampaignsString == null ? [] : JSON.parse(allCampaignsString) as Campaign[];

    return allCampaigns;
}