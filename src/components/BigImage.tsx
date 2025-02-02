import styles from '../css_modules/imagelist.module.css';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useState } from 'react';



type ModalProps={
    item:string;
}
export default function BigImage(props:ModalProps) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
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
        <Box>
            <img
                srcSet={`${props.item}`}
                src={`${props.item}?w=164&h=164&fit=crop&auto=format`}
                alt={props.item}
                loading="lazy"
                onClick={handleOpen}
            />
        </Box>
      </Modal>
    </div>
  );
}