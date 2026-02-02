import React from "react";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const AuthNavBar = ({onMenuClick}) => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h5" sx={{ flexGrow: 1 }}>
                    Pay Your Toll!
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Button color="inherit" component={Link} to="/account_summary">
                        Account Summary
                    </Button>
                    <Button color="inherit" component={Link} to="/account_summary">
                        Vehicles
                    </Button>
                    <Button color="inherit" component={Link} to="/account_summary">
                        Journeys
                    </Button>
                    <Button color="inherit" component={Link} to="/account_summary">
                        Payments
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default AuthNavBar;
