import { getCampaigns,getCampaign } from "../services/CampaignService";
import { Campaign } from "../types/Campaign";
import { useState,useEffect, createElement } from "react";

//The component that creates a div for each campaign in the array of getCampaigns

function CampaignList(){
    const list=getCampaigns();
    const divs=null;

    for (let i = 0; i < list.length; i++) {
        let item=list[i]
        console.log(item.name)

        return(createElement('h3',null,item.name))
    };
};

export default CampaignList