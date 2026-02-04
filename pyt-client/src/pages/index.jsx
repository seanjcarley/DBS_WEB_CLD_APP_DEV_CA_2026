import React, { useState } from 'react';
import { Box, Button, Card, CardContent, Container, Typography } from '@mui/material';
import UnauthNavBar from '../components/UnauthNavBar';
import { Link } from 'react-router-dom';

const Index = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <UnauthNavBar onMenuClick={ () => setOpen(true) } />
            <Container
                maxWidth='md'
                sx={{ mt: 10}}
            >
                <Typography 
                    variant='h2' 
                    align='center'
                >
                    Welcome to Pay your Toll!
                </Typography>
                <Card sx={{ mb: 3 }}>
                    <CardContent>
                        <Typography variant='subtitle1'align='center'>
                            At Pay Your Toll, you can easilly pay for a trip 
                            you have made, or will make, on the M50 Toll Road. 
                            You can also register your details allowing you to 
                            save upto €1.00 per trip.
                        </Typography>
                    </CardContent>
                </Card>
                <Box
                    sx={{ 
                        width: '100%',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, minmax(min(200px, 33%), 1fr))',
                        gap: 2,
                        mt: 10,
                    }}
                >
                    <Card sx={{ mb: 2 }}>
                        <CardContent align='center'>
                            <Typography variant='subtitle1' sx={{ mt: 2 }}>
                                Have you made a trip, or are you planning on 
                                making one?
                            </Typography>
                            <Button
                                fullWidth
                                variant='contained'
                                color='secondary'
                                sx={{ mt: 2, mb: 2 }}
                            >
                                <Typography variant='button'>
                                    Make a Payment
                                </Typography>
                            </Button>
                            <Typography variant='caption'>
                                you will need your Vehicle Registration Number 
                                and your Credit/Debit Card
                            </Typography>
                        </CardContent>
                    </Card>
                    <Card sx={{ mb: 2 }}>
                        <CardContent align='center'>
                            <Typography variant='subtitle1' sx={{ mt: 2 }}>
                                Register your details with us to make paying 
                                your toll easier.
                            </Typography>
                            <Button
                                fullWidth
                                variant='contained'
                                sx={{ mt: 2 }}
                                component={Link} 
                                to="/register"
                            >
                                Register
                            </Button>
                        </CardContent>
                    </Card>
                    <Card sx={{ mb: 2 }}>
                        <CardContent align='center'>
                            <Typography variant='subtitle1' sx={{ mt: 3 }}>
                                Already registered?
                            </Typography>
                            <Button
                                fullWidth
                                variant='outlined'
                                color='secondary'
                                sx={{ mt: 4.5 }}
                                component={Link} 
                                to="/signin"
                            >
                                Log In
                            </Button>
                        </CardContent>
                    </Card>
                </Box>
            </Container>
        </>
    )
}

export default Index;
