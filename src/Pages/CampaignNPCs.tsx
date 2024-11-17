import styles from '../css_modules/card.module.css'
import { Campaign } from "../types/Campaign";
import Card from '../components/Card';
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

            <div className={styles.bars}>

                <div className={styles.top_bar}>CampaignNPCs
                    <NavButton text="Go Back" destination={`/campaign/${campaign?.id}`}/>
                </div>

                <div className={styles.tool_bar}>

                    <div className={styles.recent_edits}>
                        <h4>Recent Edits:</h4>
                    </div>

                    <div className={styles.search_bar}>
                        <h4>Search Bar:</h4>
                    </div>


                </div>

            </div>

            <div className={styles.card_panel}>

            <Card className={styles.card} name="Card 1" cardLink=""/>
            <Card className={styles.card} name="Card 2" cardLink=""/>
            <Card className={styles.card} name="Card 3" cardLink=""/>
            <Card className={styles.card} name="Card 4" cardLink=""/>
            <Card className={styles.card} name="Card 5" cardLink=""/>
            <Card className={styles.card} name="Card 6" cardLink=""/>
            <Card className={styles.card} name="Card 7" cardLink=""/>
            <Card className={styles.card} name="Card 8" cardLink=""/>
            <Card className={styles.card} name="Card 9" cardLink=""/>
            <Card className={styles.card} name="Card 10" cardLink=""/>
            <Card className={styles.card} name="Card 11" cardLink=""/>
            <Card className={styles.card} name="Card 12" cardLink=""/>
            </div>

        </main>
    )
}

export default CampaignNPCs