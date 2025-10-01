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
          <div className={styles.sub_container}>
            <h5>| Player Name: {props.pc.player_name} |</h5>
            <h5>| Class: {props.pc.pc_class} |</h5>
            <h5>| Level: {props.pc.level} |</h5>
          </div>
        </div>
      </div>
      <div className={styles.details_bottom}>
        <pre className={styles.notes}>{props.pc.notes}</pre>
      </div>
    </div>
  );
}

export default PlayerCharacterDetails;
