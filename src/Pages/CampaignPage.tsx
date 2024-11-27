import NavButton from "../components/NavButton"
import styles from '../css_modules/campaign.module.css'
import Card from "../components/Card"
import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import { Campaign } from "../types/Campaign";
import { getCampaign } from "../services/CampaignService";
import { ASSETS_PATH } from "../constants/assets_path";
import TopBar from "../components/TopBar";
import ToolBar from "../components/ToolBar";


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

            <TopBar name={campaign?.name} game={campaign?.game} buttonNav="/campaign-select" image={`${ASSETS_PATH}/Emblem 1 3.png`}/>


            <ToolBar/>


            <div className={styles.card_panel}>

                <Card name="Non-Player Characters" cardLink={`/campaign/${campaign?.id}/NPCs`}>
                </Card>                

                <Card name="Locations" cardLink={`/campaign/${campaign?.id}/Locations`}>
                </Card>
                
                <Card name="Items" cardLink={`/campaign/${campaign?.id}/Items`}>
                </Card>

                <Card name="Player Characters" cardLink={`/campaign/${campaign?.id}/PlayerCharacters`}>
                </Card>
                
            </div>
            
            <div className={styles.bottom_bar}>
                <NavButton text="Go Back" destination="/campaign-select"/>
                </div>

        </main>








    )
}

export default CampaignPage

//Extra notes and stuff below

//1. All card tool bars should include the 3 cards most recently accessed/editted, a searchbar for cards based on card name, and a means of unlocking/locking card position so that they can be re-ordered.
//2. Dashboard tool bar should have a spot to save links to specific cards as a way of quickly accessing them. For example, if the user knows their players will be going into a certain town next session, they can save that town's important NPCs into the tool bar.
