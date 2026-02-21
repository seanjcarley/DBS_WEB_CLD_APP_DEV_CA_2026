import React, { useState } from 'react';
import { Box, Button, Card, CardContent, Container, Grid, 
    Typography } from '@mui/material';
import UnauthNavBar from '../components/UnauthNavBar';
import UnauthSideBar from '../components/UnauthSideBar';
import { Link } from 'react-router-dom';

const Index = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <UnauthNavBar onMenuClick={ () => setOpen(true) } />
            <UnauthSideBar open={open} onClose={() => setOpen(false)} />
            <Container
                maxWidth='lg'
                sx={{ mt: 10}}
            >
                <Typography 
                    variant='h2' 
                    align='center'
                    color='primary'
                >
                    Welcome to Pay your Toll!
                </Typography>
                <Box
                    sx={{ 
                        width: '95%',
                        gap: 2,
                        mt: 7,
                        mx: 'auto',
                        flexGrow: 1,
                    }}
                >
                    <Card sx={{ mb: 3 }}>
                        <CardContent>
                            <Typography variant='subtitle1'align='center'>
                                At Pay Your Toll, you can easilly pay for a trip 
                                you have made, or will make, on the Toll Road. 
                                You can also register your details allowing you to 
                                save up to €1.00 per trip.
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>
                <Box
                    sx={{ 
                        width: '95%',
                        gap: 2,
                        mt: 7,
                        mx: 'auto',
                        flexGrow: 1,
                    }}
                >
                    <Grid 
                        container spacing={2}
                    >
                        <Grid 
                            size={{ xs: 10, md: 4 }}
                            offset={{ xs: 1, md: 0 }}
                            align='center'
                        >
                            <Card sx={{ 
                                    mb: 2, 
                                    display: 'flex', 
                                    justifyContent: 'flex-start',
                                    flexDirection: 'column',
                                    height: '100%',
                                }}
                            >
                                <CardContent align='center'>
                                    <Button
                                        fullWidth
                                        variant='contained'
                                        color='secondary'
                                        sx={{ 
                                            mt: 1, 
                                            height: '5rem'
                                        }}
                                        component={Link} 
                                        to="/payments"
                                    >
                                        <Typography variant='button'>
                                            Make a Payment
                                        </Typography>
                                    </Button>
                                    <Typography 
                                        variant='subtitle1' 
                                        sx={{ mt: 2 }}
                                    >
                                        Have you made a trip, or are you planning on 
                                        making one?
                                    </Typography>
                                    <Typography variant='caption'>
                                        you will need your Vehicle Registration Number 
                                        and your Credit/Debit Card
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid 
                            size={{ xs: 10, md: 4 }}
                            offset={{ xs: 1, md: 0 }}
                            align='center'
                        >
                            <Card 
                                sx={{ 
                                    mb: 1,
                                    display: 'flex', 
                                    justifyContent: 'flex-start',
                                    flexDirection: 'column',
                                    height: '100%',
                                }}
                            >
                                <CardContent align='center'>
                                    <Button
                                        fullWidth
                                        variant='contained'
                                        sx={{ 
                                            mt: 1,
                                            height: '5rem',                                        }}
                                        component={Link} 
                                        to="/register"
                                    >
                                        Register
                                    </Button>
                                    <Typography 
                                        variant='subtitle1' 
                                        sx={{ mt: 2 }}
                                    >
                                        Register your details with us to make paying 
                                        your toll easier.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid 
                            size={{ xs: 10, md: 4 }}
                            offset={{ xs: 1, md: 0 }}
                            align='center'
                        >
                            <Card 
                                sx={{ 
                                    mb: 2,
                                    display: 'flex', 
                                    justifyContent: 'flex-start',
                                    flexDirection: 'column',
                                    height: '100%',
                                }}
                                
                            >
                                <CardContent align='center'>
                                    <Button
                                        fullWidth
                                        variant='outlined'
                                        color='secondary'
                                        sx={{ 
                                            mt: 1,
                                            height: '5rem'
                                        }}
                                        component={Link} 
                                        to="/signin"
                                    >
                                        Log In
                                    </Button>
                                    <Typography 
                                        variant='subtitle1' 
                                        sx={{ mt: 2 }}>
                                        Already registered?
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </>
    )
}

export default Index;
