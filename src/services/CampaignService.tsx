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
    const allCampaigns=getCampaigns;
    const result=allCampaigns.filter((campaign: Campaign)=>campaign.id===id)

    console.log(result)
    return {
        id,
        
    }
}

//export consts for getCampaigns and for updateCampaign to be made later

//
export const getCampaigns =  (campaignArray:Array<Campaign>)=>{
    const allCampaignsString = localStorage.getItem("campaigns");
    const allCampaigns = allCampaignsString == null ? [] : JSON.parse(allCampaignsString) as Campaign[];

    let n=allCampaigns.length;
    console.log(n);

    return campaignArray;

}