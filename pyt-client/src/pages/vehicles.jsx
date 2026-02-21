import React, { useEffect, useState } from "react";
import { Alert, Box, Button, Card, CircularProgress, Container, Grid, 
    IconButton, List, ListItem, Modal, Paper, Typography, 
    TextField } from "@mui/material";
import AuthNavBar from "../components/AuthNavBar";
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from "@mui/material/TableFooter";
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { apiFetch } from "../api/client";
import { useNavigate } from "react-router-dom";


const Vehicles = () => {
    const nav = useNavigate();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [activeVehDetails, setActiveVehDetails] = useState([]);
    const [inactiveVehDetails, setInactiveVehDetails] = useState([]);
    const [vrn, setVrn] = useState('');
    const [delVrn, setDelVrn] = useState('');
    const [vehMk, setVehMk] = useState('');
    const [vehMdl, setVehMdl] = useState('');
    const [vehClr, setVehClr] = useState('');
    const [vehCls, setVehCls] = useState('');
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
    const handleCloseReenter = (e) => {
        setOpenModal(false);
        setVrn('')
        e.preventDefault();
    };
    const custID = localStorage.getItem('id');

    useEffect(() => {
        async function fetchVehicleDetails(e) {
            // e.preventDefault();
            setError('');
            setLoading(true);
             try{
                const payload = {
                    id: custID,
                }
                const data = await apiFetch('/api/vehicles/vehicles', {
                    method: 'POST',
                    auth: true,
                    body: payload,
                });
                setActiveVehDetails(data.results[0]);
                setInactiveVehDetails(data.results[1]);
             } catch (err) {
                setError(err.message || 'Failed to retrieve vehicle details...');
             } finally {
                setLoading(false);
             }
        }
        fetchVehicleDetails();
    }, []);

    // serach for the vehicle details
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
                console.log(data.results[0][0].VEHICLEMAKE);
                setVehMk(data.results[0][0].VEHICLEMAKE);
                setVehMdl(data.results[0][0].VEHICLEMODEL);
                setVehClr(data.results[0][0].VEHICLECOLOUR);
                setVehCls(data.results[0][0].VEHICLECLASS);
                // setVehDetails(data.results[0][0]);
    
                handleOpen();
            } catch (err) {
                setError (err.message || 'Vehicle not found...');
            } finally {
                setLoading(false);
            }
        }

    async function addVehicle(e) {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const payload = {
                id: custID,
                vrn: vrn
            }

            await apiFetch('/api/vehicles/add_vehicle', {
                method: 'POST',
                auth: true,
                body: payload,
            });
            nav('/vehicles')
            
        } catch (err) {
            setError (err.message || 'Vehicle not added...');
        } finally {
            setLoading(false);
        }
    }

    async function deleteVehicle(e) {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const payload = {
                id: custID,
                vrn: vrn
            }

            await apiFetch('/api/vehicles/add_vehicle', {
                method: 'POST',
                auth: true,
                body: payload,
            });
            nav('/vehicles')
            
        } catch (err) {
            setError (err.message || 'Vehicle not added...');
        } finally {
            setLoading(false);
        }
    }

    const deleteVrn = () => {
        
    }

    // used to change the styling of table rows
    const StyledTableRow = styled(TableRow)(({theme}) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.primary.contrastText,
        },
        '&:nth-of-type(even)':{
            backgroundColor: theme.palette.secondary.contrastText,
        },
        // '&:last-child': {
        //     backgroundColor: '#fff'
        // }
    }));

    return (
        <>
            <AuthNavBar />
            <Container
                // maxWidth='sm'
                sx={{ 
                    mt: 10,
                }}
                align='center'
            >
                <Paper 
                    sx={{ 
                        p: 5,
                    }}   
                >
                    <Typography 
                        variant="h4"
                        align="center" 
                        color='primary'
                        sx={{ 
                            mt: 2,
                        }}
                    >
                        Vehicles
                    </Typography>
                    {error && (
                        <Alert severity='error' sx={{ mt: 2 }}>{error}</Alert>
                    )}

                    <Box>
                        <Grid 
                            container 
                            spacing={2}
                        >
                            <Grid 
                                size={{xs: 10, md: 6}}
                                offset={{xs: 1, md: 0}}
                            >
                                <Card 
                                    align='center'
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        flexDirection: 'column',
                                        height: '100%',
                                    }}
                                >
                                    <Box>
                                        <TableContainer
                                            component={Paper}
                                            sx={{
                                                width: '100%',
                                                mt: 1,
                                            }}
                                        >
                                            <Table>
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell 
                                                            colSpan={6}
                                                            align='center'
                                                        >
                                                            Active Vehicles
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>
                                                            Registration Number
                                                        </TableCell>
                                                        <TableCell>
                                                            Make
                                                        </TableCell>
                                                        <TableCell>
                                                            Model
                                                        </TableCell>
                                                        <TableCell>
                                                            Colour
                                                        </TableCell>
                                                        <TableCell>
                                                            Vehicle Class
                                                        </TableCell>
                                                        <TableCell></TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {activeVehDetails.map((detail) => (
                                                        <StyledTableRow key={detail.VEHICLEREGNO}>
                                                            <TableCell>{detail.VEHICLEREGNO}</TableCell>
                                                            <TableCell>{detail.VEHICLEMAKE}</TableCell>
                                                            <TableCell>{detail.VEHICLEMODEL}</TableCell>
                                                            <TableCell>{detail.VEHICLECOLOUR}</TableCell>
                                                            <TableCell>{detail.VEHICLECLASS}</TableCell>
                                                            <TableCell>
                                                                <Button
                                                                    key={detail.VEHICLEREGNO}
                                                                    variant='outlined'
                                                                    sx={{
                                                                        display: 'inline-flex'   
                                                                    }}
                                                                >
                                                                    <DeleteIcon />
                                                                </Button>
                                                            </TableCell>
                                                        </StyledTableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Box>
                                    <Box
                                        fullWidth
                                        sx={{
                                            display: 'grid',
                                            justifyItems: 'center',
                                            gridTemplateColumns: 'repeat(2, minmax(min(200px, 50%), 1fr))',
                                            gap: 2,
                                            my: 5,
                                        }}
                                    >
                                        <TextField
                                            label='Vehicle Registration Number (VRN)'
                                            value={vrn}
                                            onChange={ e => setVrn(e.target.value) }
                                            sx={{ mt: 1, }}
                                            required
                                        />
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            sx={{
                                                my: 1,
                                                width: '66%',
                                            }}
                                            onClick={handleVehicleSearch}
                                        >
                                            Check Vehicle
                                        </Button>
                                    </Box>
                                </Card>
                            </Grid>
                            <Grid 
                                size={{xs: 10, md: 6}}
                                offset={{xs: 1, md: 0}}
                            >
                                <Card 
                                    align='center'
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        flexDirection: 'column',
                                        height: '100%',
                                    }}
                                >
                                    <Box>
                                        <TableContainer
                                            component={Paper}
                                            sx={{
                                                width: '100%',
                                                mt: 1,
                                            }}
                                        >
                                            <Table>
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell 
                                                            colSpan={6}
                                                            align='center'
                                                        >
                                                            Inactive Vehicles
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>
                                                            Registration Number
                                                        </TableCell>
                                                        <TableCell>
                                                            Make
                                                        </TableCell>
                                                        <TableCell>
                                                            Model
                                                        </TableCell>
                                                        <TableCell>
                                                            Vehicle Class
                                                        </TableCell>
                                                        <TableCell>
                                                            Date Removed
                                                        </TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {inactiveVehDetails.map((detail) => (
                                                        <StyledTableRow>
                                                            <TableCell>{detail.VEHICLEREGNO}</TableCell>
                                                            <TableCell>{detail.VEHICLEMAKE}</TableCell>
                                                            <TableCell>{detail.VEHICLEMODEL}</TableCell>
                                                            <TableCell>{detail.VEHICLECLASS}</TableCell>
                                                            <TableCell>{detail.VEHICLEREMOVED}</TableCell>
                                                        </StyledTableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Box>
                                </Card>
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
            </Container>
            {/* modal */}
            <Box>
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
                                                {vehMk}
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
                                                {vehMdl}
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
                                                {vehClr}
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
                                                {vehCls}
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
                                                variant="outlined" 
                                                color="error"
                                                onClick={ handleCloseReenter }
                                                sx={{ m: 2}}
                                            >
                                                Re-enter VRN
                                            </Button>
                                        </TableCell>
                                        <TableCell
                                            align='center'
                                        >
                                            <Button 
                                                variant="contained" 
                                                color="success"
                                                onClick={ addVehicle }
                                                sx={{ m: 2}}
                                            >
                                                Add Vehicle
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                </TableFooter>
                            </Table>
                        </TableContainer>
                    </Container>
                </Modal>
            </Box>
        </>
    )
};

export default Vehicles;