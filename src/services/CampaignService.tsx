import { Campaign } from "../types/Campaign";
import { v4 as uuid } from "uuid";
import { NPC } from "../types/NPC";
import { useEffect, useState } from "react";

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
    const campaign=allCampaigns.find((campaign)=>campaign.id===id)
    return(
        campaign as Campaign
    )
}

//Needed in order for campaignList and findCampaign to work correctly.
export const getCampaigns = ()=>{
    const allCampaignsString = localStorage.getItem("campaigns");
    const allCampaigns = allCampaignsString == null ? [] : JSON.parse(allCampaignsString) as Campaign[];

    return allCampaigns;
}


//NPC Section

export const createNPC = async (npc: NPC,id:string): Promise<NPC> => {
    npc={
        ...npc,
        id:uuid()
    };

    const [campaign, setCampaign] = useState<Partial<Campaign>>({});

    useEffect(()=>{
        getCampaign (id as string).then((campaign)=>{
            setCampaign(campaign);
        })
    }, [id]);

    const currentNPCs=campaign?.npcs as Array<NPC>;

    const npcs=[
        ...currentNPCs,
        npc
    ]

    setCampaign({...campaign, npcs});

    console.log(campaign.npcs)
    return npc;
}

export const getNPCs = async (id:string): Promise<Array<NPC>>=>{

    const campaign=await getCampaign(id)

    const allNPCs=campaign.npcs;

    return allNPCs ?? [];
}

// export const findNPC= async (id:string):Promise<NPC>=>{
//     const allNPCs=getNPCs();
//     const result=allNPCs.find((npc)=>npc.id===id)

//     console.log(result)
//     return {
//         id,
//         name:(result?.name)
//     }
// }