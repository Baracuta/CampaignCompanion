import NavButton from "../components/NavButton"
import { useState } from "react"
import { Campaign } from "../types/Campaign"
import TopBar from "../components/TopBar"
import { ASSETS_PATH } from "../constants/assets_path"
import { deleteCampaign, deleteNPC, getCampaign } from "../services/CampaignService"
import TestDisplay from "../components/TestDisplay"

//This is a page used for testing purposes.
function TestPage(){
    const [campaign, setCampaign]=useState<Partial<Campaign>>({})

    return(
         
        <div>
            <TopBar buttonNav="" name="Tater Tots" game="Huh" image={`${ASSETS_PATH}/Emblem 1 3.png`}/>

            <h1>Testing!</h1>
            <NavButton text="Go Home" destination="/"/>
            <NavButton text="Campaign List" destination="/campaign-form"/>

            <input
            type="text"
            value={campaign.id}
            onChange={e=> {
                const id=e.target.value;
                deleteCampaign(id)
            }}></input>

            {/* <input
            type="text"
            value={""}
            onChange={e=> {
                const id=e.target.value;
                deleteNPC(campaign.id,id)
            }}></input> */}
            <TestDisplay/>
        </div>
    )
}

export default TestPage