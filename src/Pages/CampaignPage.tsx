import HomeButton from "../components/HomeButton"
import '../CSS Modules/Campaign.Module.css'

//This is going to be the default campaign dashboard. Hard-code the details for now as you get the UI figured out.

function CampaignPage(){
    return(
        <main>
            <div className="topbar">Top Bar</div>
            <div className="ContentBulk">
                <div id="Sidebar">SideBar</div>
                <div id="CardPanel">CardPanel
                    <div className="Card">Card</div>
                    <div className="Card">Card</div>
                    <div className="Card">Card</div>
                </div>
                <div id="Calendar">Calendar</div>
            </div>
            <div className="Bottombar">Bottombar</div>
            <HomeButton/>
        </main>








    )
}

export default CampaignPage