import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import React from 'react';
import { Entity } from '../types/Entity';


type DeleteProps = {
    delete:(campaign:string,thing:Entity) => Promise<unknown>;
    thing: Entity;
    campaignID: string;
}
export default function AlertDialog(props: DeleteProps) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    props.delete(props.campaignID, props.thing);
  };

  return (
    <React.Fragment>
      <button onClick={handleClickOpen}>
        Delete
      </button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you wish to delete this?"}
        </DialogTitle>
        <DialogActions>
          <button onClick={handleClose}>No</button>
          <button onClick={handleDelete} autoFocus>
            Yes
          </button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}