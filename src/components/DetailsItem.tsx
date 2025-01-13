import { Item } from "../types/Item";
import styles from "../css_modules/display.module.css";



type ItemProps = {
    item:Item;
}

function ItemDetails (props:ItemProps){
    return(
        <div>
            <div className={styles.top}>
                <h2>{props.item.name}</h2>
                <h3>{props.item.description}</h3>
            </div>
            <div className={styles.bottom}>
                <h5>Category:{props.item.category}</h5>
                <h5>Effect:{props.item.effect}</h5>
                <textarea/>
            </div>
        </div>
    )
}

export default ItemDetails;