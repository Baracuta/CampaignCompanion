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
        const test=createElement(`h3`,null,item.name)
        return(
            test)
        // let newBox=document.createElement("div");
        //     newBox.className="critterBox";
        // document.appendChild(newBox);
    };
};

export default CampaignList