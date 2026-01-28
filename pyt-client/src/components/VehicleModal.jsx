import React, { useState } from "react";
import { Box, Button, Modal, Typography } from "@mui/material";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',

};

const VehicleModal = () => {
    const [open, setOpen] = useState('');
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
            >
                <Box sx={style}>
                    <Typography 
                        id='modal-modal-title' 
                        variant="h6" 
                        component='h2'
                    >
                        Vehicle Details
                    </Typography>
                    <Typography
                        id='modal-modal-description'
                        sx={{ mt: 2 }} 
                    >
                        this is some text
                    </Typography>
                </Box>
            </Modal>
        </>
    )
}

export default VehicleModal;
