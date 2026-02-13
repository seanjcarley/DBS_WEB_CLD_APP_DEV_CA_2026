import React, { useEffect, useImperativeHandle, useState } from "react";
import { Box, Button, Card, Container, List, ListItem, Modal, Paper, 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableFooter, 
    TableHead, 
    TableRow, 
    TextField, Typography } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import Validator from 'validator';
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../api/client";
import { useAuth } from "../auth/authContext";

const VehicleAddModal = () => {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState('');
    // variables for modal
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '50%',
        bgcolor: 'background.paper',
    };
    const [openModal, setOpenModal] = useState(false);
    const handleOpen = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);
    // variables to hold vehicle details
    const [vehDetails, setVehDetails] = useState('');
    const [vrn, setVrn] = useState('');
    
    


    async function handleVehicleSearch(e) {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const payload = {
                vrn: vrn,
            }

            const data = await apiFetch('/api/vehicles/search_vehicle', {
                method: 'POST',
                auth: false,
                body: payload,
            });
            // console.log(data.results[0][0].VEHICLEMAKE);
            setVehDetails(data.results[0][0]);

            handleOpen();
        } catch (err) {
            setError (err.message || 'Vehicle not found...');
        } finally {
            setLoading(false);
        }
    }

    return (
        <Modal
            open={openModal}
            onClose={handleClose}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
        >
            <Container sx={ style }>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell
                                    colSpan={2}
                                    align='center'
                                >
                                    <Typography id='modal-title'>
                                        Vehicle Details
                                    </Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell
                                    colSpan={2}
                                    align='center'
                                >
                                    <Typography id='modal-description'>
                                        Please check that the details 
                                        below match your 
                                        vehicle { vrn }:  
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell align='center'>
                                    <Typography
                                        variant='subtitle2'
                                    >
                                        Vehicle Make:
                                    </Typography>
                                </TableCell>
                                <TableCell align='center'>
                                    <Typography
                                        variant='h6'
                                        color='secondary'
                                    >
                                        {vehDetails.VEHICLEMAKE}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align='center'>
                                    <Typography
                                        variant='subtitle2'
                                    >
                                        Vehicle Model:
                                    </Typography>
                                </TableCell>
                                <TableCell align='center'>
                                    <Typography
                                        variant='h6'
                                        color='secondary'
                                    >
                                        {vehDetails.VEHICLEMODEL}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align='center'>
                                    <Typography 
                                        variant='subtitle2'
                                    >
                                        Vehicle Colour:
                                    </Typography>
                                </TableCell>
                                <TableCell align='center'>
                                    <Typography
                                        variant='h6'
                                        color='secondary'
                                    >
                                        {vehDetails.VEHICLECOLOUR}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align='center'>
                                    <Typography 
                                        variant='subtitle2'
                                    >
                                        Vehicle Class:
                                    </Typography>
                                </TableCell>
                                <TableCell align='center'>
                                    <Typography
                                        variant='h6'
                                        color='secondary'
                                    >
                                        {vehDetails.VEHICLECLASS}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TableCell
                                    align='center'
                                >
                                    <Button 
                                        variant="contained" 
                                        color="success"
                                        onClick={ handleClose }
                                        sx={{ m: 2}}
                                    >
                                        Confirm
                                    </Button>
                                </TableCell>
                                <TableCell
                                    align='center'
                                >
                                    <Button 
                                        variant="outlined" 
                                        color="error"
                                        onClick={ handleCloseReenter }
                                        sx={{ m: 2}}
                                    >
                                        Re-enter VRN
                                    </Button>
                                </TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
            </Container>
        </Modal>
    )
}

export default VehicleAddModal;