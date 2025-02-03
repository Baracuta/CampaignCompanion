import styles from '../css_modules/imagelist.module.css';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Fragment, useState } from 'react';

//Easiest thing to do is make this a function that, when called, takes the string of whatever called it (the img src) and then make a big version.
type ModalProps={
    item:string;
}
export default function BigImage(props:ModalProps) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Fragment>
      <img className={styles.image_item}
            srcSet={`${props.item}`}
            src={`${props.item}?w=164&h=164&fit=crop&auto=format`}
            alt={props.item}
            loading="lazy"
            onClick={handleOpen}
        />
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box className={styles.box}>
            <img className={styles.big_image}
                srcSet={`${props.item}`}
                src={`${props.item}?w=164&h=164&fit=crop&auto=format`}
                alt={props.item}
                loading="lazy"
                onClick={handleClose}
            />
        </Box>
      </Modal>
    </Fragment>
  );
}