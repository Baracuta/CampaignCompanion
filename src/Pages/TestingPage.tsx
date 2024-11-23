import NavButton from "../components/NavButton"
import { findCampaign } from "../services/CampaignService"
import { useState } from "react"
import { Campaign } from "../types/Campaign"

//This is a page used for testing purposes.
function TestPage(){
    const [campaign, setCampaign]=useState<Partial<Campaign>>({})

    return((
        <div>

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
    ))
}

export default TestPage