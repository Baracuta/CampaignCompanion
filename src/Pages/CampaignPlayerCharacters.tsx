import styles from "../css_modules/cardpage.module.css";
import { useParams } from "react-router-dom";
import TopBar from "../components/TopBar";
import { ASSETS_PATH } from "../constants/assets_path";
import CardPanel from "../components/CardPanel";
import ToolBar from "../components/ToolBar";
import { useCampaign } from "../hooks/useCampaign";
import ThingList from "../components/ThingList";
import AddPC from "../components/AddPC";
import { PC } from "../types/PlayerCharacter";
import { createPC, deletePC, getPC, updatePC } from "../services/CampaignService";
import { Item } from "../types/Item";
import { NPC } from "../types/NPC";
import { Location } from "../types/Location";
import EntityList from "../Utilities/Entities";
import { del } from "../services/ImageService";

function CampaignPlayerCharacters() {
  const { id } = useParams();

  const {campaign,refreshCampaign} = useCampaign(id as string);

  return (
    <main
      className={styles.main}
      style={{ backgroundImage: `url(${ASSETS_PATH}/player_characters.jpg)` }}
    >
      <div className={styles.bars}>
        <TopBar
          name="Player Characters"
          image={`${ASSETS_PATH}/Emblem 1 3.png`}
          buttonNav={`/campaign/${campaign?.id}`}
        />

        <ToolBar campaignEntities={EntityList(campaign)}/>
      </div>

      <CardPanel>
        <AddPC
          campaignId={id as string}
          addThing={async (id:string, pc:PC) => {
            await createPC(pc,id);
            await refreshCampaign();
            return pc
          }}
        />
        <ThingList
          things={campaign?.playerCharacters as Array<PC>}
          campaign={campaign}
          deleteThing={async (id:string,pc:string) => {
            const pcImage = (await getPC(id, pc)).image;
            await deletePC(id,pc);
            if (pcImage != null){
              await del(pcImage)
            }
            await refreshCampaign();
            return Array<PC>
          }}
          updateThing={async (id: string, thing:NPC|Location|Item|PC) => {
            await updatePC(id,thing as PC);
            await refreshCampaign();
            return thing;
          }}
        />
      </CardPanel>
    </main>
  );
}

export default CampaignPlayerCharacters;
