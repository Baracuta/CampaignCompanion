import styles from "../css_modules/toolbar.module.css";
import { Campaign } from "../types/Campaign";
import { Entity } from "../types/Entity";
import { Item } from "../types/Item";
import { Location } from "../types/Location";
import { NPC } from "../types/NPC";
import { PC } from "../types/PlayerCharacter";
import AvatarList from "./AvatarList";
import SearchBar from "./SearchBar";

type BarProps = {
  campaignEntities: Array<Entity>;
  campaign: Campaign;
  delete: (campaign: string, thing: Entity) => Promise<unknown>;
  update: (campaign: string, thing: NPC | Location | Item | PC) => Promise<unknown>;
};

function ToolBar(props: BarProps) {
  return (
    <div className={styles.tool_bar}>
      <div className={styles.favourites}>
        <h4>Favourites:</h4>
        <AvatarList
          things={props.campaignEntities?.filter(
            (item) => item.isfavourite == true
          )}
          campaign={props.campaign}
          delete={props.delete}
          update={props.update}
        />
      </div>

      <div className={styles.recent_edits}>
        <h4>Recent Edits:</h4>
        <AvatarList
          things={props.campaignEntities?.sort(
            (a: Entity, b: Entity) => b.modifieddate - a.modifieddate
          )}
          campaign={props.campaign}
          delete={props.delete}
          update={props.update}
        />
      </div>

      <div className={styles.search_bar}>
        <h4>Search:</h4>
        <SearchBar
        EntityList={props.campaignEntities}
        campaign={props.campaign}
        delete={props.delete}
        update={props.update}
        />
      </div>
    </div>
  );
}

export default ToolBar;
