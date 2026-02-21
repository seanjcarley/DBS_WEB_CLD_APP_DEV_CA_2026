import React, { useMemo, useState } from "react";
import { Alert, Box, Button, Card, CardContent, CircularProgress, Container, Grid, 
    Modal, Table, TableBody, TableCell, TableContainer, TableFooter, 
    TableHead, TableRow, TextField, Typography } from '@mui/material';
import Validator from 'validator';
import { apiFetch } from "../api/client";
import UnauthNavBar from "../components/UnauthNavBar";
import UnauthSideBar from "../components/UnauthSideBar";
import PaymentForm from "./PaymentForm";
import { Link, Navigate, useParams, generatePath } from "react-router-dom";

const PaymentSetup = () => {
    // misc variables
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [confirmed, setConfirmed] = useState('flex')
    const [disable, setDisable] = useState(false)
    // variables for validation error alerts
    const [emailAlert, setEmailAlert] = useState('');
    const [emlAlrtClr, setEmlAlrtClr] = useState('');
    const [quantAlert, setQuantAlert] = useState('');
    const [quantAlrtClr, setQuantAlrtClr] = useState('');
    // variables to be passes to payment form
    const [email, setEmail] = useState('');
    const [priceId, setPriceId] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [confirmVrn, setConfirmVrn] = useState('none')
    // variables to hold vehicle details
    const [vrn, setVrn] = useState('');
    const [vehMk, setVehMk] = useState('');
    const [vehMdl, setVehMdl] = useState('');
    const [vehClr, setVehClr] = useState('');
    const [vehCls, setVehCls] = useState('');
    // variable for toll rates retrieved from stripe
    const [tollRate, setTollRate] = useState('');
    const [stringTollRate, setStringTollRate] = useState('');
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
    const handleClose = (e) => {
        e.preventDefault();
        setOpenModal(false);
        setConfirmVrn('flex');
        setConfirmed('none');
        setDisable(true);
    };
    const handleCloseReenter = (e) => {
        e.preventDefault();
        setOpenModal(false);
        setVrn('')
        setStringTollRate('');
        setEmail('');
        setConfirmVrn('none');
        setConfirmed('flex');
    };
    // validate that the provided email address is in a valid email format
    const validateEmailEntry = (email) => {
        if (Validator.isEmail(email)) {
            setEmail(email);
            setEmailAlert('Valid Email Address Format!');
            setEmlAlrtClr('green');
        } else {
            setEmail('');
            setEmailAlert('Enter a Valid Email Address!');
            setEmlAlrtClr('red');
        }
    };

    // retrieve the vehicle details from the database
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

            setVehMk(data.results[0][0].VEHICLEMAKE);
            setVehMdl(data.results[0][0].VEHICLEMODEL);
            setVehClr(data.results[0][0].VEHICLECOLOUR);
            setVehCls(data.results[0][0].VEHICLECLASS);

            const rates = await apiFetch('/api/payments/toll_rates')

            for (var num = 0; num < rates.data.length; num++) {
                if (rates.data[num].metadata.class === String(data.results[0][0].VEHICLECLASS)) {
                    setTollRate(rates.data[num].metadata.rate)
                    setPriceId(rates.data[num].default_price);
                    
                    if (String(Number(rates.data[num].metadata.rate)/100).slice(-2) === '.5') {
                        setStringTollRate('€'+String(Number(rates.data[num].metadata.rate)/100)+'0');
                    } else {
                        setStringTollRate('€'+String(Number(rates.data[num].metadata.rate)/100)+'.00');
                    }
                }
            }
            handleOpen();
        } catch (err) {
            setError(err.message || 'Vehicle not found...');
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <UnauthNavBar onMenuClick={ () => setOpen(true) } />
            <UnauthSideBar open={open} onClose={() => setOpen(false)} />
            <Container>
                <Typography
                    variant='h2'
                    align='center'
                    color='Primary'
                >
                    Make a Payment
                </Typography>
                <Box
                    sx={{
                        width: '90%',
                        gap: 2,
                        mt: 7,
                        mx: 'auto',
                        flexGrow: 1,
                    }}
                >
                    <Card
                        sx={{
                            mb: 2,
                            display: 'flex',
                            justifyContent: 'flex-start',
                            flexDirection: 'column',
                            alignItems: 'center',
                            height: '100%'
                        }}
                    >
                        { error && <Alert severity='error'>{ error }</Alert>}
                        <CardContent>
                            <Typography
                                variant='subtitle1'
                                align='center'
                            >
                                Please enter your email and vehicle 
                                registration number (VRN) below: 
                            </Typography>
                        </CardContent>
                        <TextField
                            disabled={disable}
                            sx={{
                                mt: 2,
                                width: '66%',
                            }}
                            label='Email'
                            type='email'
                            required
                            onChange={ e => validateEmailEntry(e.target.value)}
                        />
                        <Typography
                            variant='caption'
                            sx={{
                                color: emlAlrtClr,
                                display: confirmed,
                            }}
                        >
                            { emailAlert }
                        </Typography>
                        <TextField
                            disabled={disable}
                            sx={{
                                mt: 2,
                                width: '66%',
                                mb: 5,
                            }}
                            label='Vehicle Registration Number (VRN)'
                            value={vrn}
                            required
                            onChange={ e => setVrn(e.target.value)}
                        />
                        <Typography
                            variant='caption'
                            color='secondary'
                            sx={{
                                display: confirmed,
                            }}
                        >
                            click "Find Vehicle" below to get the Toll Rate 
                            for you vehicle
                        </Typography>
                        <Button
                            id='vehicle-search-btn'
                            variant='outlined'
                            color='primary'
                            sx={{
                                width: '66%',
                                mb: 5,
                                display: confirmed,
                            }}
                            onClick={handleVehicleSearch}
                        >
                            Find Vehicle
                        </Button>
                    </Card>
                </Box>
                <Box
                    sx={{
                        width: '90%',
                        gap: 2,
                        mt: 7,
                        mx: 'auto',
                        flexGrow: 1,
                    }}
                >
                    <Card
                        sx={{
                            mb: 2,
                            justifyContent: 'flex-start',
                            flexDirection: 'column',
                            alignItems: 'center',
                            height: '100%',
                            display: confirmVrn,
                        }}
                    >
                        <TextField
                            disabled
                            label='Toll Rate'
                            value={ stringTollRate }
                            sx={{
                                mt: 2,
                                width: '66%',
                            }}
                        />
                        <Typography
                            variant='caption'
                            color='secondary'
                            sx={{
                                mt:2
                            }}
                        >
                            Enter the number of Tolls you would like to pay 
                            for this vehicle below
                        </Typography>
                        <TextField
                            label='Number of Journeys'
                            type='number'
                            value={ quantity }
                            onChange= { e => setQuantity(e.target.value) }
                            sx={{
                                mt: 2,
                                width: '66%',
                            }}
                            required
                        />
                        <Typography
                            variant='caption'
                            sx={{
                                color: quantAlrtClr,
                                display: confirmed,
                            }}
                        >
                            { quantAlert }
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid
                                align='center'
                                size={{ xs: 6 }}
                            >
                                <Button
                                    id='confirm-payment-details-btn'
                                    variant='contained'
                                    color='primary'
                                    sx={{
                                        mt: 1,
                                        mb: 5,
                                    }}
                                    // onClick={handleSubmit}
                                    component={Link}
                                    to={`/payment_form`}
                                    // to={`/payment_form/${priceId}/${quantity}/${email}`}
                                >
                                    Continue
                                </Button>
                            </Grid>
                            <Grid
                                align='center'
                                size={{ xs: 6 }}
                            >
                                <Button
                                    fullWidth
                                    id='confirm-payment-details-btn'
                                    variant='outlined'
                                    color='secondary'
                                    sx={{
                                        mt: 1,
                                        mb: 5,
                                    }}
                                    component={Link} 
                                    to="/"
                                >
                                    Cancel
                                </Button>
                            </Grid>
                        </Grid>
                    </Card>
                </Box>
            </Container>
            {/* modal */}
            <Box>
                <Modal
                    open={ openModal }
                    onClose={ handleClose }
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
                                            <Typography
                                                id='modal-title'
                                            >
                                                Vehicle Details
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell
                                            colSpan={2}
                                            align='center'
                                        >
                                            <Typography
                                                id='modal-description'
                                            >
                                                Please make sure the the 
                                                details below match your 
                                                vehicle { vrn }
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
                                                onClick={ handleClose }
                                                sx={{ m: 2}}
                                            >
                                                Confirm
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
    );
}

export default PaymentSetup;