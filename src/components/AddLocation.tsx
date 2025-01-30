import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import styles from "../css_modules/display.module.css";
import { Fragment, useState } from "react";
import { Location } from "../types/Location";
import { ItemImageData } from "../constants/item_image_bank";
import StandardImageList from "./ImageList";
import SingleFileUploader from "./FileUploader";

type thingProps = {
  campaignId: string;
  editLocation?:Location;
  addThing: (id: string, location:Location) => Promise<unknown>;
};

//Set it up to have a similar style to a card, but with unique properties
function AddLocation(props: thingProps) {
  const [location, setLocation] = useState<Partial<Location>>(props.editLocation ?? {});

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const editMode = props.editLocation != null;

  return (
    <Fragment>
      <button
        className={editMode ? styles.edit_button : styles.card}
        onClick={handleClickOpen}
      >
        {editMode ? "Edit Location" : <p>Add Location</p>}
      </button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {editMode ? "Edit this Location" : "Add a New Location to this Campaign"}
        </DialogTitle>
        <DialogContent>
          <div className={styles.division}>
            <div className={styles.top}>
              <h3>{editMode ? "Rename this Location" : "Name this Location"}</h3>

              <input
                type="text"
                value={location.name ?? ""}
                onChange={(e) => {
                  const name = e.target.value;
                  setLocation({ ...location, name });
                }}
              />

              <h3>{editMode ? "Edit Description" : "Describe this Location"}</h3>

              <textarea
                value={location.description ?? ""}
                onChange={(e) => {
                  const description = e.target.value;
                  setLocation({ ...location, description });
                }}
              />
            </div>

            <div className={styles.bottom}>
              <h3>{editMode ? "Edit Notes" : "Add Notes"}</h3>

              <textarea
                value={location.notes ?? ""}
                onChange={(e) => {
                  const notes = e.target.value;
                  setLocation({ ...location, notes });
                }}
              />

              <h3>Choose an Image</h3>
              
              <img src={location.image ?? ""} width={300} height={"auto"} />
              <StandardImageList
                images={ItemImageData}
                imageClick={async (img: string) => {
                  const image = img;
                  await setLocation({ ...location, image });
                  console.log(image);
                  return image;
                }}
              />

              
              <h3>Add Maps</h3>

              <SingleFileUploader
                passedImage={async (img:string) => {
                  const newmap=img;
                  const oldmaps = location.maps as Array<string>;
                  const maps = [...oldmaps, newmap];
                  setLocation({...location, maps});
                  return maps;
                }}
              />
              
            </div>
            
          </div>

        </DialogContent>
        <DialogActions>
          <button onClick={handleClose}>Cancel</button>
          <button
            onClick={() => {
              props.addThing(props.campaignId, location as Location);
              handleClose();
            }}
          >
            {editMode ? "Confirm" : "Add Location"}
          </button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}

export default AddLocation;
