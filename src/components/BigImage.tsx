import styles from '../css_modules/imagelist.module.css';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useState } from 'react';

const style = {
  display: 'flex',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 100,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  size: 10
};

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
        <Box sx={style}>
            <img className={styles.big_image}
                srcSet={`${props.item}`}
                src={`${props.item}?w=164&h=164&fit=crop&auto=format`}
                alt={props.item}
                loading="lazy"
                onClick={handleClose}
            />
        </Box>
      </Modal>
    </div>
  );
}