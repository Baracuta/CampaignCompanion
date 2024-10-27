import NavButton from "../components/NavButton"
import styles from '../css_modules/campaign.module.css'

//This is going to be the default campaign dashboard. Hard-code the details for now as you get the UI figured out.

function CampaignPage(){
    return(
        <main>

            <div className={styles.top-bar}>Top Bar
                <NavButton text="Return Home" destination="/"/>
            </div>
            <div className="recently-editted">Recently Editted</div>
            <div className="content-bulk">
                <div id="side-bar">SideBar</div>
                <div id="card-panel">
                    <div className="card" id="card1">Card</div>
                    <div className="card" id="card2">Card</div>
                    <div className="card" id="card3">Card</div>
                </div>
                <div className="calendar">Calendar</div>
            </div>
            <div className="bottom-bar">Bottombar</div>

        </main>








    )
}

export default CampaignPage