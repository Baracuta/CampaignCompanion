import NavButton from "../components/NavButton";
import styles from "../css_modules/form.module.css";
import { useState } from "react";
import { Campaign } from "../types/Campaign";

//This page is for the campaign creation form
function CampaignForm(){
    const [campaign, setCampaign]=useState<Partial<Campaign>>({});



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
                    type="text"
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
                    type="text"
                    value={campaign.players}
                    onChange={e => {
                        const players=e.target.value;
                        setCampaign({...campaign, players});
                    }}
                    />

                </div>

                <button onClick={console.log}>Create Campaign</button>

            </div>


        </main>
    )
}

export default CampaignForm