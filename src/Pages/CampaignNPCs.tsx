import styles from '../css_modules/cardpage.module.css'
import { Campaign } from "../types/Campaign";
import { useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import { getCampaign } from "../services/CampaignService";
import { ASSETS_PATH } from '../constants/assets_path';
import CardPanel from '../components/CardPanel';
import ToolBar from '../components/ToolBar';
import TopBar from '../components/TopBar';
import AddThing from '../components/AddThing';
import NPCList from '../components/NPCList';



function CampaignNPCs(){
    const {id}=useParams();

    const [campaign, setCampaign] = useState<Campaign>();

    useEffect(()=>{
        getCampaign (id as string).then((campaign)=>{
            setCampaign(campaign);
        })
    },[id]);

    console.log(campaign);


    return(
        <main className={styles.main} style={{backgroundImage:`url(${(ASSETS_PATH)}/fantasy_npcs.jpg)`}}>

            <div className={styles.bars}>

                <TopBar name='Non-Player Characters' image={`${ASSETS_PATH}/Emblem 1 3.png`} buttonNav={`/campaign/${campaign?.id}`}/>

                <ToolBar/>

            </div>

            <CardPanel>
                <AddThing/>
                <NPCList campaignId={id as string}/>
                
            </CardPanel>

        </main>
    )
}

export default CampaignNPCs

