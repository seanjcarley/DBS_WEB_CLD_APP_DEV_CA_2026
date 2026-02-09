import React, { useState } from "react";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/authContext";

const AuthNavBar = ({onMenuClick}) => {
    const { logout } = useAuth;
    const nav = useNavigate();
    const [page, setPage] = useState('');
    const [loading, setLoading] = useState('');
    const [error, setError] = useState('');

    async function accountLogout(e) {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await logout();
            nav('/');
        } catch {
            // setError(error.message);
        } finally {
            setLoading(false);
        }
    }
    

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h5" sx={{ flexGrow: 1 }}>
                    Pay Your Toll!
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Button 
                        color="inherit" 
                        component={Link} 
                        to="/account_summary"
                    >
                        Back to Account Summary
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
                    <Button 
                        color="inherit" 
                        component={Link} 
                        to="/" 
                        onClick={accountLogout}
                    >
                        Log Out
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default AuthNavBar;
