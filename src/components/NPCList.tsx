import Card from "./Card";
import { getNPCs } from "../services/CampaignService";
import { useState, useEffect } from "react";
import { NPC } from "../types/NPC";


type listProps={
    campaignId:string;
}

function NPCList (props:listProps){

    const [npcs, setNPCs] = useState<Array<NPC>>();

    useEffect(()=>{
        getNPCs(props.campaignId as string).then((npcs)=>{
            setNPCs(npcs);
        })
    }, [props.campaignId])

    const divs=((npcs as Array<NPC>) ?? []).map((datum)=>

    <Card
    name={datum.name}
    cardLink={``}
    key={datum.id}>
    </Card>);

    return (divs)
};

export default NPCList