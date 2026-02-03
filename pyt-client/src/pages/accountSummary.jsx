import React, { useEffect, useState } from "react";
import { Box, Button, Card, CircularProgress, Container, List, ListItem, Typography, 
    TextField } from "@mui/material";
import AuthNavBar from "../components/AuthNavBar";
import axios from "axios";

const AccountSummary = () => {
    const [custDetails, setCustDetails] = useState([]);
    const [custVehDetails, setCustVehDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');
    const custID = localStorage.getItem('ID');
    
    // get the users details
    useEffect( () => {
        axios.post(`http://localhost:5000/api/account_summary_1/:${custID}`, {}, 
            {headers: { Authorization: `Bearer ${token}` }}
        ).then((res) => {
            setCustDetails(res.data);
            fetchVehicleDetails();
        });
    }, []);

    // get list of vehicles registered to account (limit 5 for account summary)
    const fetchVehicleDetails = async () => {
        const res = await axios.post(
            `http://localhost:5000/api/account_summary_2/:${custID}`, {}, 
            {headers: { Authorization: `Bearer ${token}`}
        });

        setCustVehDetails(res.data);
        setLoading(false);
    };

    // const fetchJourneyDetails = async () => {};
    // const fetchPaymentDetails = async () => {};

    if (loading) return <Box sx={{textAlign: 'center', mt: 10}}>
        <CircularProgress />
    </Box>
    return (
        <>
            <AuthNavBar />
            <Typography 
                variant="h3"
                align="center"
                sx={{ mt: 3 }}
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
                {custDetails.map((detail) =>(
                    <Typography variant="h5" key='greeting_name'>
                        Hello {detail.FIRSTNAME}!
                    </Typography>
                ))}
                <Card
                    sx={{ 
                        width: '100%',
                        mt: 5,
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
                    mt: 10,
                    mx: 'auto'
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
                    {custDetails.map((detail) =>(
                        <Box>
                            <TextField
                                label='First Name'
                                sx={{ mt: 1, width: '80%' }}
                                value={detail.FIRSTNAME}
                                disabled
                            />
                            <TextField
                                label='Surname'
                                sx={{ mt: 1, width: '80%' }}
                                value={detail.SURNAME}
                                disabled
                            />
                            <TextField
                                sx={{ mt: 2, width: '80%' }}
                                label='Email'
                                type="email"
                                value={detail.EMAIL}
                                disabled
                            />
                            <TextField
                                label='Phone'
                                type='tel'
                                sx={{ mt: 1, width: '80%' }}
                                value={detail.PHONE}
                                disabled
                            />
                            <Box sx={{ m: 2 }}>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                >
                                    Edit Details
                                </Button>
                            </Box>
                        </Box>)
                    )}
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
                    <List>
                        <ListItem
                            key='vehicle-headers'
                                sx={{
                                    width: '100%',
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(3, minmax(min(200px, 33%), 1fr))',
                                    gap: 1,
                                    mt: 2,
                                }}
                        >
                            <Card align='center' sx={{ p: 1 }}>
                                <Typography variant="subtitle2">
                                    Reg No
                                </Typography>
                            </Card>
                            <Card align='center' sx={{ p: 1 }}>
                                <Typography variant="subtitle2">
                                    Make
                                </Typography>
                            </Card>
                            <Card align='center' sx={{ p: 1 }}>
                                <Typography variant="subtitle2">
                                    Model
                                </Typography>
                            </Card>

                        </ListItem>
                        {custVehDetails.map((vehicle) => (
                            <ListItem 
                                key={vehicle.VEHICLEREGNO}
                                sx={{
                                    width: '100%',
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(3, minmax(min(200px, 33%), 1fr))',
                                    gap: 1,
                                    mt: 1,
                                }}
                            >
                                <Card align='center' sx={{ p: 1, typography: 'body2' }}>{vehicle.VEHICLEREGNO}</Card>
                                <Card align='center' sx={{ p: 1, typography: 'body2'  }}>{vehicle.VEHICLEMAKE}</Card>
                                <Card align='center' sx={{ p: 1, typography: 'body2'  }}>{vehicle.VEHICLEMODEL}</Card>
                            </ListItem>
                        ))}
                    </List>
                    <Box sx={{ 
                            m: 2,
                        }}
                        
                    >
                        <Button
                            variant="contained"
                            color="secondary"
                        >
                            Manage Vehicles
                        </Button>
                    </Box>
                </Card>
                <Card align='center'>
                    <Typography>Journey Details</Typography>
                </Card>
            </Box>
        </>
    );
};

export default AccountSummary;