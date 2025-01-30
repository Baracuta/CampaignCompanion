import { Location } from "../types/Location";
import styles from "../css_modules/display.module.css";




type LocationProps = {
    location:Location;
}

function LocationDetails (props:LocationProps){
    return(
        <div className={styles.division}>
            <div className={styles.top}>
                <h2>{props.location.name}</h2>
                <h3>{props.location.description}</h3>
                <pre className={styles.notes}>{props.location.notes}</pre>
            </div>
            <div className={styles.bottom}>
                <img src={props.location.image}/>
            </div>
        </div>
    )
}
//The placeholder div will be a spot where maps/images can be uploaded in a gallery for viewing convenience
export default LocationDetails;