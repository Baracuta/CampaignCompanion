import styles from '../css_modules/cardpage.module.css'
import { Campaign } from "../types/Campaign";
import { useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import { getCampaign } from "../services/CampaignService";
import NavButton from "../components/NavButton";
import Card from '../components/Card';
import { ASSETS_PATH } from '../constants/assets_path';
import RecentEdits from '../components/RecentEdits';


function CampaignPlayerCharacters(){
    const {id}=useParams();

    const [campaign, setCampaign] = useState<Campaign>();

    useEffect(()=>{
        getCampaign (id as string).then((campaign)=>{
            setCampaign(campaign);
        })
    }, [id]);

    console.log(campaign);



    return(
        
        <main className={styles.main} style={{backgroundImage:`url(${(ASSETS_PATH)}/player_characters.jpg)`}}>

            <div className={styles.bars}>

                <div className={styles.top_bar}>

                    <img src={`${ASSETS_PATH}/Emblem 1 3.png`}/>

                    <div className={styles.title_box}>
                        <h3>Player Characters</h3>
                    </div>

                    <NavButton text="Go Back" destination={`/campaign/${campaign?.id}`}/>
                </div>

                <div className={styles.tool_bar}>

                    <RecentEdits/>

                    <div className={styles.search_bar}>
                        <h4>Search Bar:</h4>
                    </div>


                </div>


            </div>

            <div className={styles.card_panel}>

            <Card name="Card 1" cardLink=""/>

            </div>

        </main>

    )
}

export default CampaignPlayerCharacters