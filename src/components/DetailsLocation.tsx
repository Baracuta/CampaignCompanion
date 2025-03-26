import { Location } from "../types/Location";
import styles from "../css_modules/display.module.css";
import MapList from "./MapList";
import BigImage from "./BigImage";
import { useImage } from "../hooks/useImage";

type LocationProps = {
  location: Location;
};

function LocationDetails(props: LocationProps) {
  const image = useImage(props.location.image as string);
  
  return (
    <div className={styles.details_division}>
      <div className={styles.details_top}>
        {image == null ? null : <BigImage src={image} />}
        <div className={styles.info}>
          <h2>{props.location.name}</h2>
          <h3>{props.location.description}</h3>
        </div>
      </div>
      <div className={styles.details_bottom}>
        <pre className={styles.notes}>{props.location.notes}</pre>
        <MapList images={props.location.maps as Array<string>} deleteMap={undefined} />
      </div>
    </div>
  );
}
export default LocationDetails;
