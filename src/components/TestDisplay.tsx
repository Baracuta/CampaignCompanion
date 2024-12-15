//This is meant to be a test for the Popover component, if we had thingLists
// make these instead of Cards.

import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useState } from 'react';
import styles from '../css_modules/card.module.css';

type DisplayProps = {
    name?: string;
    description?: string;
    notes?: string;
    image?: string;
  };

export default function TestDisplay(props:DisplayProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Button className={styles.card} aria-describedby={id} variant="contained" onClick={handleClick}>
        <p>{props.name}</p>
      </Button>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <button onClick={handleClose}/>
        <h1>{props.name}</h1>
        <h3>{props.description}</h3>

        <textarea/>

        <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>

      </Popover>
    </div>
  );
}