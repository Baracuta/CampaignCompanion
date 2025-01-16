import { PlayerCharacter } from "../types/PlayerCharacter";
import styles from "../css_modules/display.module.css";



type PCProps = {
    pc:PlayerCharacter;
}

function PlayerCharacterDetails (props:PCProps){
    return(
        <div>
            <div className={styles.top}>
                <h2>{props.pc.name}</h2>
                <h3>{props.pc.description}</h3>
            </div>
            <div className={styles.bottom}>
                <h5>Player Name:{props.pc.playerName}</h5>
                <h5>Class:{props.pc.pcClass}</h5>
                <h5>Level:{props.pc.level}</h5>
                <pre className={styles.notes}>{props.pc.notes}</pre>
            </div>
        </div>
    )
}

export default PlayerCharacterDetails;