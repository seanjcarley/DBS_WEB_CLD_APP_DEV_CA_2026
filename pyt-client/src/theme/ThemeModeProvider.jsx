import React, { createContext, useContext, useMemo, useState } from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import Image from '../assets/background-1.png'

const ThemeModeContext = createContext(null);

export function ThemeModeProvider({children}) {
    const [mode, setMode] = useState('light');

    const theme = useMemo( () => createTheme({
        palette: {
            primary: {main: '#00376c;',},
            secondary: {main: '#85267a',},
        }, 
        shape: { borderRadius: 15 },
        typography: {
            fontFamily: [
                'Roboto',
                'Helvetica',
                'Arial',  
                'sans-serif',
            ],
            fontSize: 14,
        },
        components: {
            MuiCssBaseline: {
                styleOverrides: {
                    body: {
                        backgroundColor: '#b7e7ff',
                        backgroundImage: `url(${Image})`,
                    }
                }
            },
            MuiCard: {
                styleOverrides: {
                    root: {
                        backgroundColor: 'whitesmoke',
                    },
                },
            },
            MuiTextField: {
                styleOverrides: {
                    root: {
                        backgroundColor: 'whitesmoke',
                    }
                }
            },
            MuiButton:{
                styleOverrides: {
                    root: {

                    }
                }
            }
        } 
    }),[mode]);

    const toggleMode = () => setMode((m) => (m === 'light' ? 'dark' : 'light'));

    return (
        <ThemeModeContext.Provider value={{ mode, toggleMode }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ThemeModeContext.Provider>
    );

}

export function useThemeMode() {
    const ctx = useContext(ThemeModeContext);
    if (!ctx) throw new Error('useThemeMode must be used inside ThemeModeProvider')
    return ctx;
}