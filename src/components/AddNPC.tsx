import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import styles from "../css_modules/display.module.css";
import { Fragment, useState } from "react";
import { NPC } from "../types/NPC";
import StandardImageList from "./ImageList";
import { NpcImageData } from "../constants/npc_image_bank";

type thingProps = {
  campaignId: string;
  editNpc?: NPC;
  addThing: (id: string, npc: NPC) => Promise<unknown>;
};

//Set it up to have a similar style to a card, but with unique properties
function AddNPC(props: thingProps) {
  const [npc, setNpc] = useState<Partial<NPC>>(props.editNpc ?? {});

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const editMode = props.editNpc != null;

  return (
    <Fragment>
      <button
        className={editMode ? styles.edit_button : styles.card}
        onClick={handleClickOpen}
      >
        {editMode ? "Edit NPC" : <p>Add NPC</p>}
      </button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {editMode ? "Edit this NPC" : "Add a New NPC to this Campaign"}
        </DialogTitle>
        <DialogContent>
          <div className={styles.division}>
            <div className={styles.top}>
              <h3>{editMode ? "Rename this NPC" : "Name this NPC"}</h3>

              <input
                type="text"
                value={npc.name ?? ""}
                onChange={(e) => {
                  const name = e.target.value;
                  setNpc({ ...npc, name });
                }}
              />

              <h3>{editMode ? "Edit Description" : "Describe this NPC"}</h3>

              <textarea
                value={npc.description ?? ""}
                onChange={(e) => {
                  const description = e.target.value;
                  setNpc({ ...npc, description });
                }}
              />

              <h3>{editMode ? "Edit Notes" : "Add Notes"}</h3>

              <textarea
                value={npc.notes ?? ""}
                onChange={(e) => {
                  const notes = e.target.value;
                  setNpc({ ...npc, notes });
                }}
              />
            </div>
            <div className={styles.bottom}>
              <h3>Choose an Image</h3>

              <img src={npc.image ?? ""} width={300} height={"auto"} />
              <StandardImageList
                images={NpcImageData}
                imageClick={async (img: string) => {
                  const image = img;
                  await setNpc({ ...npc, image });
                  return image;
                }}
              />
            </div>
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
            {editMode ? "Confirm" : "Add NPC"}
          </button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}

export default AddNPC;
