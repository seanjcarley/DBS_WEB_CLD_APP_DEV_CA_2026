import React, { useState } from "react";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const UnauthNavBar = ({onMenuClick}) => {

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
                        to="/" 
                    >
                        Home
                    </Button>
                    <Button 
                        color="inherit" 
                        component={Link} 
                        to="/register"
                    >
                        Register
                    </Button>
                    <Button 
                        color="inherit" 
                        component={Link} 
                        to="/signin"
                    >
                        Log In
                    </Button>
                    <Button 
                        color="inherit" 
                        component={Link} 
                        to="/"
                    >
                        Pay
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default UnauthNavBar;
