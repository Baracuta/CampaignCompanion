import { Campaign } from "../types/Campaign";

export const createCampaign = async (campaign: Campaign): Promise<Campaign> => {
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
export const getCampaign = async (id: string,name?:string): Promise<Campaign> =>{
    return {
        id,
        name,
        
    }
}

//export consts for getCampaigns and for updateCampaign to be made later

//Nonfunctional getCampaigns. Basically, I'm trying to use a for loop to track a variable that counts the total number of campaigns in local storage.
//This is so that, in the future, I may use this counter to make a display page from which a user may select to edit a pre-existing campaign.
export const getCampaigns =  ()=>{
    const allCampaignsString = localStorage.getItem("campaigns");
    const allCampaigns = allCampaignsString == null ? [] : JSON.parse(allCampaignsString);

    var n=0
    for (var i=0; i<allCampaigns.length; i++){
        n=n+1}
        console.log(n)
        
    return(
        n
    )


}