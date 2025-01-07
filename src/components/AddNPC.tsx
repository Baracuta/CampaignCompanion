import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import styles from "../css_modules/card.module.css";
import { Fragment, useState } from "react";
import { NPC } from "../types/NPC";

type thingProps = {
  campaignId: string;
  addThing:(npc:NPC, id:string)=> Promise<NPC>;
  refresh:()=> Promise<void>;
};

//Set it up to have a similar style to a card, but with unique properties
function AddNPC(props: thingProps) {
  const [npc, setNpc] = useState<Partial<NPC>>({});

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      <Button
        className={styles.card}
        variant="outlined"
        onClick={handleClickOpen}
      >
        Add NPC
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add a New NPC to this Campaign</DialogTitle>
        <DialogContent>
          <div className={styles.add_npc}>
            <h3> Name this NPC</h3>

            <input
              type="text"
              value={npc.name ?? ""}
              onChange={(e) => {
                const name = e.target.value;
                setNpc({ ...npc, name });
              }}
            />

            <h3> Describe this NPC</h3>

            <textarea
              value={npc.description ?? ""}
              onChange={(e) => {
                const description = e.target.value;
                setNpc({ ...npc, description });
              }}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() => {
              props.addThing(npc as NPC, props.campaignId);
              handleClose();
              props.refresh();
            }}
          >
            Add NPC
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}

export default AddNPC;