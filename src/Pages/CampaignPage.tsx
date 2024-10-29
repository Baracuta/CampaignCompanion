import NavButton from "../components/NavButton"
import styles from '../css_modules/campaign.module.css'
import { useParams } from "react-router-dom";
import { Campaign } from "../components/Campaign";

//This is going to be the default campaign dashboard. Hard-code the details for now as you get the UI figured out.

function CampaignPage(){
    const params=useParams();

    const id=params.id;

    const campaign: Campaign={
        id:1234,
        name:"Ben's test campaign",
        game: "D&D"
    }





    return(
        <main className={styles.main}>

            <div className={styles.top_bar}>
                <img src="src/assets/dice-twenty-faces-twenty.png" alt="" />
                <h1>{campaign.name}</h1>
                <NavButton text="Go Back" destination="/campaign-form"/>
            </div>
            <div className={styles.recently_editted}>Recently Editted</div>
            <div className={styles.content_bulk}>
                <div className={styles.side_bar}>SideBar</div>
                <div className={styles.card_panel}>
                    <div className={styles.card}>Non-Player Characters</div>
                    <div className={styles.card}>Locations</div>
                    <div className={styles.card}>Items</div>
                </div>
                <div className={styles.calendar}>Calendar</div>
            </div>
            <div className={styles.bottom_bar}>Bottombar</div>

        </main>








    )
}

export default CampaignPage