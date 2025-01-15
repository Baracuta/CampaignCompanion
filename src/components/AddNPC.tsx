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
  editNpc?: NPC;
  addThing:(id:string, npc:NPC)=> Promise<unknown>;
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

  const editMode = props.editNpc != null;

  if (editMode) {setNpc({...props.editNpc})}

  return (
    <Fragment>
      <Button
        className={styles.card}
        variant="outlined"
        onClick={handleClickOpen}
      >
        {editMode ? "Edit NPC" : "Add NPC"}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {editMode ? "Edit this NPC" : "Add a New NPC to this Campaign"}
        </DialogTitle>
        <DialogContent>
          <div className={styles.add_npc}>
            <h3>{editMode ? "Rename this NPC" : "Name this NPC"}</h3>

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

            <h3> Add Notes for this NPC </h3>

            <textarea
              value={npc.notes ?? ""}
              onChange={(e) => {
                const notes = e.target.value;
                setNpc({ ...npc, notes });
              }}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <button onClick={handleClose}>Cancel</button>
          <button
            onClick={() => {
              props.addThing(props.campaignId, npc as NPC);
              handleClose();
            }}
          >
            Add NPC
          </button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}

export default AddNPC;