import React from "react";
import { AppBar, Box, Button, IconButton, Toolbar, 
    Typography } from "@mui/material";
import { Link } from "react-router-dom";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useThemeMode } from "../theme/ThemeModeProvider";
import MenuIcon from '@mui/icons-material/Menu';

const UnauthNavBar = ({onMenuClick}) => {

    const { mode, toggleMode } = useThemeMode();

    return (
        <AppBar position="static" elevation={0}>
            <Toolbar sx={{ gap: 2 }}>
                <Typography variant="h5" sx={{ flexGrow: 1 }}>
                    Pay Your Toll!
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Button 
                        color="inherit" 
                        component={Link} 
                        to="/"
                        sx={{
                            display: {xs: 'none', md: 'block'}
                        }}
                    >
                        Home
                    </Button>
                    <Button 
                        color="inherit" 
                        component={Link} 
                        to="/register"
                        sx={{
                            display: {xs: 'none', md: 'block'}
                        }}
                    >
                        Register
                    </Button>
                    <Button 
                        color="inherit" 
                        component={Link} 
                        to="/signin"
                        sx={{
                            display: {xs: 'none', md: 'block'}
                        }}
                    >
                        Log In
                    </Button>
                    <Button 
                        color="inherit" 
                        component={Link} 
                        to="/"
                        sx={{
                            display: {xs: 'none', md: 'block'}
                        }}
                    >
                        Pay
                    </Button>
                    <IconButton 
                        color='inherit' 
                        onClick={toggleMode} 
                        aria-label='Toggle Theme'
                        sx={{
                            display: {xs: 'none', md: 'block'}
                        }}
                    >
                        {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
                    </IconButton>
                    <IconButton 
                        edge='end' 
                        color='inherit' 
                        onClick={onMenuClick}
                        sx={{
                            display: {xs: 'block', md: 'none'},
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default UnauthNavBar;
