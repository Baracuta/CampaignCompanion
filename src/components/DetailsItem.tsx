import { Item } from "../types/Item";
import styles from "../css_modules/display.module.css";



type ItemProps = {
    item:Item;
}

function ItemDetails (props:ItemProps){
    return(
        <div className={styles.details_division}>
            <div className={styles.details_top}>
                <img
                    src={props.item.image}
                />
                <div className={styles.info}>
                    <h2>{props.item.name}</h2>
                    <h3>{props.item.description}</h3>
                    <h5>Category:{props.item.category}</h5>
                    <h5>Effect:{props.item.effect}</h5>
                </div>
            </div>
            <div className={styles.details_bottom}>
                <pre className={styles.notes}>{props.item.notes}</pre>
            </div>
        </div>
    )
}

export default ItemDetails;