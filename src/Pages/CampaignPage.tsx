import NavButton from "../components/NavButton"
import styles from '../css_modules/campaign.module.css'

//This is going to be the default campaign dashboard. Hard-code the details for now as you get the UI figured out.

function CampaignPage(){
    return(
        <main>

            <div className={styles.top_bar}>Top Bar
                <NavButton text="Return Home" destination="/"/>
            </div>
            <div className={styles.recently_editted}>Recently Editted</div>
            <div className={styles.content_bulk}>
                <div className={styles.side_bar}>SideBar</div>
                <div className={styles.card_panel}>
                    <div className={styles.card} id="card1">Card</div>
                    <div className={styles.card} id="card2">Card</div>
                    <div className={styles.card} id="card3">Card</div>
                </div>
                <div className={styles.calendar}>Calendar</div>
            </div>
            <div className={styles.bottom_bar}>Bottombar</div>

        </main>








    )
}

export default CampaignPage