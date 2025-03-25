import styles from "../css_modules/campaign.module.css";
import Card from "../components/Card";
import { useParams } from "react-router-dom";
import { ASSETS_PATH } from "../constants/assets_path";
import TopBar from "../components/TopBar";
import ToolBar from "../components/ToolBar";
import { useCampaign } from "../hooks/useCampaign";
import EntityList from "../utilities/Entities";
import { Entity } from "../types/Entity";
import { deleteThing, updateThing } from "../components/ThingUpdater";

function CampaignPage() {
  const { id } = useParams();

  const {campaign,refreshCampaign} = useCampaign(id as string);
        
  return (
    <main className={styles.main}>
      <TopBar
        name={campaign?.name}
        game={campaign?.game}
        buttonNav="/campaign-select"
        image={`${ASSETS_PATH}/Emblem 1 3.png`}
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

      <div className={styles.card_panel}>
        <Card
          name="Non-Player Characters"
          cardType="bigCard"
          cardLink={`/campaign/${campaign?.id}/NPCs`}
        ></Card>

        <Card
          name="Locations"
          cardType="bigCard"
          cardLink={`/campaign/${campaign?.id}/Locations`}
        ></Card>

        <Card
          name="Items"
          cardType="bigCard"
          cardLink={`/campaign/${campaign?.id}/Items`}
        ></Card>

        <Card
          name="Player Characters"
          cardType="bigCard"
          cardLink={`/campaign/${campaign?.id}/PlayerCharacters`}
        ></Card>
      </div>

      <div className={styles.bottom_bar}/>
    </main>
  );
}

export default CampaignPage;