import { getCampaigns} from "../services/CampaignService";
import Card from "./Card";
import styles from '../css_modules/select.module.css'

//The component that creates a div for each campaign in the array of getCampaigns

//Off the top of my head, I'll probably have to make a const that has a box, and the for loop creates a new element then appends it to the box. Then, I only return the single box with the
//other stuff inside of it.
function CampaignList(){
    const list=getCampaigns();
    const divs=list.map((datum)=>
    <Card
    name={datum.name}
    cardLink={`/campaign/${datum.id}`}>
    </Card>);


    return divs
};

export default CampaignList