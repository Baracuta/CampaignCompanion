import NavButton from "../components/NavButton"
import { findCampaign } from "../services/CampaignService"
import { useState } from "react"
import { Campaign } from "../types/Campaign"
import TopBar from "../components/TopBar"
import { ASSETS_PATH } from "../constants/assets_path"

//This is a page used for testing purposes.
function TestPage(){
    const [campaign, setCampaign]=useState<Partial<Campaign>>({})

    return(
         
        <div>
            <TopBar name="Tater Tots" game="Huh" image={`${ASSETS_PATH}/Emblem 1 3.png`}/>

            <h1>Testing!</h1>
            <NavButton text="Go Home" destination="/"/>
            <NavButton text="Campaign List" destination="/campaign-form"/>

            <input
            type="text"
            value={campaign.id}
            onChange={e=> {
                const id=e.target.value;
                findCampaign(id)
            }}></input>
        </div>
    )
}

export default TestPage