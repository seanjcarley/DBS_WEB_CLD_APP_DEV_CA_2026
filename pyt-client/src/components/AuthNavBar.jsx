import React, { useState } from "react";
import { AppBar, Box, Button, Stack, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/authContext";

const AuthNavBar = ({onMenuClick}) => {
    const { logout, isAuthed } = useAuth();
    const nav = useNavigate();
    const [page, setPage] = useState('');
    const [loading, setLoading] = useState('');
    const [error, setError] = useState('');

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h5" sx={{ flexGrow: 1 }}>
                    Pay Your Toll!
                </Typography>
                {/* <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}> */}
                <Stack direction='row' spacing={1} alignItems='center'>
                    <Button 
                        color="inherit" 
                        component={Link} 
                        to="/account_summary"
                    >
                        Account Summary
                    </Button>
                    <Button 
                        color="inherit" 
                        component={Link} 
                        to="/vehicles"
                    >
                        Vehicles
                    </Button>
                    <Button 
                        color="inherit" 
                        component={Link} 
                        to="/account_summary"
                    >
                        Payment
                    </Button>
                    <Button 
                        color="inherit" 
                        component={Link} 
                        to="/journeys"
                    >
                        Journeys
                    </Button>
                    {isAuthed && (
                        <Button 
                            color="inherit" 
                            onClick={() => {
                                logout();
                                nav('/');
                            }}
                        >
                            Log Out
                        </Button>
                    )}
                </Stack>
                {/* </Box> */}
            </Toolbar>
        </AppBar>
    );
};

export default AuthNavBar;
