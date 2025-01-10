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
import { createPC, deletePC } from "../services/CampaignService";

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

        <ToolBar />
      </div>

      <CardPanel>
        <AddPC
          campaignId={id as string}
          addThing={async (pc:PlayerCharacter, id:string) => {
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
        />
      </CardPanel>
    </main>
  );
}

export default CampaignPlayerCharacters;
