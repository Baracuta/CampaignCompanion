import styles from '../css_modules/cardpage.module.css'
import { Campaign } from "../types/Campaign";
import { useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import { getCampaign } from "../services/CampaignService";
import TopBar from '../components/TopBar';
import Card from '../components/Card';
import { ASSETS_PATH } from '../constants/assets_path';
import CardPanel from '../components/CardPanel';
import ToolBar from '../components/ToolBar';


function CampaignItems(){
    const {id}=useParams();

    const [campaign, setCampaign] = useState<Campaign>();

    useEffect(()=>{
        getCampaign (id as string).then((campaign)=>{
            setCampaign(campaign);
        })
    }, [id]);

    console.log(campaign);



    return(
        
        <main className={styles.main} style={{backgroundImage:`url(${(ASSETS_PATH)}/fantasy_loot.webp)`}}>

            <div className={styles.bars}>

            <TopBar name='Items' image={`${ASSETS_PATH}/Emblem 1 3.png`} buttonNav={`/campaign/${campaign?.id}`}/>


                <ToolBar/>


            </div>

            <CardPanel>
                
            </CardPanel>

        </main>

    )
}

export default CampaignItems