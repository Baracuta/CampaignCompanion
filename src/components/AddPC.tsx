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
import { PC } from "../types/PlayerCharacter";
import { NpcImageData } from "../constants/npc_image_bank";
import StandardImageList from "./ImageList";
import { useImage } from "../hooks/useImage";
import { uploadImage } from "../services/ImageService";

type thingProps = {
  campaignId: string;
  editPC?: PC;
  addThing: (id: string, pc: PC) => Promise<unknown>;
};

//Set it up to have a similar style to a card, but with unique properties
function AddPC(props: thingProps) {
  const [pc, setPC] = useState<Partial<PC>>(props.editPC ?? {});

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const editMode = props.editPC != null;
  const favourite = pc.isfavourite === true;
  const image = useImage(pc.image as string);

  const clearPC = () => {
    if (props.editPC == null) {setPC({});}
  };

  return (
    <Fragment>
      <button
        className={editMode ? styles.edit_button : styles.card}
        onClick={handleClickOpen}
      >
        {editMode ? "Edit" : <p>Add Player Character</p>}
      </button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {editMode
            ? "Edit this Player Character"
            : "Add a New Player Character to this Campaign"}
        </DialogTitle>
        <DialogContent>
          <div className={styles.add_edit}>
            <h3>Favourite</h3>

            {favourite ? (
              <div
                className={styles.icon}
                onClick={async () => {
                  const isfavourite = false;
                  await setPC({ ...pc, isfavourite });
                }}
              >
                {" "}
                <StarIcon fontSize="large" />
              </div>
            ) : (
              <div
                className={styles.icon}
                onClick={async () => {
                  const isfavourite = true;
                  await setPC({ ...pc, isfavourite });
                }}
              >
                {" "}
                <StarBorderIcon fontSize="large" />
              </div>
            )}

            <h3>
              {editMode
                ? "Rename this Player Character"
                : "Name this Player Character"}
            </h3>

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
              value={pc.player_name ?? ""}
              onChange={(e) => {
                const player_name = e.target.value;
                setPC({ ...pc, player_name });
              }}
            />

            <h3>{editMode ? "Edit Class" : "Character Class"}</h3>

            <input
              type="text"
              value={pc.pc_class ?? ""}
              onChange={(e) => {
                const pc_class = e.target.value;
                setPC({ ...pc, pc_class });
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

            <img src={image ?? ""} width={300} height={"auto"} />
            <StandardImageList
              images={NpcImageData}
              imageClick={async (img: string) => {
                const image = img;
                const imageId = await uploadImage(img);
                await setPC({ ...pc, image: imageId });
                return image;
              }}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <button
            onClick={() => {
              handleClose();
              clearPC();
            }}
          >
            Cancel
          </button>
          <button
            onClick={() => {
              props.addThing(props.campaignId, pc as PC);
              handleClose();
              clearPC();
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
