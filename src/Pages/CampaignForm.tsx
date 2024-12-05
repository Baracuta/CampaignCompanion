import NavButton from "../components/NavButton";
import styles from "../css_modules/form.module.css";
import { useState } from "react";
import { Campaign } from "../types/Campaign";
import { useNavigate } from "react-router-dom";
import { createCampaign } from "../services/CampaignService";
import { Autocomplete, TextField } from "@mui/material";

//This page is for the campaign creation form
function CampaignForm(){
    const [campaign, setCampaign]=useState<Partial<Campaign>>({});
    //This will just let me control things when the page is in the process of saving information. For progress wheels, etc
    const [saving, setSaving]=useState(false);
    const navigate = useNavigate();

    const gameOptions=[`D&D 1e`,`AD&D`,`D&D 3e`,`D&D 3.5e`,`D&D 4e`,`D&D 5e`,
        `Pathfinder 1e`,`Pathfinder 2e`,`Starfinder`,
        `Call of Cthulu`,`Pulp Cthulu`,
    ]

    
    let check = true
    if (campaign.game=undefined,campaign.name=undefined,campaign.players=undefined){
        check = true}
    else{
        check = false}
    

    return(
        <main className={styles.main}>

            <div>
                <NavButton text="Home" destination="/"/>
                <NavButton text="Campaign Page" destination="/campaign/:id"/>

            </div>

            <div className={styles.form_body}>

                <div id={styles.section1}>

                    <h3>What game system does this campaign use?</h3>

                    <Autocomplete
                    className={styles.Autocomplete}
                    freeSolo
                    options={gameOptions}
                    value={campaign.game ?? ""}
                    onChange={(e,value)=>{
                        const game=value ?? undefined;
                        setCampaign({...campaign, game})
                    }}
                    renderInput={(params)=><TextField{...params} label="Game System"/>}
                    />

                    

                </div>


                <div id={styles.section2}>

                    <h3>What would you like to name this campaign?</h3>

                    <input
                    type="text"
                    value={campaign.name ?? ""}
                    onChange={e => {
                        const name=e.target.value;
                        setCampaign({...campaign, name});
                    }}
                    />

                </div>

                <div id={styles.section3}>

                    <h3>How many players are in this campaign?</h3>

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

                <button disabled={check} onClick={async () =>{
                    setSaving(true);
                    const savedCampaign=await createCampaign(campaign as Campaign);
                    navigate(`/campaign/${savedCampaign.id}`);
                }}>Create Campaign</button>

            </div>


        </main>
    )
}

export default CampaignForm