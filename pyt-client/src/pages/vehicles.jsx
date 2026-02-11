import React, { useEffect, useState } from "react";
import { Alert, Box, Button, Card, CircularProgress, Container, IconButton, List, 
    ListItem, Paper, Typography, TextField } from "@mui/material";
import AuthNavBar from "../components/AuthNavBar";


const Vehicles = () => {

    const [error, setError] = useState('')

    return (
        <>
            <AuthNavBar />
            <Container
                maxWidth='sm'
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
                </Paper>
            </Container>
        </>
    )
};

export default Vehicles;