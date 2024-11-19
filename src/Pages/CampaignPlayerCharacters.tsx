import styles from '../css_modules/card.module.css'
import { Campaign } from "../types/Campaign";
import { useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import { getCampaign } from "../services/CampaignService";
import NavButton from "../components/NavButton";
import Card from '../components/Card';
import { ASSETS_PATH } from '../constants/assets_path';


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
                        <h2>{campaign?.name}</h2>
                        <h3>Player Characters</h3>
                    </div>

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

                <div className={styles.big_card_panel}>

                <Card className={styles.big_card} name="Non-Player Characters" cardLink={`/campaign/${campaign?.id}/NPCs`}>
                
                </Card>                

                <Card className={styles.big_card} name="Locations" cardLink={`/campaign/${campaign?.id}/Locations`} background={`${ASSETS_PATH}/Emblem 1 3.png`}>
                    
                </Card>
                
                <Card className={styles.big_card} name="Items" cardLink={`/campaign/${campaign?.id}/Items`}>

                </Card>

                <Card className={styles.big_card} name="Player Characters" cardLink={`/campaign/${campaign?.id}/PlayerCharacters`}>

                </Card>
                
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
            <Card className={styles.card} name="Card 13" cardLink=""/>
            <Card className={styles.card} name="Card 14" cardLink=""/>
            <Card className={styles.card} name="Card 15" cardLink=""/>
            <Card className={styles.card} name="Card 16" cardLink=""/>
            </div>

        </main>

    )
}

export default CampaignPlayerCharacters