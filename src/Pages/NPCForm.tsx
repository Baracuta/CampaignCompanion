import { useState } from "react"
import { NPC } from "../types/NPC"
import { createNPC } from "../services/CampaignService"
import styles from '../css_modules/addnpc.module.css'
import { useNavigate } from "react-router-dom"
import { getCampaign } from "../services/CampaignService"
import { Campaign } from "../types/Campaign"
import { useEffect } from "react"
import { useParams } from "react-router-dom"


//Set it up to have a similar style to a card, but with unique properties
function NPCForm(){
    const [npc, setNpc]=useState<Partial<NPC>>({})
    const navigate=useNavigate();

    const {id}=useParams();

    const [campaign, setCampaign] = useState<Campaign>();

    useEffect(()=>{
        getCampaign (id as string).then((campaign)=>{
            setCampaign(campaign);
        })
    }, [id]);


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
                navigate(`/campaign/${campaign?.id}/NPCs`)
            }}>Create NPC</button>

        </div>
    )
}

export default NPCForm