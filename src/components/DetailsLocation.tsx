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
            <div className={styles.bottom}>
                <textarea/>
                <div className={styles.placeholder}/>
            </div>
        </div>
    )
}
//The placeholder div will be a spot where maps/images can be uploaded in a gallery for viewing convenience
export default LocationDetails;