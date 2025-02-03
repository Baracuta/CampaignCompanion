import { NPC } from "../types/NPC";
import styles from "../css_modules/display.module.css";
import BigImage from "./BigImage";

type NPCProps = {
  npc: NPC;
};

function NPCDetails(props: NPCProps) {
  return (
    <div className={styles.details_division}>
      <div className={styles.details_top}>
        <BigImage src={props.npc.image as string} />
        <div className={styles.info}>
          <h2>{props.npc.name}</h2>
          <h3>{props.npc.description}</h3>
        </div>
      </div>
      <div className={styles.details_bottom}>
        <pre className={styles.notes}>{props.npc.notes}</pre>
      </div>
    </div>
  );
}

export default NPCDetails;
