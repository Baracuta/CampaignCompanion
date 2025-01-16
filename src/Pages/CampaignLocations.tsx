import styles from "../css_modules/cardpage.module.css";
import { useParams } from "react-router-dom";
import TopBar from "../components/TopBar";
import { ASSETS_PATH } from "../constants/assets_path";
import CardPanel from "../components/CardPanel";
import ToolBar from "../components/ToolBar";
import { useCampaign } from "../hooks/useCampaign";
import AddLocation from "../components/AddLocation";
import ThingList from "../components/ThingList";
import { createLocation, deleteLocation, updateLocation } from "../services/CampaignService";
import { Location } from "../types/Location";
import { Item } from "../types/Item";
import { NPC } from "../types/NPC";
import { PlayerCharacter } from "../types/PlayerCharacter";

function CampaignLocations() {
  const { id } = useParams();

  const {campaign,refreshCampaign} = useCampaign(id as string);

  console.log(campaign);

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

        <ToolBar />
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
          deleteThing={async (id: string, location:string) => {
            await deleteLocation(id,location);
            await refreshCampaign();
            return Array<Location>;  
          }}
          updateThing={async (id: string, thing:NPC|Location|Item|PlayerCharacter) => {
            await updateLocation(id,thing as Location);
            await refreshCampaign();
            return thing;
          }}
        />
      </CardPanel>
    </main>
  );
}

export default CampaignLocations;
