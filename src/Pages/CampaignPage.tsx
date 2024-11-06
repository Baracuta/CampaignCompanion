import NavButton from "../components/NavButton"
import styles from '../css_modules/campaign.module.css'
import Card from "../components/Card"
import CampaignForm from "./CampaignForm"


//This is going to be the default campaign dashboard. Hard-code the details for now as you get the UI figured out.

function CampaignPage(){


    return(
        <main className={styles.main}>

            <div className={styles.top_bar}>

                <img src="src\assets\Emblem 1 3.png"/>

                <h1></h1>

                <NavButton text="Go Back" destination="/campaign-form"/>

            </div>

            <div className={styles.tool_bar}>Recently Editted</div>

            <div className={styles.card_panel}>

                <Card className={styles.card} name="Locations"/>                

                <Card className={styles.card} name="another one"/>
                
                <Card className={styles.card} name="hello ery noice" background={"src/assets/0x8vuwfue9391.webp"}/>
                
            </div>
            
            <div className={styles.bottom_bar}>Bottombar</div>

        </main>








    )
}

export default CampaignPage