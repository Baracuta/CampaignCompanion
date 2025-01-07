import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import styles from "../css_modules/card.module.css";
import { Fragment, useState } from "react";
import { PlayerCharacter } from "../types/PlayerCharacter";

type thingProps = {
  campaignId: string;
  addThing: (pc: PlayerCharacter, id: string) => Promise<PlayerCharacter>;
};

//Set it up to have a similar style to a card, but with unique properties
function AddPC(props: thingProps) {
  const [pc, setPC] = useState<Partial<PlayerCharacter>>({});

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
        <DialogTitle>Add a New Player Character to this Campaign</DialogTitle>
        <DialogContent>
          <div className={styles.add_npc}>
            <h3> Name this Player Character</h3>

            <input
              type="text"
              value={pc.name ?? ""}
              onChange={(e) => {
                const name = e.target.value;
                setPC({ ...pc, name });
              }}
            />

            <h3> Describe this PC</h3>

            <textarea
              value={pc.description ?? ""}
              onChange={(e) => {
                const description = e.target.value;
                setPC({ ...pc, description });
              }}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() => {
              props.addThing(pc as PlayerCharacter, props.campaignId);
              handleClose();
            }}
          >
            Add Player Character
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}

export default AddPC;
