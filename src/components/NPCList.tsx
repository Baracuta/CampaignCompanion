import Card from "./Card";
import { getNPCs } from "../services/CampaignService";


const NPCList =async(id:string)=>{
    const list=await getNPCs(id);

    const divs=list.map((datum)=>

    <Card
    name={datum.name}
    cardLink={``}>
    </Card>);

    return divs
};

export default NPCList