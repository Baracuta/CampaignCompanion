import styles from "../css_modules/cardpage.module.css";
import { useParams } from "react-router-dom";
import TopBar from "../components/TopBar";
import { ASSETS_PATH } from "../constants/assets_path";
import CardPanel from "../components/CardPanel";
import ToolBar from "../components/ToolBar";
import { useCampaign } from "../hooks/useCampaign";
import ThingList from "../components/ThingList";
import AddPC from "../components/AddPC";
import { PlayerCharacter } from "../types/PlayerCharacter";
import { createPC, deletePC, updatePC } from "../services/CampaignService";
import { Item } from "../types/Item";
import { NPC } from "../types/NPC";
import { Location } from "../types/Location";

function CampaignPlayerCharacters() {
  const { id } = useParams();

  const {campaign,refreshCampaign} = useCampaign(id as string);

  console.log(campaign);

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

        <ToolBar
          favourites={campaign?.items as Array<Item>}
          recentEdits={campaign?.npcs as Array<NPC>}
        />
      </div>

      <CardPanel>
        <AddPC
          campaignId={id as string}
          addThing={async (id:string, pc:PlayerCharacter) => {
            await createPC(pc,id);
            await refreshCampaign();
            return pc
          }}
        />
        <ThingList
          things={campaign?.playerCharacters as Array<PlayerCharacter>}
          campaign={campaign}
          deleteThing={async (id:string,pc:string) => {
            await deletePC(id,pc);
            await refreshCampaign();
            return Array<PlayerCharacter>
          }}
          updateThing={async (id: string, thing:NPC|Location|Item|PlayerCharacter) => {
            await updatePC(id,thing as PlayerCharacter);
            await refreshCampaign();
            return thing;
          }}
        />
      </CardPanel>
    </main>
  );
}

export default CampaignPlayerCharacters;
