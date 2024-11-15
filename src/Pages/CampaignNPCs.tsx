import { Campaign } from "../types/Campaign";
import { useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import { getCampaign } from "../services/CampaignService";
import NavButton from "../components/NavButton";



function CampaignNPCs(){
    const {id}=useParams();

    const [campaign, setCampaign] = useState<Campaign>();

    useEffect(()=>{
        getCampaign (id as string).then((campaign)=>{
            setCampaign(campaign);
        })
    }, [id]);

    console.log(campaign);


    return(
        
        <div>CampaignNPCs
            <NavButton text="Go Back" destination={`/campaign/${campaign?.id}`}/>
        </div>
        
    )
}

export default CampaignNPCs