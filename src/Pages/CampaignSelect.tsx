import styles from '../css_modules/select.module.css'
import NavButton from "../components/NavButton"
import CampaignList from '../components/CampaignList'
import CardPanel from '../components/CardPanel'



function CampaignSelect(){

    return(

        <main className={styles.main}>

            <div className={styles.top_bar}>

                <NavButton text="Return to Splash Screen" destination="/"/>

            </div>

            <CardPanel>
                <CampaignList/>
            </CardPanel>
            

        </main>

    )
}

export default CampaignSelect