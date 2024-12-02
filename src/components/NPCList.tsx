import Card from "./Card";
import { getNPCs } from "../services/CampaignService";


function NPCList(){
    const list=getNPCs();

    const divs=list.map((datum)=>

    <Card
    name={datum.name}
    cardLink={``}>
    </Card>);

    return divs
};

export default NPCList