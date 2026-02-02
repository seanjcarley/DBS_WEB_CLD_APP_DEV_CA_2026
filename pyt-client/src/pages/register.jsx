import React, { useEffect, useState } from "react";
import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, Alert, 
    Box, Button, Card, Container, List, ListItem, Modal, TextField, Typography } 
from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import UnauthNavBar from "../components/UnauthNavBar";
import axios from "axios";
import Validator from 'validator';
import { useNavigate } from "react-router-dom";

const Register = () => {
    // handle accordions expanding and contracting
    const [expanded, setExpanded] = useState('panel1');
    const handleAccordionChange = (panel) => (e, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const navigate = useNavigate();
    const [error, setError] = useState('');

    // variables to hold email, password and confirm password entries for 
    // various validation checks
    const [email, setEmail] = useState('');
    const [pwrd, setPwrd] = useState('');
    const [cnfpwd, setCnfpw] = useState('');
    // variables to hold personal details
    const [fname, setFname] = useState('');
    const [surname, setSurname] = useState('');
    const [phone, setPhone] = useState('');
    // variables to hold vehicle details
    const [vrn, setVrn] = useState('')
    const [details, setDetails] = useState([]);
    // variables for validation error alerts
    const [emailAlert, setEmailAlert] = useState('');
    const [emlAlrtClr, setEmlAlrtClr] = useState('')
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
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


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

    // validate that the provided passwordmeets minimum requirements
    const validatePwd = (password) => {
        if (Validator.isStrongPassword(password)) {
            setPwrd(password);
            setPwrdAlert('Password meets minimum requirements!');
            setPwrdAlrtClr('green');
        } else {
            setPwrd('');
            setPwrdAlert('Password does not meet minimum requirements!');
            setPwrdAlrtClr('red');
        }
    };

    // validate that the provided passwords match
    const validatePwdMatch = (cnfpwd) => {
        if (cnfpwd === pwrd) {
            setCnfpwAlert('Passwords match!');
            setCnfpwAlrtClr('green');
            setCnfpw('match')
        } else {
            setCnfpwAlert('Passwords do not match!');
            setCnfpwAlrtClr('red');
        }
    };

    // handle vehicle search
    const handleVehicleSearch = async (e) => {
        e.preventDefault();
        const res = await axios.post('http://localhost:5000/api/vehicle_search'
            , {vrn: vrn});
        
        setDetails(res.data);
        setOpen(true);

    };

    // handle customer registration 
    const handleRegistration = async (e) => {
        e.preventDefault();
        
        if (!email || !pwrd || !cnfpwd || !fname || !surname || ! phone || !vrn) {
            setError('Please fill in all required fields!');
            return;
        }
        
        await axios.post('http://localhost:5000/api/register', {
            email: email,
            password: pwrd,
            fname: fname,
            surname: surname,
            phone: phone,
            vrn: vrn,
        })
        navigate('/account_summary');
    };

    return (
        <>
            <UnauthNavBar onMenuClick={ () => setOpen(true) } />
            <Container
                maxWidth='sm'
                sx={{ mt: 10}}
            >
                <Typography variant="h4" align="center" sx={{ mt: 2 }}>
                    Sign Up with us to Save on your Tolls!
                </Typography>
                
                {error && (
                    <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>
                )}

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
                        <Typography variant="caption" sx={{ color: emlAlrtClr }}>
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
                        <Typography variant="caption" sx={{ color: pwrdAlrtClr }}>
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
                        <Typography variant="caption" sx={{ color: cnfpwAlrtClr }}>
                            { cnfpwAlert }
                        </Typography>
                    </AccordionDetails>
                </Accordion>

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
                    sx={{ width: '100%' }}
                    
                >
                    <Button
                        variant="contained"
                        color="secondary"
                        sx={{ mt: 2 }}
                        onClick={handleRegistration}
                    >
                        Register
                    </Button>
                </Box>
            </Container>
            <Container>
                <Modal
                    open={open}
                    onClose={ handleClose }
                    aria-labelledby='modal-title'
                    aria-describedby='modal-description'
                >
                    <Box sx={ style }>
                        <Typography
                            id='modal-title'
                            variant="h5"
                            component='h2'
                            sx={{ m: 5}}
                        >
                            Vehicle Details

                        </Typography>
                        <Typography
                            id='modal-description'
                            variant="body1"
                            sx={{ m: 5}}
                        >
                            Please check that the details below match your 
                            vehicle { vrn }: 
                        </Typography>
                        <List>
                            <ListItem>
                                Vehicle Make: { details.VEHICLEMAKE}
                            </ListItem>
                            <ListItem>
                                Vehicle Model: { details.VEHICLEMODEL }
                            </ListItem>
                            <ListItem>
                                Vehicle Colour: { details.VEHICLECOLOUR }
                            </ListItem>
                            <ListItem>
                                Vehicle Class: { details.VEHICLECLASS }
                            </ListItem>
                        </List>
                        <Box align='center'>
                            <Button 
                                variant="contained" 
                                color="success"
                                onClick={ handleClose }
                                sx={{ m: 2}}
                            >
                                Details Are Correct
                            </Button>
                            <Button 
                                variant="outlined" 
                                color="error"
                                onClick={ handleClose }
                                sx={{ m: 2}}
                            >
                                Re-enter Details
                            </Button>
                        </Box>
                    </Box>
                </Modal>
            </Container>
        </>
    );
};

export default Register;