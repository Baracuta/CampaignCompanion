import NavButton from "../components/NavButton";
import styles from "../css_modules/form.module.css";
import { useState } from "react";
import { Campaign } from "../types/Campaign";
import { useNavigate } from "react-router-dom";
import { createCampaign } from "../services/CampaignService";
import { Autocomplete } from "@mui/material";

//This page is for the campaign creation form
function CampaignForm(){
    const [campaign, setCampaign]=useState<Partial<Campaign>>({});
    //This will just let me control things when the page is in the process of saving information. For progress wheels, etc
    const [saving, setSaving]=useState(false);
    const navigate = useNavigate();



    return(
        <main>

            <div>
                <NavButton text="Home" destination="/"/>
                <NavButton text="Campaign Page" destination="/campaign/:id"/>

            </div>

            <div className={styles.form_body}>

                <div id={styles.section1}>

                    <p>What game system does this campaign use?</p>

                    <input
                    type="string"
                    value={campaign.game}
                    onChange={e => {
                        const game=e.target.value;
                        setCampaign({...campaign, game});
                    }}
                    />

                </div>

                <div id={styles.section2}>

                    <p>What would you like to name this campaign?</p>

                    <input
                    type="text"
                    value={campaign.name}
                    onChange={e => {
                        const name=e.target.value;
                        setCampaign({...campaign, name});
                    }}
                    />

                    <p>{campaign.name}</p>

                </div>

                <div id={styles.section3}>

                    <p>How many players are in this campaign?</p>

                    <input
                    type="number"
                    value={campaign.players}
                    onChange={e => {
                        const players=Number(e.target.value);
                        setCampaign({...campaign, players});
                    }}
                    max={8} min={1}
                    />

                </div>

                <input
                    type="string"
                    value={campaign.id}
                    onChange={e => {
                        const id=e.target.value;
                        setCampaign({...campaign, id});
                    }}
                />

                <button onClick={async () =>{
                    setSaving(true);
                    const savedCampaign=await createCampaign(campaign as Campaign);
                    navigate(`/campaign/${savedCampaign.id}`);
                }}>Create Campaign</button>

            </div>


        </main>
    )
}

export default CampaignForm