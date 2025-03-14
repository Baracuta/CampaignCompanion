import styles from "../css_modules/cardpage.module.css";
import { useParams } from "react-router-dom";
import TopBar from "../components/TopBar";
import { ASSETS_PATH } from "../constants/assets_path";
import CardPanel from "../components/CardPanel";
import ToolBar from "../components/ToolBar";
import { useCampaign } from "../hooks/useCampaign";
import AddLocation from "../components/AddLocation";
import ThingList from "../components/ThingList";
import { createLocation, getLocation } from "../services/CampaignService";
import { Location } from "../types/Location";
import { Item } from "../types/Item";
import { NPC } from "../types/NPC";
import { PC } from "../types/PlayerCharacter";
import EntityList from "../Utilities/Entities";
import { del } from "../services/ImageService";
import { deleteThing, updateThing } from "../components/ThingUpdater";
import { Entity } from "../types/Entity";

function CampaignLocations() {
  const { id } = useParams();

  const {campaign,refreshCampaign} = useCampaign(id as string);

  return (
    <main
      className={styles.main}
      style={{ backgroundImage: `url(${ASSETS_PATH}/fantasy_location.jpeg)` }}
    >
      <div className={styles.bars}>
        <TopBar
          name="Locations"
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
        <AddLocation
          campaignId={id as string}
          addThing={async (id: string, location:Location) => {
            await createLocation(location, id);
            await refreshCampaign();
            return location;
          }}
        />
        <ThingList
          things={campaign?.locations as unknown as Array<Location>}
          campaign={campaign}
          deleteThing={async (id:string, location:Entity) => {
            const locationImage= (await getLocation(id,location.id)).image;
            await deleteThing(id,location);
            if (locationImage != null){
              await del(locationImage)
            }
            await refreshCampaign();
            return Array<Location>;  
          }}
          updateThing={async (id: string, thing:NPC|Location|Item|PC) => {
            await updateThing(id,thing as Location);
            await refreshCampaign();
            return thing;
          }}
        />
      </CardPanel>
    </main>
  );
}

export default CampaignLocations;
