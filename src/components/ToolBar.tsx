import styles from "../css_modules/toolbar.module.css";
import { Entity } from "../types/Entity";
import AvatarList from "./AvatarList";
import SearchBar from "./SearchBar";

type BarProps = {
  campaignEntities: Array<Entity>;
};

function ToolBar(props: BarProps) {
  return (
    <div className={styles.tool_bar}>
      <div className={styles.quick_access}>
        <h4>Favourites:</h4>
        <AvatarList
          things={props.campaignEntities?.filter(
            (item) => item.isFavourite == true
          )}
        />
      </div>

      <div className={styles.recent_edits}>
        <h4>Recent Edits:</h4>
        <AvatarList
          things={props.campaignEntities?.sort(
            (a: Entity, b: Entity) => b.modifiedDate - a.modifiedDate
          )}
        />
      </div>

      <div className={styles.search_bar}>
        <h4>Search Bar:</h4>
        <SearchBar EntityList={props.campaignEntities}/>
      </div>
    </div>
  );
}

export default ToolBar;
