import { getCampaigns,getCampaign } from "../services/CampaignService";
import { Campaign } from "../types/Campaign";
import { useState,useEffect, createElement } from "react";

//The component that creates a div for each campaign in the array of getCampaigns

//Off the top of my head, I'll probably have to make a const that has a box, and the for loop creates a new element then appends it to the box. Then, I only return the single box with the
//other stuff inside of it.
function CampaignList(){
    const list=getCampaigns();
    var divs=createElement(`div`)

    for (let i = 0; i < list.length; i++) {
        let item=list[i]
        console.log(item.name)
        const test=createElement(`h3`,null,item.name)
        divs.appendChild(test);
        return(
            test)
    };
};

export default CampaignList