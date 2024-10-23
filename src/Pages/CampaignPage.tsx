import HomeButton from "../components/HomeButton"
import '../CSS Modules/Campaign.Module.css'

//This is going to be the default campaign dashboard. Hard-code the details for now as you get the UI figured out.

function CampaignPage(){
    return(
        <main>

            <div className="topbar">Top Bar
                <HomeButton/>
            </div>
            <div className="RecentlyEditted">RecentlyEditted</div>
            <div className="ContentBulk">
                <div id="Sidebar">SideBar</div>
                <div id="CardPanel">
                    <div className="Card" id="Card1">Card</div>
                    <div className="Card" id="Card2">Card</div>
                    <div className="Card" id ="Card3">Card</div>
                </div>
                <div className="Calendar">Calendar</div>
            </div>
            <div className="Bottombar">Bottombar</div>

        </main>








    )
}

export default CampaignPage