import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useEffect } from "react";
import styles from "../css_modules/card.module.css";
import { Fragment, useState } from "react";
import { useParams } from "react-router-dom";
import { getCampaign, createNPC } from "../services/CampaignService";
import { Campaign } from "../types/Campaign";
import { NPC } from "../types/NPC";

type ThingProps = {
  formLink: string;
};

//Set it up to have a similar style to a card, but with unique properties
function AddThing(props: ThingProps) {
    const [npc, setNpc]=useState<Partial<NPC>>({})

    const {id}=useParams();

    const [campaign, setCampaign] = useState<Campaign>();

    useEffect(()=>{
        getCampaign (id as string).then((campaign)=>{
            setCampaign(campaign);
        })
    }, [id]);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      <Button className={styles.card} variant="outlined" onClick={handleClickOpen}>
        Add NPC
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add a New NPC to this Campaign</DialogTitle>
        <DialogContent>
          <div className={styles.add_npc}>
            <h3> Name this NPC</h3>

            <input
              type="text"
              value={npc.name}
              onChange={(e) => {
                const name = e.target.value;
                setNpc({ ...npc, name });
              }}
            />

            <h3> Describe this NPC</h3>

            <textarea
              value={npc.description}
              onChange={(e) => {
                const description = e.target.value;
                setNpc({ ...npc, description });
              }}
            />

          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={async () => {
                const savedNPC = await createNPC(npc as NPC, (id as string));
                handleClose;
              }} type="button">Add NPC</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}

export default AddThing;
