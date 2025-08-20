import NavButton from "../components/NavButton";
import styles from "../css_modules/form.module.css";
import { useState } from "react";
import { Campaign } from "../types/Campaign";
import { useNavigate } from "react-router-dom";
import { createCampaign } from "../services/CampaignServiceFrontend";
import { Autocomplete, TextField } from "@mui/material";
import { GameOptions } from "../constants/game_options";
import { useUser } from "../hooks/useUser";

//This page is for the campaign creation form
function CampaignForm() {
  const user =  useUser();
  const [campaign, setCampaign] = useState<Partial<Campaign>>({players:1, user: user.id});
  //This will just let me control things when the page is in the process of saving information. For progress wheels, etc
  // const [saving, setSaving] = useState(false);
  const navigate = useNavigate();


  function validate() {
    let check = true;
    if (campaign.game == "" || campaign.name == undefined || campaign.players == null) {
      check = true;
    } else {
      check = false;
    }
    return check;
  }

  return (
    <main className={styles.main}>
      <div>
        <NavButton text="Home" destination="/" />
      </div>

      <div className={styles.form_body}>
        <div id={styles.section1}>
          <h3>What game system does this campaign use?</h3>

          <Autocomplete
            className={styles.Autocomplete}
            freeSolo
            options={GameOptions}
            value={campaign.game ?? ""}
            onChange={(_e, value) => {
              const game = value ?? undefined;
              setCampaign({ ...campaign, game });
            }}
            renderInput={(params) => (
              <TextField {...params} label="Game System" />
            )}
          />
        </div>

        <div id={styles.section2}>
          <h3>What would you like to name this campaign?</h3>

          <input
            type="text"
            value={campaign.name ?? ""}
            onChange={(e) => {
              const name = e.target.value;
              setCampaign({ ...campaign, name });
            }}
          />
        </div>

        <div id={styles.section3}>
          <h3>How many players are in this campaign?</h3>

          <input
            type="number"
            value={campaign.players}
            onChange={(e) => {
              const players = Number(e.target.value);
              setCampaign({ ...campaign, players });
            }}
            max={8}
            min={1}
          />
        </div>

        <button
          disabled={validate()}
          onClick={async () => {
            // setSaving(true);
            const savedCampaign = await createCampaign(campaign as Campaign);
            navigate(`/campaign/${savedCampaign.id}`);
          }}
        >
          Create Campaign
        </button>
      </div>
    </main>
  );
}

export default CampaignForm;
