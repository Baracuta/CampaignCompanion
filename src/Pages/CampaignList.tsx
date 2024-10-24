import { useNavigate } from "react-router-dom"
import HomeButton from "../components/HomeButton"

//This page will list out all of the user's created campaigns
function CampaignList(){
    const navigate=useNavigate();
    return(
        <main>

            <div>
                <HomeButton/>
                <button onClick={()=>navigate("/campaign/:id")}>Campaign Page</button>
            </div>
            <div>This will be where the campaign creation form goes</div>
        </main>
    )
}

export default CampaignList