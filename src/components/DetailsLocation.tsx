import { Location } from "../types/Location";
import styles from "../css_modules/display.module.css";



type LocationProps = {
    location:Location;
}

function LocationDetails (props:LocationProps){
    return(
        <div>
            <div className={styles.top}>
                <h2>{props.location.name}</h2>
                <h3>{props.location.description}</h3>
            </div>
            <textarea />
        </div>
    )
}

export default LocationDetails;