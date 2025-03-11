import { PC } from "../types/PlayerCharacter";
import styles from "../css_modules/display.module.css";
import BigImage from "./BigImage";
import { useImage } from "../hooks/useImage";

type PCProps = {
  pc: PC;
};

function PlayerCharacterDetails(props: PCProps) {
  const image = useImage(props.pc.image as string);
  
  return (
    <div className={styles.details_division}>
      <div className={styles.details_top}>
        {image == null ? null : <BigImage src={image} />}
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
