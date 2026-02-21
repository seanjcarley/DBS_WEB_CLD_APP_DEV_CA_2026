import React from "react";
import { Drawer, IconButton, List, ListItem, ListItemText, 
    ListItemIcon } from "@mui/material";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { Link } from "react-router-dom";
import { useThemeMode } from "../theme/ThemeModeProvider";

const AuthSideBar = ({ open, onClose }) => {

    const { mode, toggleMode } = useThemeMode();

    return (
        <Drawer anchor='right' open={open} onClose={onClose}>
            <List sx={{ width: 250 }}>
                <ListItem button onClick={onClose}>
                    <ListItemText primary='Close' />
                </ListItem>
                <ListItem button onClick={() => {
                    window.location.href='/account_summary';
                }}>
                    <ListItemText primary='Account Summary' />
                </ListItem>
                <ListItem button onClick={() => {
                    window.location.href='/vehicles';
                }}>
                    <ListItemText primary='Vehicles' />
                </ListItem>
                <ListItem button onClick={() => {
                    window.location.href='/account_summary';
                }}>
                    <ListItemText primary='Payment' />
                </ListItem>
                <ListItem button onClick={() => {
                    window.location.href='/';
                }}>
                    <ListItemText primary='Journeys' />
                </ListItem>
                <ListItem button onClick={() => {
                    window.location.href='/';
                }}>
                    <IconButton 
                        color='inherit' 
                        onClick={toggleMode} 
                        aria-label='Toggle Theme'
                        sx={{
                            display: {xs: 'block', md: 'none'}
                        }}
                    >
                        {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
                    </IconButton>
                </ListItem>
            </List>
        </Drawer>
    );
};

export default AuthSideBar;