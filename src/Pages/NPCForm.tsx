import { useState } from "react"
import { NPC } from "../types/NPC"
import { createNPC } from "../services/CampaignService"
import styles from '../css_modules/addnpc.module.css'



//Set it up to have a similar style to a card, but with unique properties
function NPCForm(){
    const [npc, setNpc]=useState<Partial<NPC>>({})


    return(

        <div className={styles.add_npc}>

            <h3> Name this NPC</h3>

            <input
            type="text"
            value={npc.name}
            onChange={e=>{
                const name=e.target.value;
                setNpc({...npc, name});
            }}
            />

            <h3> Describe this NPC</h3>

            <textarea
            value={npc.description}
            onChange={e=>{
                const description=e.target.value;
                setNpc({...npc, description});
            }}
            />

            <button onClick={async () =>{
                const savedNPC=await createNPC(npc as NPC);
            }}>Create NPC</button>

        </div>
    )
}

export default NPCForm