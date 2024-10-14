import { useNavigate } from "react-router-dom"
import HomeButton from "../components/HomeButton"


function CampaignList(){
    const navigate=useNavigate();
    return(
        <main>

            <div>
                <HomeButton/>
                <button onClick={()=>navigate("/campaign-page")}>Campaign List</button>
            </div>

        </main>
    )
}

export default CampaignList