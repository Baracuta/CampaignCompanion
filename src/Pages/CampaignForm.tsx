import NavButton from "../components/NavButton";
import styles from "../css_modules/form.module.css";
import { useState } from "react";
import { Campaign } from "../types/Campaign";

//This page is for the campaign creation form
function CampaignForm(){
    const [campaign, setCampaign]=useState<Partial<Campaign>>({});

    const [id, setId]=useState("0");
    const [name, setName]=useState("Test Campaign");
    const [game, setGame]=useState("Pathfinder");
    const [players, setPlayers]=useState("0")

    const campaignTest: Campaign={
        id:(id),
        name:(name),
        game:(game)
    }
    


    return(
        <main>

            <div>
                <NavButton text="Home" destination="/"/>
            </div>

            <div className={styles.form_body}>

                <div id={styles.section1}>
                    <p>What game system does this campaign use?</p>

                    <input
                    type="text"
                    value={game}
                    onChange={e => setGame(e.target.value)}
                    />

                </div>

                <div id={styles.section2}>
                    <p>What would you like to name this campaign?</p>
                    <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    />
                    <p>{name}</p>
                </div>

                <div id={styles.section3}>
                    <p>How many players are in this campaign?</p>
                    <input
                    type="text"
                    value={players}
                    onChange={e => setPlayers(e.target.value)}/>
                </div>

                <button onClick={console.log}>Create Campaign</button>

                <NavButton text="Campaign Page" destination="/campaign/:id"/>

            </div>


        </main>
    )
}

export default CampaignForm