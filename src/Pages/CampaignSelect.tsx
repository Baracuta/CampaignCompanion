import styles from '../css_modules/select.module.css'
import NavButton from "../components/NavButton"
import { getCampaigns } from "../services/CampaignService"



function CampaignSelect(){

    return(

        <main className={styles.main}>

            <div>
                Campaign Selection Screen
            </div>

            <NavButton text="Return to Splash Screen" destination="/"/>

            <button onClick={getCampaigns}>Get Campaigns</button>

        </main>

    )
}

export default CampaignSelect