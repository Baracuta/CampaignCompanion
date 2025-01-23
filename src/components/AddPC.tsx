import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import styles from "../css_modules/display.module.css";
import { Fragment, useState } from "react";
import { PlayerCharacter } from "../types/PlayerCharacter";
import { NpcImageData } from "../constants/npc_image_bank";
import StandardImageList from "./ImageList";

type thingProps = {
  campaignId: string;
  editPC?: PlayerCharacter;
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

            <h3>{editMode ? "Edit Player Name" : "Player Name"}</h3>

            <input
              type="text"
              value={pc.playerName ?? ""}
              onChange={(e) => {
                const playerName = e.target.value;
                setPC({ ...pc, playerName });
              }}
            />

            <h3>{editMode ? "Edit Class" : "Character Class"}</h3>

            <input
              type="text"
              value={pc.pcClass ?? ""}
              onChange={(e) => {
                const pcClass = e.target.value;
                setPC({ ...pc, pcClass});
              }}
            />

            <h3>{editMode ? "Edit Character Level" : "Character Level"}</h3>

            <input
              type="text"
              value={pc.level ?? ""}
              onChange={(e) => {
                const level = e.target.value;
                setPC({ ...pc, level });
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

            <h3>Choose an Image</h3>
            
            <img
              src={pc.image ?? ""}
              width={300} height= {"auto"}
            />
            <StandardImageList
              images={NpcImageData}
              imageClick={async (img:string)=>{
                const image = img;
                await setPC({ ...pc, image})
                return image
              }}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <button onClick={handleClose}>Cancel</button>
          <button
            onClick={() => {
              props.addThing(props.campaignId, pc as PlayerCharacter);
              handleClose();
            }}
          >
            {editMode ? "Confirm" : "Add Player Character"}
          </button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}

export default AddPC;
