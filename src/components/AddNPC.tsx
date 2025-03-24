import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import styles from "../css_modules/display.module.css";
import { Fragment, useState } from "react";
import { NPC } from "../types/NPC";
import StandardImageList from "./ImageList";
import { NpcImageData } from "../constants/npc_image_bank";
import { set, uploadImage } from "../services/ImageService";
import { useImage } from "../hooks/useImage";

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
  const favourite = npc.isFavourite === true;
  const image = useImage(npc.image);

  const clearNpc = () => {
    if (props.editNpc == null) {setNpc({});}
  };

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
          <div className={styles.add_edit}>
            <h3>Favourite</h3>

            {favourite ? (
              <div
                className={styles.icon}
                onClick={async () => {
                  const isFavourite = false;
                  await setNpc({ ...npc, isFavourite });
                }}
              >
                {" "}
                <StarIcon fontSize="large" />
              </div>
            ) : (
              <div
                className={styles.icon}
                onClick={async () => {
                  const isFavourite = true;
                  await setNpc({ ...npc, isFavourite });
                }}
              >
                {" "}
                <StarBorderIcon fontSize="large" />
              </div>
            )}

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

            <h3>Choose an Image</h3>

            <img src={image ?? ""} width={300} height={"auto"} />
            <StandardImageList
              images={NpcImageData}
              imageClick={async (img: string) => {
                const image = img;
                // If image != null, getImage => setimage. else, upload as usual
                if (npc.image != null) (
                  const imageId = await set(npc.image, image)
                )
                const imageId = await uploadImage(img);
                await setNpc({ ...npc, image: imageId });
                return image;
              }}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <button
            onClick={() => {
              handleClose();
              clearNpc();
            }}
          >
            Cancel
          </button>
          <button
            onClick={() => {
              props.addThing(props.campaignId, npc as NPC);
              handleClose();
              clearNpc();
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
