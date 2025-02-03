import { Location } from "../types/Location";
import styles from "../css_modules/display.module.css";
import MapList from "./MapList";
import BigImage from "./BigImage";

type LocationProps = {
  location: Location;
};

function LocationDetails(props: LocationProps) {
  return (
    <div className={styles.details_division}>
      <div className={styles.details_top}>
        <BigImage item={props.location.image as string}/>
        <div className={styles.info}>
          <h2>{props.location.name}</h2>
          <h3>{props.location.description}</h3>
        </div>
      </div>
      <div className={styles.details_bottom}>
        <pre className={styles.notes}>{props.location.notes}</pre>
        <MapList images={props.location.maps as Array<string>}/>
      </div>
    </div>
  );
}
export default LocationDetails;
