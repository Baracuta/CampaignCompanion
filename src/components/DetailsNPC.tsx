import { NPC } from "../types/NPC";
import styles from "../css_modules/display.module.css";



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
                <img
                    src={props.npc.image}
                    width={"auto"} height= {"max-content"}
                    />
            </div>
        </div>
    )
}

export default NPCDetails;