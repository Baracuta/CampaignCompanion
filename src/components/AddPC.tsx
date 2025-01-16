import {
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
  editPC: PlayerCharacter;
  addThing: (id: string, pc: PlayerCharacter) => Promise<unknown>;
};

//Set it up to have a similar style to a card, but with unique properties
function AddPC(props: thingProps) {
  const [pc, setPC] = useState<Partial<PlayerCharacter>>(props.editPC ?? {});

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const editMode = props.editPC != null;

  return (
    <Fragment>
      <button
        className={editMode ? styles.edit_button : styles.card}
        onClick={handleClickOpen}
      >
        {editMode ? "Edit Player Character" : <p>Add Player Character</p>}
      </button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {editMode ? "Edit this Player Character" : "Add a New Player Character to this Campaign"}
        </DialogTitle>
        <DialogContent>
          <div className={styles.add_npc}>
            <h3>{editMode ? "Rename this Player Character" : "Name this Player Character"}</h3>

            <input
              type="text"
              value={pc.name ?? ""}
              onChange={(e) => {
                const name = e.target.value;
                setPC({ ...pc, name });
              }}
            />

            <h3>{editMode ? "Edit Description" : "Describe this PC"}</h3>

            <textarea
              value={pc.description ?? ""}
              onChange={(e) => {
                const description = e.target.value;
                setPC({ ...pc, description });
              }}
            />

            <h3>{editMode ? "Edit Notes" : "Add Notes"}</h3>

            <textarea
              value={pc.notes ?? ""}
              onChange={(e) => {
                const notes = e.target.value;
                setPC({ ...pc, notes });
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
