import React, { useEffect, useState } from "react";
import { Box, Button, Card, CircularProgress, Container, IconButton, List, 
    ListItem, Typography, TextField } from "@mui/material";
import AuthNavBar from "../components/AuthNavBar";
import Validator from 'validator';
import { Link, useNavigate } from 'react-router-dom'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { apiFetch } from "../api/client";



const AccountSummary = () => {
    // variables to store account summary results
    const [custDetails, setCustDetails] = useState([]);
    const [custVehDetails, setCustVehDetails] = useState([]);
    const [custJrnDetails, setCustJrnDetails] = useState([]);
    
    // variables to set visibility of customer details edit buttons
    const [detailsBtnDisplay, setDetailsBtnDisplay] = useState('inline-flex')
    const [saveBtnDisplay, setSaveBtnDisplay] = useState('none')
    
    // variables for validation error alerts
    const [emailAlert, setEmailAlert] = useState('');
    const [emlAlrtClr, setEmlAlrtClr] = useState('');
    
    // set the customer details variables
    const [fname, setFname] = useState('');
    const [tempFname, setTempFname] = useState('');
    const [fnameLabel, setFnameLabel] = useState('First Name');
    const [surname, setSurname] = useState('');
    const [tempSname, setTempSname] = useState('');
    const [snameLabel, setSnameLabel] = useState('Surname');
    const [email, setEmail] = useState('');
    const [tempEmail, setTempEmail] = useState('');
    const [emailLabel, setEmailLabel] = useState('Email');
    const [phone, setPhone] = useState('');
    const [tempPhone, setTempPhone] = useState('');
    const [phoneLabel, setPhoneLabel] = useState('Phone');
    
    // set the loading state to show the spinner if required
    const [loading, setLoading] = useState(true);
    
    // set the token and custID variables
    const token = localStorage.getItem('token');
    const custID = localStorage.getItem('id');

    const [error, setError] = useState('')
    const nav = useNavigate();
    
    // get the users details
    useEffect(() => {
        async function fetchAccountData(e) {
            // e.preventDefault();
            setError('');
            setLoading(true);
            
            try {
                const payload = {
                    id: custID,
                }
                const data = await apiFetch('/api/auth/account_summary', {
                    method: 'POST',
                    auth: true,
                    body: payload,
                });
                setCustDetails(data.results[0]);
                setCustVehDetails(data.results[1]);
                setCustJrnDetails(data.results[2]);
            } catch {
                setError(error.message || 'Failed to retrieve account details...')
            } finally {
                setLoading(false);
            }
        }
        fetchAccountData();
    }, []);
        
    const editDetails = () => {
        setFname(custDetails[0].FIRSTNAME);
        setSurname(custDetails[0].SURNAME);
        setEmail(custDetails[0].EMAIL);
        setPhone(custDetails[0].Phone);
        setDetailsBtnDisplay('none');
        setSaveBtnDisplay('inline-flex');
        setFnameLabel(fname);
        setSnameLabel(surname);
        setEmailLabel(email);
        setPhoneLabel(phone);
    };

    const saveDetails = () => {
        setDetailsBtnDisplay('inline-flex');
        setSaveBtnDisplay('none');
        setFnameLabel('First Name');
        setSnameLabel('Surname');
        setEmailLabel('Email');
        setPhone('Phone');
        setFname(tempFname);
        setSurname(tempSname);
        setEmail(tempEmail);
        setPhone(tempPhone);
    };

    const validateEmail = (email) => {
        if (Validator.isEmail(email)) {
            setTempEmail(email);
            setEmailAlert('Valid Email Address Format!');
            setEmlAlrtClr('green');
        } else {
            setTempEmail('');
            setEmailAlert('Enter a Valid Email Address!');
            setEmlAlrtClr('red');
        }
    };

    async function onSubmitVehicle(e) {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await apiFetch('/api/vehicles/vehicles', {
                method: 'POST',
                auth: true,
                body: {id: custID,},
            });
            nav(`/vehicles`);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false)
        }
    }


    if (loading) return <Box sx={{textAlign: 'center', mt: 10}}>
        <CircularProgress />
    </Box>
    return (
        <>
            <AuthNavBar />
            <Typography 
                variant="h3"
                align="center"
                color='primary'
                sx={{ 
                    mt: 3,
                }}
            >
                Account Summary
            </Typography>
            <Box 
                align='center'
                sx={{
                    width: '90%',
                    mt:2,
                    placeItems: 'center',
                    mx: 'auto'
                }}
            >
                {custDetails.map((detail) => (
                    <Typography 
                        variant="h5" 
                        key='greeting_name'
                        color='secondary'
                    >
                        Hello {detail.FIRSTNAME}!
                    </Typography>
                ))}
                <Card
                    sx={{ 
                        width: '100%',
                        mt: 3,
                        mx: 'auto',
                    }}
                >
                    <Typography variant="body 2" sx={{ m: 2}}>
                        <p>This page shows an overview of the current status of your 
                        account.</p>
                        <p>You can view more details and update your account 
                        by going to the relevant section.</p>
                    </Typography>
                </Card>
            </Box>
            <Box
                sx={{
                    width: '90%',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, minmax(min(200px, 33%), 1fr))',
                    gap: 2,
                    mt: 7,
                    mx: 'auto',
                }}
            >
                <Card align='center'
                    sx={{
                        display: 'flex', 
                        justifyContent: 'space-between',
                        flexDirection: 'column',
                    }}
                >
                    <Typography 
                        variant="h6" 
                        sx={{ 
                            mt: 1
                        }}
                    >
                        Personal Details
                    </Typography>
                    <Box>
                        {custDetails.map((detail) => (
                            <>
                                <TextField
                                    label={fnameLabel}
                                    sx={{ 
                                        mt: 1, 
                                        display: saveBtnDisplay,
                                        width: '80%' 
                                    }}
                                    value=''
                                    onChange={ 
                                        e => setTempFname(e.target.value) 
                                    }
                                />
                                <TextField
                                    label={snameLabel}
                                    sx={{ 
                                        mt: 1, 
                                        display: saveBtnDisplay,
                                        width: '80%' 
                                    }}
                                    value=''
                                    onChange={ 
                                        e => setTempSname(e.target.value) 
                                    }
                                />
                                <TextField
                                    sx={{ 
                                        mt: 2, 
                                        display: saveBtnDisplay,
                                        width: '80%' 
                                    }}
                                    label={emailLabel}
                                    type="email"
                                    value=''
                                    onChange={ 
                                        e => validateEmail(e.target.value)
                                    }
                                />
                                <Typography 
                                    variant="caption" 
                                    sx={{ 
                                        display: saveBtnDisplay,
                                        color: emlAlrtClr 
                                    }}
                                >
                                    {emailAlert}
                                </Typography>
                                <TextField
                                    label={phoneLabel}
                                    type='tel'
                                    sx={{ 
                                        mt: 1, 
                                        display: saveBtnDisplay,
                                        width: '80%' 
                                    }}
                                    value=''
                                    onChange={ 
                                        e => setTempPhone(e.target.value) 
                                    }
                                />
                                {/*  */}
                                <TextField
                                    label={fnameLabel}
                                    sx={{ 
                                        mt: 1, 
                                        display: detailsBtnDisplay,
                                        width: '80%' 
                                    }}
                                    value={detail.FIRSTNAME}
                                    disabled
                                />
                                <TextField
                                    label={snameLabel}
                                    sx={{ 
                                        mt: 1, 
                                        display: detailsBtnDisplay,
                                        width: '80%' 
                                    }}
                                    value={detail.SURNAME}
                                    disabled
                                />
                                <TextField
                                    sx={{ 
                                        my: 2, 
                                        display: detailsBtnDisplay,
                                        width: '80%' 
                                    }}
                                    label={emailLabel}
                                    type="email"
                                    value={detail.EMAIL}
                                    disabled
                                />
                                <TextField
                                    label={phoneLabel}
                                    type='tel'
                                    sx={{ 
                                        mt: 1, 
                                        display: detailsBtnDisplay,
                                        width: '80%'
                                    }}
                                    value={detail.PHONE}
                                    disabled
                                    
                                />
                            </>
                        ))}
                        <Box sx={{ m: 2 }}>
                            <Button
                                variant="outlined"
                                color="secondary"
                                sx={{
                                    display: detailsBtnDisplay,
                                }}
                                onClick={editDetails}
                            >
                                Edit Details
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{
                                    display: saveBtnDisplay,
                                    m: 1,
                                }}
                                onClick={saveDetails}
                            >
                                Update Details
                            </Button>
                            <Button
                                variant="outlined"
                                color="primary"
                                sx={{
                                    display: saveBtnDisplay,
                                    m: 1,
                                }}
                                onClick={saveDetails}
                            >
                                Cancel
                            </Button>
                        </Box>
                    </Box>
                </Card>
                <Card 
                    align='center'
                    sx={{
                        display: 'flex', 
                        justifyContent: 'space-between',
                        flexDirection: 'column',
                    }}
                >                   
                    <Typography 
                        variant="h6" 
                        sx={{ 
                            mt: 1,
                        }}
                    >
                        Vehicle Details
                    </Typography>
                    <Typography variant="caption">
                        Click 'Manage Vehicles' below to add or remove vehicles
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table aria-label = 'Vehicle Table'>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Reg Number</TableCell>
                                    <TableCell>Make</TableCell>
                                    <TableCell>Model</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {custVehDetails.map((vehicle) => (
                                    <TableRow>
                                        <TableCell>{vehicle.VEHICLEREGNO}</TableCell>
                                        <TableCell>{vehicle.VEHICLEMAKE}</TableCell>
                                        <TableCell>{vehicle.VEHICLEMODEL}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Box sx={{ m: 2, }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={onSubmitVehicle}
                        >
                            Manage Vehicles
                        </Button>
                    </Box>
                </Card>
                <Card 
                    align='center'
                    sx={{
                        display: 'flex', 
                        justifyContent: 'space-between',
                        flexDirection: 'column',
                    }}
                >
                    <Typography
                        variant="h6" 
                        sx={{ 
                            mt: 1,
                        }}
                    >
                        Journey Details
                    </Typography>
                    <Typography variant="caption">
                        See the most recent journeys that are still unpaid
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table aria-label = 'Journey Table'>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Reg Number</TableCell>
                                    <TableCell>Direction</TableCell>
                                    <TableCell>Date & Time</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {custJrnDetails.map((journey) => (
                                    <TableRow>
                                        <TableCell>{journey.VEHICLEREGNO}</TableCell>
                                        <TableCell>{journey.JOURNEYDIRECTION}</TableCell>
                                        <TableCell>{journey.JOURNEYDATE}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Box sx={{ 
                            m: 2,
                        }}
                        
                    >
                        <Button
                            variant="contained"
                            color="secondary"
                            component={Link}
                            to='/journeys'
                        >
                            View Journeys
                        </Button>
                    </Box>
                </Card>
            </Box>
        </>
    );
};

export default AccountSummary;