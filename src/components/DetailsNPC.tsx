import { NPC } from "../types/NPC";
import styles from "../css_modules/display.module.css";
import StandardImageList from "./ImageList";
import { NpcImageData } from "../constants/npc_image_bank";



type NPCProps = {
    npc:NPC;
}

function NPCDetails (props:NPCProps){
    return(
        <div>
            <div className={styles.top}>
                <h2>{props.npc.name}</h2>
                <h3>{props.npc.description}</h3>
            </div>
            <div className={styles.bottom}>
                <pre className={styles.notes}>{props.npc.notes}</pre>
                <StandardImageList images={NpcImageData}/>
            </div>
        </div>
    )
}

export default NPCDetails;