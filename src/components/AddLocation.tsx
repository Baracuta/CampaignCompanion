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
import { Location } from "../types/Location";
import { LocationImageData } from "../constants/location_image_bank";
import StandardImageList from "./ImageList";
import SingleFileUploader from "./FileUploader";
import MapList from "./MapList";
import { useImage } from "../hooks/useImage";
import { del, uploadImage } from "../services/ImageService";

type thingProps = {
  campaignId: string;
  editLocation?: Location;
  addThing: (id: string, location: Location) => Promise<unknown>;
};

function AddLocation(props: thingProps) {
  const [location, setLocation] = useState<Partial<Location>>(props.editLocation ?? {});
  const [open, setOpen] = useState(false);
  const [imagesToDelete, setImagesToDelete] = useState<Array<string>>([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const editMode = props.editLocation != null;
  const favourite = location.isfavourite === true;
  const image = useImage(location.image);

  const clearLocation = () => {
    if (props.editLocation == null) {setLocation({});}
  };

  return (
    <Fragment>
      <button
        className={editMode ? styles.edit_button : styles.card}
        onClick={handleClickOpen}
      >
        {editMode ? "Edit" : <p>Add Location</p>}
      </button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {editMode
            ? "Edit this Location"
            : "Add a New Location to this Campaign"}
        </DialogTitle>
        <DialogContent>
          <div className={styles.add_edit}>
            <h3>Favourite</h3>

            {favourite ? (
              <div
                className={styles.icon}
                onClick={async () => {
                  const isfavourite = false;
                  await setLocation({ ...location, isfavourite });
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
                  await setLocation({ ...location, isfavourite });
                }}
              >
                {" "}
                <StarBorderIcon fontSize="large" />
              </div>
            )}

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

            <h3>{editMode ? "Edit Notes" : "Add Notes"}</h3>

            <textarea
              value={location.notes ?? ""}
              onChange={(e) => {
                const notes = e.target.value;
                setLocation({ ...location, notes });
              }}
            />

            <h3>Choose an Image</h3>

            <img src={image ?? ""} width={300} height={"auto"} />
            <StandardImageList
              images={LocationImageData}
              imageClick={async (img: string) => {
                const image = img;
                if (location.image != null) {
                  await del(location.image);
                }
                const imageId = await uploadImage(img);
                await setLocation({ ...location, image: imageId });
                return image;
              }}
            />

            <h3>Add Maps</h3>

            <SingleFileUploader
              passedImage={async (img: string) => {
                const newmapId = await uploadImage(img);
                const oldmaps = (location.maps as Array<string>) ?? [];
                const maps = [...oldmaps, newmapId];
                await setLocation({ ...location, maps });
                return maps;
              }}
            />

            <MapList
              images={location.maps as Array<string>}
              editMaps={true}
              deleteMap={async (imgKey: string) => {
                const oldmaps = (location.maps as Array<string>) ?? [];
                const maps = [...oldmaps.filter((datum) => datum != imgKey)];
                await setLocation({...location, maps });
                setImagesToDelete([...imagesToDelete, imgKey]);
                return maps;
              }}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <button
            onClick={() => {
              handleClose();
              clearLocation();
            }}
          >
            Cancel
          </button>
          <button
            onClick={async () => {
              await props.addThing(props.campaignId, location as Location);

              if (imagesToDelete.length >0) {
                for (let i=0; i < imagesToDelete.length; i++) {
                  await del(imagesToDelete[i]);
                }
              }
              handleClose();
              clearLocation();
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
