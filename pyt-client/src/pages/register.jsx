import React, { useState } from "react";
import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, Box, 
    Button, Card, Container, Modal, Typography } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import UnauthNavBar from "../components/UnauthNavBar";
import SignupCreds from "../components/SignupCreds";
import SignupPers from "../components/SignupPers";
import SignupVhcl from "../components/SignupVhcl";
import axios from "axios";

const Register = () => {
    // handle accordions expanding and contracting
    const [expanded, setExpanded] = useState('panel1');
    const handleAccordionChange = (panel) => (e, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    // handle customer registration 
    const handleRegistration = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:8080.api/register', {
            email: '',
            passwword: '',
            fname: '',
            surname: '',
            phone: '',
            vrn: '',
        })
        console.log('Account Created!')
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
                    <AccordionDetails><SignupCreds /></AccordionDetails>
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
                    <AccordionDetails><SignupPers /></AccordionDetails>
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
                    <AccordionDetails><SignupVhcl /></AccordionDetails>
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
        </>
    );
};

export default Register;