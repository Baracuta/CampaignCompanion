import Card from "./Card";
import { getNPCs } from "../services/CampaignService";
import { Campaign } from "../types/Campaign";


type listProps={
    list:Campaign;
}

function NPCList (props:listProps){
    const list=getNPCs(props.list);

    const divs=list.map((datum)=>

    <Card
    name={datum.name}
    cardLink={``}>
    </Card>);

    return (divs)
};

export default NPCList