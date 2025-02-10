import { PlayerCharacter } from "../types/PlayerCharacter";
import styles from "../css_modules/display.module.css";
import BigImage from "./BigImage";

type PCProps = {
  pc: PlayerCharacter;
};

function PlayerCharacterDetails(props: PCProps) {
  return (
    <div className={styles.details_division}>
      <div className={styles.details_top}>
        {props.pc.image == null ? null : <BigImage src={props.pc.image} />}
        <div className={styles.info}>
          <h2>{props.pc.name}</h2>
          <h3>{props.pc.description}</h3>
          <h5>Player Name:{props.pc.playerName}</h5>
          <h5>Class:{props.pc.pcClass}</h5>
          <h5>Level:{props.pc.level}</h5>
        </div>
      </div>
      <div className={styles.details_bottom}>
        <pre className={styles.notes}>{props.pc.notes}</pre>
      </div>
    </div>
  );
}

export default PlayerCharacterDetails;
