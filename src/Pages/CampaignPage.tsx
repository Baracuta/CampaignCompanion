import NavButton from "../components/NavButton"
import styles from '../css_modules/campaign.module.css'

//This is going to be the default campaign dashboard. Hard-code the details for now as you get the UI figured out.

function CampaignPage(){
    return(
        <main>

            <div className={styles.top_bar}>Top Bar
                <NavButton text="Go Back" destination="/campaign-list"/>
            </div>
            <div className={styles.recently_editted}>Recently Editted</div>
            <div className={styles.content_bulk}>
                <div className={styles.side_bar}>SideBar</div>
                <div className={styles.card_panel}>
                    <div className={styles.card} id="card1">Non-Player Characters</div>
                    <div className={styles.card} id="card2">Locations</div>
                    <div className={styles.card} id="card3">Items</div>
                </div>
                <div className={styles.calendar}>Calendar</div>
            </div>
            <div className={styles.bottom_bar}>Bottombar</div>

        </main>








    )
}

export default CampaignPage