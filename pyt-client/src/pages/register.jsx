import React, { useEffect, useRef, useState } from "react";
import { Accordion, AccordionDetails, AccordionSummary, 
    Alert, Box, Button, Card, Container, List, ListItem, Modal, Paper, 
    TextField, Typography, Table, TableBody, TableCell, TableContainer, 
    TableFooter, TableHead, TableRow, } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import UnauthNavBar from "../components/UnauthNavBar";
import Validator from 'validator';
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../api/client";
import { useAuth } from "../auth/authContext";
import UnauthSideBar from "../components/UnauthSideBar";

export default function Register() {
    const nav = useNavigate();
    const { login } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState('');
    const [open, setOpen] = useState(false);

    // variables to hold email, password and confirm password entries for 
    // various validation checks
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cnfpwd, setCnfpw] = useState('');

    // variables to hold personal details
    const [fname, setFname] = useState('');
    const [surname, setSurname] = useState('');
    const [phone, setPhone] = useState('');

    // variables to hold vehicle details
    const [vrn, setVrn] = useState('');
    const [vehDetails, setVehDetails] = useState('');

    // variables for validation error alerts
    const [emailAlert, setEmailAlert] = useState('');
    const [emlAlrtClr, setEmlAlrtClr] = useState('');
    const [pwrdAlert, setPwrdAlert] = useState('');
    const [pwrdAlrtClr, setPwrdAlrtClr] = useState('')
    const [cnfpwAlert, setCnfpwAlert] = useState('');
    const [cnfpwAlrtClr, setCnfpwAlrtClr] = useState('');

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
    
    // handle accordions expanding and contracting
    const [expanded, setExpanded] = useState('panel1');
    const handleAccordionChange = (panel) => (e, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    
    // validate that the provided email address is in a valid email format
    const validateEmail = (email) => {
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
    
    // validate that the provided password meet minimum requirements
    const validatePwd = (password) => {
        if (Validator.isStrongPassword(password)) {
            setPassword(password);
            setPwrdAlert('Password meets minimum requirements!');
            setPwrdAlrtClr('green');
        } else {
            setPassword('');
            setPwrdAlert('Password does not meet minimum requirements!');
            setPwrdAlrtClr('red');
        }
    };
    
    // validate that the provided passwords match
    const validatePwdMatch = (cnfpwd) => {
        if (cnfpwd === password) {
            setCnfpwAlert('Passwords match!');
            setCnfpwAlrtClr('green');
            setCnfpw('match')
        } else {
            setCnfpwAlert('Passwords do not match!');
            setCnfpwAlrtClr('red');
        }
    };

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
            // console.log(data.results[0][0].VEHICLEMAKE);
            setVehDetails(data.results[0][0]);

            handleOpen();
        } catch (err) {
            setError (err.message || 'Vehicle not found...');
        } finally {
            setLoading(false);
        }
    }

    // create the user
    async function onSubmit(e) {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const payload = {
                password: password,
                email: email,
                fname: fname,
                surname: surname,
                phone: phone,
                vrn: vrn,
            }
            // used for debug (to be commented/removed)
            // console.log(payload);
            // register user
            await apiFetch('/api/auth/register', {
                method: 'POST',
                auth: false,
                body: payload,
            });
            // auto-login 
            await login(payload.email, password);
            nav('/account_summary');
        } catch (err) {
            setError(err.message || 'Registration Failed...');
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <UnauthNavBar onMenuClick={ () => setOpen(true) } />
            <UnauthSideBar open={open} onClose={() => setOpen(false)} />
            <Container
                maxWidth='sm'
                sx={{ mt: 10}}
            >
                <Card>
                    <Typography variant="h4" align="center" sx={{ mt: 2 }}>
                        Sign Up with us to Save on your Tolls!
                    </Typography>

                    {error && (
                        <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>
                    )}

                    {/* accordion 1 - Login Credentials  */}
                    <Accordion
                        defaultExpanded='true'
                        expanded={expanded === 'panel1'}
                        onChange={handleAccordionChange('panel1')}
                        sx={{ mt: 2 }}
                        id='acc-creds'
                    >
                        <AccordionSummary
                            expandIcon={<ArrowDropDownIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                        >
                            <Typography component='span'>
                                Set your Login Credentials
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <TextField
                                fullWidth
                                sx={{ mt: 2 }}
                                label='Email'
                                type="email"
                                required
                                onChange={ e => validateEmail(e.target.value)}
                                />
                            <Typography 
                                variant="caption" 
                                sx={{ 
                                    color: emlAlrtClr 
                                }}
                            >
                                { emailAlert }
                            </Typography>
                            
                            <TextField
                                fullWidth
                                sx={{ mt: 2 }}
                                label='Password'
                                type="password"
                                required
                                onChange={ e => validatePwd(e.target.value)}
                                />
                            <Typography 
                                variant="caption" 
                                sx={{ 
                                    color: pwrdAlrtClr 
                                }
                            }>
                                { pwrdAlert }
                            </Typography>
                        
                            <TextField
                                fullWidth
                                sx={{ mt: 2 }}
                                label='Confirm Password'
                                type="password"
                                required
                                onChange={ e => validatePwdMatch(e.target.value)}
                            />
                            <Typography 
                                variant="caption" 
                                sx={{ 
                                    color: cnfpwAlrtClr 
                                }}
                            >
                                { cnfpwAlert }
                            </Typography>
                        </AccordionDetails>
                    </Accordion>

                    {/* accordion 2 - Personal Details  */}
                    <Accordion
                        defaultExpanded='true'
                        expanded={expanded === 'panel2'}
                        onChange={handleAccordionChange('panel2')}
                        sx={{ mt: 2 }}
                        id='acc-pers'
                        >
                        <AccordionSummary
                            expandIcon={<ArrowDropDownIcon />}
                            aria-controls="panel2-content"
                            id="panel2-header"
                            >
                            <Typography component='span'>
                                Add your Personal Details
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <TextField
                                fullWidth
                                required
                                label='First Name'
                                onChange={ e => setFname(e.target.value) }
                                sx={{ mt: 1 }}
                                />

                            <TextField
                                fullWidth
                                required
                                label='Surname'
                                onChange={ e => setSurname(e.target.value) }
                                sx={{ mt: 1 }}
                                />

                            <TextField
                                fullWidth
                                required
                                label='Phone'
                                type='tel'
                                onChange={ e => setPhone(e.target.value) }
                                sx={{ mt: 1 }}
                                />
                        </AccordionDetails>
                    </Accordion>

                    {/* accordion 3 - Vehicle Details  */}
                    <Accordion
                        defaultExpanded='true'
                        expanded={expanded === 'panel3'}
                        onChange={handleAccordionChange('panel3')}
                        sx={{ mt: 2 }}
                        id='acc-veh'
                        >
                        <AccordionSummary
                            expandIcon={<ArrowDropDownIcon />}
                            aria-controls="panel3-content"
                            id="panel3-header"
                            >
                            <Typography component='span'>
                                Add your Vehicle Details
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box
                                sx={{
                                    width: '100%',
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(2, minmax(min(200px, 50%), 1fr))',
                                    gap: 2
                                }}
                            >
                                <TextField
                                    label='Vehicle Registration Number (VRN)'
                                    value={vrn}
                                    onChange={ e => setVrn(e.target.value) }
                                    sx={{ mt: 1}}
                                    required
                                />
                                <Button
                                    id="vehicle-search-btn"
                                    variant="contained"
                                    color="primary"
                                    onClick={handleVehicleSearch}
                                >
                                    Find Vehicle
                                </Button>
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                    <Box
                        align='center'
                        sx={{ 
                            width: '100%' 
                        }}    
                    >
                        <Button
                            variant="contained"
                            color="secondary"
                            sx={{ mt: 2 }}
                            onClick={onSubmit}
                            >
                            Register
                        </Button>
                    </Box>
                </Card>
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
            </Box>
        </>
    );
};

// export default Register;