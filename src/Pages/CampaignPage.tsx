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

                <div className={styles.title_box}>
                    <h2>{campaign?.name}</h2>
                    <h3>Will be campaign.game</h3>
                </div>

                <div className={styles.dashboard_menu}>
                    Dropdown menu probably
                </div>

            </div>

            <div className={styles.tool_bar}>Tool Bar</div>

            <div className={styles.card_panel}>

                <Card className={styles.card} name="Non-Player Characters" cardLink={`/campaign/${campaign?.id}/NPCs`}>
                
                </Card>                

                <Card className={styles.card} name="Locations" cardLink={`/campaign/${campaign?.id}/Locations`} background={`${ASSETS_PATH}/Tavern.jpg`}>
                    
                </Card>
                
                <Card className={styles.card} name="Items" cardLink={`/campaign/${campaign?.id}/Items`}>

                </Card>

                <Card className={styles.card} name="Player Characters" cardLink={`/campaign/${campaign?.id}/PlayerCharacters`}>

                </Card>
                
            </div>
            
            <div className={styles.bottom_bar}>
                <NavButton text="Go Back" destination="/campaign-form"/>
                </div>

        </main>








    )
}

export default CampaignPage