import styles from '../css_modules/cardpage.module.css'
import { Campaign } from "../types/Campaign";
import { useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import { getCampaign } from "../services/CampaignService";
import NavButton from "../components/NavButton";
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

                <div className={styles.top_bar}>

                    <img src={`${ASSETS_PATH}/Emblem 1 3.png`}/>

                    <div className={styles.title_box}>
                        <h3>Items</h3>
                    </div>

                    <NavButton text="Go Back" destination={`/campaign/${campaign?.id}`}/>
                </div>

                <ToolBar/>


            </div>

            <CardPanel>
                <Card name="Card 1" cardLink=""/>
                <Card name="Card 2" cardLink=""/>
                <Card name="Card 3" cardLink=""/>
                <Card name="Card 4" cardLink=""/>
                <Card name="Card 5" cardLink=""/>
                <Card name="Card 6" cardLink=""/>
                <Card name="Card 7" cardLink=""/>
                <Card name="Card 8" cardLink=""/>
                <Card name="Card 9" cardLink=""/>
                <Card name="Card 10" cardLink=""/>
                <Card name="Card 11" cardLink=""/>
                <Card name="Card 12" cardLink=""/>
                <Card name="Card 13" cardLink=""/>
                <Card name="Card 14" cardLink=""/>
                <Card name="Card 15" cardLink=""/>
                <Card name="Card 16" cardLink=""/>
            </CardPanel>

        </main>

    )
}

export default CampaignItems