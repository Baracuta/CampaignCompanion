import Card from "./Card";
import { getCampaign, getNPCs } from "../services/CampaignService";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Campaign } from "../types/Campaign";


function NPCList(){
    const {id}=useParams();

    const [campaign, setCampaign] = useState<Campaign>();

    useEffect(()=>{
        getCampaign (id as string).then((campaign)=>{
            setCampaign(campaign);
        })
    }, [id]);

    const list=getNPCs(id as string);

    const divs=list.map((datum)=>

    <Card
    name={datum.name}
    cardLink={``}>
    </Card>);

    return divs
};

export default NPCList