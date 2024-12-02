import { getCampaigns} from "../services/CampaignService";
import Card from "./Card";

//The component that creates a div for each campaign in the array of getCampaigns

function CampaignList(){
    const list=getCampaigns();
    const divs=list.map((datum)=>
    <Card
    name={datum.name}
    cardType="campaignCard"
    cardLink={`/campaign/${datum.id}`}>
    </Card>);


    return divs
};

export default CampaignList