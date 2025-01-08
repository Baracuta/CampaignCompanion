import { NPC } from "../types/NPC";
import styles from "../css_modules/display.module.css";



type NPCProps = {
    npc:NPC;
}

function NPCDetails (props:NPCProps){
    return(
        <main>
            <div className={styles.top}>
            <h2>{props.npc.name}</h2>
            <h3>{props.npc.description}</h3>
            </div>
            <textarea />
        </main>
    )
}

export default NPCDetails;