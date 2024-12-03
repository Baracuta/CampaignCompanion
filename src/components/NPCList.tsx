import Card from "./Card";
import { getNPCs } from "../services/CampaignService";


type listProps={
    campaignId:string;
}

function NPCList (props:listProps){
    const list=getNPCs(props.campaignId);

    const divs=list.map((datum)=>

    <Card
    name={datum.name}
    cardLink={``}>
    </Card>);

    return (divs)
};

export default NPCList