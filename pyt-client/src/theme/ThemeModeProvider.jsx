import React, { createContext, useContext, useMemo, useState } from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import Image from '../assets/background.png'

const ThemeModeContext = createContext(null);

export function ThemeModeProvider({children}) {
    const [mode, setMode] = useState('light');

    const theme = useMemo( () => createTheme({
        palette: {
            mode, 
            primary: {
                main: '#00376c;',
                dark: '#00264b',
                light: '#335f89',
                contrastText: '#e2eef5',
            },
            secondary: {
                main: '#85267a',
                dark: '#5d1a55',
                light: '#9d5194',
                contrastText: '#f2e4ee',
            },
            text: {
                primary: '#00376c;',
            },
            background: {
                default: '#b7e7ff',
            },
        }, 
        shape: { borderRadius: 10 },
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
                        // backgroundColor: '#b7e7ff',
                        backgroundImage: `url(${Image})`,
                    }
                }
            },
            MuiCard: {
                styleOverrides: {
                    root: {
                        // backgroundColor: '#e2eef5',
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
            MuiButton: {
                styleOverrides: {
                    root: {

                    }
                }
            },
            MuiTableCell: {
                styleOverrides: {
                    root: {
                        padding: 8
                    }
                }
            },
            MuiAccordionSummary: {
                styleOverrides: {
                    root: {
                        backgroundColor: '',
                    }
                }
            }
        },
    }),[mode]);

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
            background: {
                default: '#070B34'
            }
        },
        components: {
            MuiCssBaseline: {
                styleOverrides: {
                    body: {
                        // backgroundColor: '#070B34',
                        backgroundImage: `url(${Image})`,
                    }
                }
            },
        },
    });

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