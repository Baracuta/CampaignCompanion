import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
  } from "@mui/material";
  import styles from "../css_modules/card.module.css";
  import { Fragment, useState } from "react";
  import { createLocation } from "../services/CampaignService";
import { Location } from "../types/Location";

  type thingProps = {
    campaignId: string;
  };
  
  //Set it up to have a similar style to a card, but with unique properties
  function AddLocation(props: thingProps) {
    const [location, setLocation] = useState<Partial<Location>>({});
  
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
          Add Location
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add a New Location to this Campaign</DialogTitle>
          <DialogContent>
            <div className={styles.add_npc}>
              <h3> Name this Location</h3>
  
              <input
                type="text"
                value={location.name ?? ""}
                onChange={(e) => {
                  const name = e.target.value;
                  setLocation({ ...location, name });
                }}
              />
  
              <h3> Describe this NPC</h3>
  
              <textarea
                value={location.description ?? ""}
                onChange={(e) => {
                  const description = e.target.value;
                  setLocation({ ...location, description });
                }}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              onClick={async () => {
                await createLocation(location as Location, props.campaignId);
                handleClose();
              }}
            >
              Add Location
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
  
  export default AddLocation;
  