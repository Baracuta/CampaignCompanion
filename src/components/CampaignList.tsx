import { getCampaigns,getCampaign } from "../services/CampaignService";
import { Campaign } from "../types/Campaign";
import { useState,useEffect } from "react";

//The component that creates a div for each campaign in the array of getCampaigns

function CampaignList(){
    const list=getCampaigns()

    console.log(list)

    for (let index = 0; index < list.length; index++) {
        // const [campaign, setCampaign] = useState<Campaign>();

        // useEffect(()=>{
        //     getCampaign (list.findid as string)).then((campaign)=>{
        //         setCampaign(campaign);
        //     })
        // }, [id]);
        return(

        )
        
    }
}