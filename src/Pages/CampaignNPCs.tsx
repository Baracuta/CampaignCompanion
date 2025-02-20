import styles from "../css_modules/cardpage.module.css";
import { useParams } from "react-router-dom";
import { ASSETS_PATH } from "../constants/assets_path";
import CardPanel from "../components/CardPanel";
import ToolBar from "../components/ToolBar";
import TopBar from "../components/TopBar";
import AddNPC from "../components/AddNPC";
import { NPC } from "../types/NPC";
import { useCampaign } from "../hooks/useCampaign";
import ThingList from "../components/ThingList";
import { createNPC, deleteNPC, updateNPC } from "../services/CampaignService";
import { Location } from "../types/Location";
import { Item } from "../types/Item";
import { PlayerCharacter } from "../types/PlayerCharacter";
import EntityList from "../Utilities/Entities";

// To delete images for a thing, just use the hook and delete it in the deleteThing workpath
function CampaignNPCs() {
  const { id } = useParams();

  const {campaign,refreshCampaign} = useCampaign(id as string);

  return (
    <main
      className={styles.main}
      style={{ backgroundImage: `url(${ASSETS_PATH}/fantasy_npcs.jpg)` }}
    >
      <div className={styles.bars}>
        <TopBar
          name="Non-Player Characters"
          image={`${ASSETS_PATH}/Emblem 1 3.png`}
          buttonNav={`/campaign/${campaign?.id}`}
        />

        <ToolBar campaignEntities={EntityList(campaign)}/>
      </div>

      <CardPanel>
        <AddNPC
          campaignId={id as string}
          addThing={async (id: string, npc:NPC) => {
            await createNPC(id,npc);
            await refreshCampaign();
            return npc;
          }}
        />
        <ThingList
          things={campaign?.npcs as Array<NPC>}
          campaign={campaign}
          deleteThing={async (id: string, npc:string) => {
            await deleteNPC(id,npc);
            await refreshCampaign();
            return Array<NPC>;  
          }}
          updateThing={async (id: string, thing:NPC|Location|Item|PlayerCharacter) => {
            await updateNPC(id,thing as NPC);
            await refreshCampaign();
            return thing;
          }}
          />
      </CardPanel>
    </main>
  );
}

export default CampaignNPCs;