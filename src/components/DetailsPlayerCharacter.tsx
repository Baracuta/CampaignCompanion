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
            <textarea />
        </div>
    )
}

export default PlayerCharacterDetails;