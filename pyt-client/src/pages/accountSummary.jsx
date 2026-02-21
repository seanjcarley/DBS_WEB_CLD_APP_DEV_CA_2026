import React, { useEffect, useState } from "react";
import { Box, Button, Card, CircularProgress, Container, Grid, IconButton, 
    List, ListItem, Typography, TextField, TableFooter, } from "@mui/material";
import { styled } from '@mui/material/styles'
import AuthNavBar from "../components/AuthNavBar";
import AuthSideBar from "../components/AuthSideBar";
import Validator from 'validator';
import { Link, useNavigate } from 'react-router-dom'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { apiFetch } from "../api/client";
import EditIcon from '@mui/icons-material/Edit';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';



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
       const [nameFieldDisp, setNameFieldDisp] = useState('none');
       const [nameTypoDisp, setNameTypoDisp] = useState();
       const [sname, setSname] = useState('');
       const [tempSname, setTempSname] = useState('');
       const [snameFieldDisp, setSnameFieldDisp] = useState('none');
       const [snameTypoDisp, setSnameTypoDisp] = useState('inline-flex');
       const [email, setEmail] = useState('');
       const [tempEmail, setTempEmail] = useState('');
       const [emailFieldDisp, setEmailFieldDisp] = useState('none');
       const [wmailTypoDisp, setEmailTypoDisp] = useState('inline-flex');
       const [phone, setPhone] = useState('');
       const [tempPhone, setTempPhone] = useState('');
       const [phoneFieldDisp, setPhoneFieldDisp] = useState('none');
       const [phoneTypoDisp, setPhoneTypoDisp] = useState('inline-flex');

    // used to change the styling of table rows
    const StyledTableRow = styled(TableRow)(({theme}) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.primary.contrastText,
        },
        '&:nth-of-type(even)':{
            backgroundColor: theme.palette.secondary.contrastText,
        },
    }));
    
    // set the loading state to show the spinner if required
    const [loading, setLoading] = useState(true);

    const [open, setOpen] = useState(false);
    
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
                setCustDetails(data.results[0][0]);
                setCustVehDetails(data.results[1]);
                setCustJrnDetails(data.results[2]);

            } catch (err) {
                setError(err.message || 'Failed to retrieve account details...')
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
        setSnameLabel(sname);
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

    const enableFnameEdit = () => {
        setNameFieldDisp();
        setNameTypoDisp('none');
    }
    const updateFname = () => {
        setNameFieldDisp('none');
        setNameTypoDisp();
        console.log(tempFname);
    }

    async function onSubmitPassword(e) {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await forgot_password(email, accountNumber);
            nav(`/reset_password`);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }


    if (loading) return <Box sx={{textAlign: 'center', mt: 10}}>
        <CircularProgress />
    </Box>
    return (
        <>
            <AuthNavBar onMenuClick={ () => setOpen(true) } />
            <AuthSideBar open={open} onClose={() => setOpen(false)} />
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
                <Card
                    sx={{ 
                        width: '100%',
                        mt: 3,
                        mx: 'auto',
                    }}
                >
                        <Typography 
                            variant="h5" 
                            key='greeting_name'
                            color='secondary'
                            sx={{
                                mt: 2
                            }}
                        >
                            Hello {custDetails.FIRSTNAME}
                        </Typography>
                    <Typography variant="body 2" sx={{ m: 0}}>
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
                    gap: 2,
                    mt: 4,
                    mx: 'auto',
                    flexGrow: 1,
                }}
            >
                <Grid 
                    container 
                    spacing={2}
                >
                    <Grid size={{xs: 12, md: 4}}>
                        <Card align='center'
                            sx={{
                                display: 'flex', 
                                justifyContent: 'space-between',
                                flexDirection: 'column',
                                height: '100%',
                                alignItems: 'center',
                            }}
                        >
                            <TableContainer 
                                component={Paper} 
                                sx={{ 
                                    width: '96%', 
                                    mt: 1, 
                                    }}
                                    key='pd_table_container'
                                >
                                <Table key='pd_table'>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell colSpan={3} align='center' sx={{ py: 1 }}>
                                                <Typography variant="h6" sx={{ mt: 1, }}>
                                                    Personal Details
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <StyledTableRow key='pd_fname'>
                                            <TableCell>
                                                <Typography variant="body2">
                                                    Name:
                                                </Typography>
                                            </TableCell>
                                            <TableCell
                                                sx={{ display: nameTypoDisp, }}
                                            >
                                                <Typography variant="body1">
                                                    {custDetails.FIRSTNAME}
                                                </Typography>
                                            </TableCell>
                                            <TableCell
                                                sx={{ display: nameTypoDisp, }}
                                            >
                                                <Button 
                                                    variant='outlined' 
                                                    color="secondary" 
                                                    onClick={enableFnameEdit}
                                                >
                                                    <EditIcon />
                                                </Button>
                                            </TableCell>
                                            <TableCell
                                                sx={{ display: nameFieldDisp, }}
                                            >
                                                <TextField 
                                                    sx={{  }} 
                                                    value={tempFname}
                                                    onChange={ e => setTempFname(e.target.value) } 
                                                    label={fname}
                                                />
                                            </TableCell>
                                            <TableCell
                                                sx={{ display: nameFieldDisp, }}
                                            >
                                                <Button 
                                                    variant='contained' 
                                                    color="success"
                                                    onClick={updateFname}
                                                >
                                                    <ThumbUpAltIcon />
                                                </Button>
                                            </TableCell>
                                        </StyledTableRow>
                                        <StyledTableRow key='pd_sname'>
                                            <TableCell>
                                                <Typography variant="body2">
                                                    Surname:
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="body1" sx={{ display: 'inline-flex', }}>
                                                    {custDetails.SURNAME}
                                                </Typography>
                                                <TextField 
                                                    sx={{ display: snameFieldDisp, }} />
                                            </TableCell>
                                            <TableCell>
                                                <Button variant='outlined' sx={{ display: 'inline-flex', }}>
                                                    <EditIcon />
                                                </Button>
                                            </TableCell>
                                        </StyledTableRow>
                                        <StyledTableRow key='pd_email'>
                                            <TableCell>
                                                <Typography variant="body2">
                                                    Email:
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="body1" sx={{ display: 'inline-flex', }}>
                                                    {custDetails.EMAIL}
                                                </Typography>
                                                 <TextField sx={{ display: emailFieldDisp, }} />
                                            </TableCell>
                                            <TableCell>
                                                <Button variant='outlined' color="secondary" sx={{ display: 'inline-flex', }}>
                                                    <EditIcon />
                                                </Button>
                                            </TableCell>
                                        </StyledTableRow>
                                        <StyledTableRow key='pd_phone'>
                                            <TableCell>
                                                <Typography variant="body2">
                                                    Phone
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="body1" sx={{ display: 'inline-flex', }}>
                                                    {custDetails.PHONE}
                                                </Typography>
                                                 <TextField sx={{ display: phoneFieldDisp, }} />
                                            </TableCell>
                                            <TableCell>
                                                <Button variant='outlined' sx={{ display: 'inline-flex', }}>
                                                    <EditIcon />
                                                </Button>
                                            </TableCell>
                                        </StyledTableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <Box>
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    sx={{
                                        my: 1
                                    }}
                                    onClick={
                                        onSubmitPassword
                                    }
                                >
                                    Reset Password
                                </Button>
                            </Box>
                        </Card>
                    </Grid>
                    <Grid size={{xs: 12, md: 4}}>
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
                                        width: '96%',
                                        mx: 'auto',
                                        mt: 1
                                    }}
                                    >
                                    <Table 
                                        aria-label='Vehicle Table'
                                        >
                                        <TableHead>
                                            <TableRow>
                                                <TableCell 
                                                    colSpan={3}
                                                    align='center'
                                                    >
                                                    <Typography 
                                                        variant="h6" 
                                                        sx={{ 
                                                            mt: 1,
                                                        }}
                                                        >
                                                        Vehicle Details
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell 
                                                    colSpan={3}
                                                    align='center'
                                                    >
                                                    <Typography variant="caption">
                                                        Click 'Manage Vehicles' below to add or remove vehicles
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Reg Number</TableCell>
                                                <TableCell>Make</TableCell>
                                                <TableCell>Model</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {custVehDetails.map((vehicle) => (
                                                <StyledTableRow>
                                                    <TableCell>{vehicle.VEHICLEREGNO}</TableCell>
                                                    <TableCell>{vehicle.VEHICLEMAKE}</TableCell>
                                                    <TableCell>{vehicle.VEHICLEMODEL}</TableCell>
                                                </StyledTableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Box>
                            <Box>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    sx={{ my: 1}}
                                    onClick={onSubmitVehicle}
                                >
                                    Manage Vehicles
                                </Button>
                            </Box>
                        </Card>
                    </Grid>
                    <Grid size={{xs: 12, md: 4}}>
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
                                    width: '96%',
                                    mx: 'auto',
                                    mt: 1,
                                }}
                                >
                                <Table aria-label = 'Journey Table'>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell colSpan={3} align='center'>
                                                <Typography
                                                    variant="h6" 
                                                    sx={{ 
                                                        mt: 1,
                                                    }}
                                                    >
                                                    Journey Details
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell 
                                                colSpan={3} 
                                                align='center'
                                                >
                                                <Typography variant="caption">
                                                    See the most recent journeys that are still unpaid
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Reg Number</TableCell>
                                            <TableCell>Direction</TableCell>
                                            <TableCell>Date & Time</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {custJrnDetails.map((journey) => (
                                            <StyledTableRow>
                                                <TableCell>{journey.VEHICLEREGNO}</TableCell>
                                                <TableCell>{journey.JOURNEYDIRECTION}</TableCell>
                                                <TableCell>{journey.JOURNEYDATE}</TableCell>
                                            </StyledTableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            </Box>
                            <Box>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    component={Link}
                                    to='/journeys'
                                    sx={{ my: 1}}
                                >
                                    View Journeys
                                </Button>
                            </Box>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default AccountSummary;