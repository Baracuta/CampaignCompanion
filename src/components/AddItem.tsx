import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import styles from "../css_modules/card.module.css";
import { Fragment, useState } from "react";
import { createItem } from "../services/CampaignService";
import { Item } from "../types/Item";


type thingProps = {
  campaignId: string;
};

//Set it up to have a similar style to a card, but with unique properties
function AddItem(props: thingProps) {
  const [item, setItem] = useState<Partial<Item>>({});

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
        Add item
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add a New item to this Campaign</DialogTitle>
        <DialogContent>
          <div className={styles.add_npc}>
            <h3> Name this item</h3>

            <input
              type="text"
              value={item.name ?? ""}
              onChange={(e) => {
                const name = e.target.value;
                setItem({ ...item, name });
              }}
            />

            <h3> Describe this item</h3>

            <textarea
              value={item.description ?? ""}
              onChange={(e) => {
                const description = e.target.value;
                setItem({ ...item, description });
              }}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={async () => {
              await createItem(item as Item, props.campaignId);
              handleClose();
            }}
          >
            Add item
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}

export default AddItem;
