import React, { useState } from "react";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const UnauthNavBar = ({onMenuClick}) => {
    const [home, setHome] = useState(true);
    const [register, setRegister] = useState(false);
    const [login, setLogin] = useState(false);
    const [pay, setPay] = useState(false);

    const disableHome = () => {
        setHome(true);
        setRegister(false);
        setLogin(false);
        setPay(false);
    }

    const disableRegister = () => {
        setHome(false);
        setRegister(true);
        setLogin(false);
        setPay(false);
    }

    const disableLogin = () => {
        setHome(false);
        setRegister(false);
        setLogin(true);
        setPay(false);
    }

    const disablePay = () => {
        setHome(false);
        setRegister(false);
        setLogin(false);
        setPay(true);
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h5" sx={{ flexGrow: 1 }}>
                    Pay Your Toll!
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Button 
                        disabled={home}
                        color="inherit" 
                        component={Link} 
                        to="/" 
                        onClick={disableHome}
                    >
                        Home
                    </Button>
                    <Button 
                        disabled={register}
                        color="inherit" 
                        component={Link} 
                        to="/register"
                        onClick={disableRegister}
                    >
                        Register
                    </Button>
                    <Button 
                        disabled={login}
                        color="inherit" 
                        component={Link} 
                        to="/signin"
                        onClick={disableLogin}
                    >
                        Log In
                    </Button>
                    <Button 
                        disabled={pay}
                        color="inherit" 
                        component={Link} 
                        to="/"
                        onClick={disablePay}
                    >
                        Pay
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default UnauthNavBar;
