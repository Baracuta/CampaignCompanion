import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import styles from "../css_modules/card.module.css";
import { Fragment, useState } from "react";
import { Item } from "../types/Item";

type thingProps = {
  campaignId: string;
  editItem?:Item;
  addThing:(id:string,item:Item) => Promise<unknown>;
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

  const editMode = props.editItem != null;

  return (
    <Fragment>
      <button
        className={styles.card}
        onClick={handleClickOpen}
      >
        {editMode ? "Edit Item" : <p>Add item</p>}
      </button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {editMode ? "Edit this Item" : "Add a New Item to this Campaign"}
        </DialogTitle>
        <DialogContent>
          <div className={styles.add_npc}>
            <h3>{editMode ? "Rename this Item" : "Name this Item"}</h3>

            <input
              type="text"
              value={item.name ?? ""}
              onChange={(e) => {
                const name = e.target.value;
                setItem({ ...item, name });
              }}
            />

            <h3>{editMode ? "Edit Description" : "Describe this Item"}</h3>

            <textarea
              value={item.description ?? ""}
              onChange={(e) => {
                const description = e.target.value;
                setItem({ ...item, description });
              }}
            />

            <h3>{editMode ? "Edit Notes" : "Add Notes"}</h3>

            <textarea
              value={item.notes ?? ""}
              onChange={(e) => {
                const notes = e.target.value;
                setItem({ ...item, notes });
              }}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <button onClick={handleClose}>Cancel</button>
          <button
            onClick={() => {
              props.addThing(props.campaignId,item as Item);
              handleClose();
            }}
          >
            {editMode ? "Confirm" : "Add item"}
          </button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}

export default AddItem;
