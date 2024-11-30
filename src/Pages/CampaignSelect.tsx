import styles from '../css_modules/select.module.css'
import NavButton from "../components/NavButton"
import CampaignList from '../components/CampaignList'



function CampaignSelect(){

    return(

        <main className={styles.main}>

            <div className={styles.top_bar}>

                <NavButton text="Return to Splash Screen" destination="/"/>

            </div>

            <div className={styles.card_panel}>
                <CampaignList/>
            </div>
            

        </main>

    )
}

export default CampaignSelect