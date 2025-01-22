import { NPC } from "../types/NPC";
import styles from "../css_modules/display.module.css";
import StandardImageList from "./ImageList";
import { NpcImageData } from "../constants/npc_image_bank";



type NPCProps = {
    npc:NPC;
}

function NPCDetails (props:NPCProps){
    return(
        <div className={styles.division}>
            <div className={styles.top}>
                <h2>{props.npc.name}</h2>
                <h3>{props.npc.description}</h3>
                <pre className={styles.notes}>{props.npc.notes}</pre>
            </div>
            <div className={styles.bottom}>
                <img src={props.npc.image}/>
                <StandardImageList images={NpcImageData}/>
            </div>
        </div>
    )
}

export default NPCDetails;