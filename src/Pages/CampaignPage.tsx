import NavButton from "../components/NavButton"
import styles from '../css_modules/campaign.module.css'
import Card from "../components/Card"
import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import { Campaign } from "../types/Campaign";
import { getCampaign } from "../services/CampaignService";
import { ASSETS_PATH } from "../constants/assets_path";


//This is going to be the default campaign dashboard. Hard-code the details for now as you get the UI figured out.

function CampaignPage(){
    const {id}=useParams();

    const [campaign, setCampaign] = useState<Campaign>();

    useEffect(()=>{
        getCampaign (id as string).then((campaign)=>{
            setCampaign(campaign);
        })
    }, [id]);

    console.log(campaign);

    return(
        <main className={styles.main}>

            <div className={styles.top_bar}>

                <img src={`${ASSETS_PATH}/Emblem 1 3.png`}/>

                <h2>{campaign?.name}</h2>

                <NavButton text="Go Back" destination="/campaign-form"/>

            </div>

            <div className={styles.tool_bar}>Tool Bar</div>

            <div className={styles.card_panel}>

                <Card className={styles.card} name="Non-Player Characters">
                    Placeholder for eventListener, ditto for all Cards
                </Card>                

                <Card className={styles.card} name="Locations">
                    
                </Card>
                
                <Card className={styles.card} name="Items" background={"src/assets/Tavern.jpg"}>

                </Card>

                <Card className={styles.card} name="Player Characters">

                </Card>
                
            </div>
            
            <div className={styles.bottom_bar}>Bottombar</div>

        </main>








    )
}

export default CampaignPage