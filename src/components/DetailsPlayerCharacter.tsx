import { PlayerCharacter } from "../types/PlayerCharacter";
import styles from "../css_modules/display.module.css";



type PCProps = {
    pc:PlayerCharacter;
}

function PlayerCharacterDetails (props:PCProps){
    return(
        <div className={styles.details_division}>
            <div className={styles.details_top}>
                <h2>{props.pc.name}</h2>
                <h3>{props.pc.description}</h3>
                <h5>Player Name:{props.pc.playerName}</h5>
                <h5>Class:{props.pc.pcClass}</h5>
                <h5>Level:{props.pc.level}</h5>
                <pre className={styles.notes}>{props.pc.notes}</pre>
            </div>
            <div className={styles.details_bottom}>
                <img
                    src={props.pc.image}
                />
            </div>
        </div>
    )
}

export default PlayerCharacterDetails;