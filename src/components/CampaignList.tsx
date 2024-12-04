import { useEffect, useState } from "react";
import { getCampaigns} from "../services/CampaignService";
import { Campaign } from "../types/Campaign";
import Card from "./Card";

//The component that creates a div for each campaign in the array of getCampaigns

function CampaignList(){

    const [campaigns, setCampaigns] = useState<Array<Campaign>>();

    useEffect(()=>{
        getCampaigns().then((campaigns)=>{
            setCampaigns(campaigns);
        })
    })

    const divs=((campaigns as Array<Campaign>) ?? []).map((datum)=>

    <Card
    name={datum.name}
    cardType="campaignCard"
    cardLink={`/campaign/${datum.id}`}
    key={datum.id}>
    </Card>);


    return divs
};

export default CampaignList