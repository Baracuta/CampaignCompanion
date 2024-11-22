import { getCampaigns,getCampaign } from "../services/CampaignService";
import { Campaign } from "../types/Campaign";
import { useState,useEffect, createElement } from "react";

//The component that creates a div for each campaign in the array of getCampaigns

function CampaignList(){
    const list=getCampaigns()
    

    console.log(list)

    for (let index = 0; index < list.length; index++) {
        console.log("hi")
        createElement(
            `div`,
            "Huh"
        )
    }
}

export default CampaignList