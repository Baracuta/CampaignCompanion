import styles from "../css_modules/cardpage.module.css";
import { useParams } from "react-router-dom";
import TopBar from "../components/TopBar";
import { ASSETS_PATH } from "../constants/assets_path";
import CardPanel from "../components/CardPanel";
import ToolBar from "../components/ToolBar";
import { useCampaign } from "../hooks/useCampaign";
import ThingList from "../components/ThingList";
import AddItem from "../components/AddItem";
import { Item } from "../types/Item";
import { createItem, getItem } from "../services/CampaignServiceFrontend";
import { NPC } from "../types/NPC";
import { PC } from "../types/PlayerCharacter";
import { Location } from "../types/Location";
import EntityList from "../utilities/Entities";
import { del } from "../services/ImageService";
import { deleteThing, updateThing } from "../components/ThingUpdater";
import { Entity } from "../types/Entity";

function CampaignItems() {
  const { id } = useParams();

  const {campaign,refreshCampaign} = useCampaign(id as string);

  return (
    <main
      className={styles.main}
      style={{ backgroundImage: `url(${ASSETS_PATH}/fantasy_loot.webp)` }}
    >
      <div className={styles.bars}>
        <TopBar
          name="Items"
          image={`${ASSETS_PATH}/Emblem 1 3.png`}
          buttonNav={`/campaign/${campaign?.id}`}
        />

        <ToolBar
          campaignEntities={EntityList(campaign)}
          campaign={campaign}
          delete={async (id: string, thing: Entity) => {
            await deleteThing(id, thing);
            await refreshCampaign();
          }}
          update={async (id: string, thing: Entity) => {
            await updateThing(id, thing);
            await refreshCampaign();
          }}
        />
      </div>

      <CardPanel>
        <AddItem
          campaignId={id as string}
          addThing={async (id:string, item:Item) => {
            await createItem(item,id);
            await refreshCampaign();
            return item;
          }}
        />
        <ThingList
          things={campaign?.items as Array<Item>}
          campaign={campaign}
          deleteThing={async (id:string,item:Entity) => {
            const itemImage= (await getItem(id,item.id)).image;
            await deleteThing(id,item);
            if (itemImage != null){
              await del(itemImage)
            }
            await refreshCampaign();
            return Array<Item>;
          }}
          updateThing={async (id: string, thing:NPC|Location|Item|PC) => {
            await updateThing(id,thing as Item);
            await refreshCampaign();
            return thing;
          }}
        />
      </CardPanel>
    </main>
  );
}

export default CampaignItems;
