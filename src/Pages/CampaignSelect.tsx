import styles from '../css_modules/select.module.css'
import NavButton from "../components/NavButton"
import Card from '../components/Card'
import { getCampaigns } from "../services/CampaignService"
import CampaignList from '../components/CampaignList'



function CampaignSelect(){

    return(

        <main className={styles.main}>

            <div className={styles.top_bar}>

                <NavButton text="Return to Splash Screen" destination="/"/>

                <button onClick={getCampaigns}>Get Campaigns</button>
                <button onClick={CampaignList}>CampaignList</button>

                

            </div>

            <div className={styles.card_panel}>
                <Card className={styles.card} name="Campaign 1" cardLink='/campaign/:id'/>
            </div>
            

        </main>

    )
}

export default CampaignSelect