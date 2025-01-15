import { NPC } from "../types/NPC";
import styles from "../css_modules/display.module.css";



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
                <p className={styles.notes}>{props.npc.notes}</p>
                <img/>
            </div>
        </div>
    )
}

export default NPCDetails;