import styles from '../css_modules/card.module.css'
import { Campaign } from "../types/Campaign";
import { useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import { getCampaign } from "../services/CampaignService";
import NavButton from "../components/NavButton";



function CampaignNPCs(){
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

            <div className={styles.top_bar}>CampaignNPCs
                <NavButton text="Go Back" destination={`/campaign/${campaign?.id}`}/>
            </div>

            <div className={styles.tool_bar}>

            </div>

            <div className={styles.card_panel}>

            </div>

        </main>
    )
}

export default CampaignNPCs