import { Location } from "../types/Location";
import styles from "../css_modules/display.module.css";

type LocationProps = {
  location: Location;
};

function LocationDetails(props: LocationProps) {
  return (
    <div className={styles.details_division}>
      <div className={styles.details_top}>
        <img src={props.location.image} />
        <div className={styles.info}>
          <h2>{props.location.name}</h2>
          <h3>{props.location.description}</h3>
        </div>
      </div>
      <div className={styles.details_bottom}>
        <pre className={styles.notes}>{props.location.notes}</pre>
      </div>
    </div>
  );
}
export default LocationDetails;
