import Card from "./Card";
import { getNPCs } from "../services/CampaignService";
import { useState, useEffect } from "react";
import { NPC } from "../types/NPC";


type listProps={
    campaignId:string;
}

function NPCList (props:listProps){
    const list= getNPCs(props.campaignId);

    const [npcs, setNPCs] = useState<Array<NPC>>();

    useEffect(()=>{
        getNPCs(props.campaignId).then((npcs)=>{
            setNPCs(npcs);
        })
    }, [npcs])

    const divs=npcs.map((datum)=>

    <Card
    name={datum.name}
    cardLink={``}>
    </Card>);

    return (divs)
};

export default NPCList