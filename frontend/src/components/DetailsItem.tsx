import { Item } from "../types/Item";
import styles from "../css_modules/display.module.css";
import BigImage from "./BigImage";
import { useImage } from "../hooks/useImage";

type ItemProps = {
  item: Item;
};

function ItemDetails(props: ItemProps) {
  const image = useImage(props.item.image as string);
  
  return (
    <div className={styles.details_division}>
      <div className={styles.details_top}>
        {image == null ? null : <BigImage src={image} />}
        <div className={styles.info}>
          <h2>{props.item.name}</h2>
          <h3>{props.item.description}</h3>
          <div className={styles.sub_container}>
            <h5>| Category: {props.item.category} |</h5>
            <h5>| Effect: {props.item.effect} |</h5>
          </div>
        </div>
      </div>
      <div className={styles.details_bottom}>
        <pre className={styles.notes}>{props.item.notes}</pre>
      </div>
    </div>
  );
}

export default ItemDetails;
