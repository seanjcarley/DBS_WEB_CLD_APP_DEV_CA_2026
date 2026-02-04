import React from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';
import Index from './pages/index';
import Register from './pages/register';
import Signin from './pages/signin';
import AccountSummary from './pages/accountSummary';
import Vehicles from './pages/vehicles';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import './App.css';
import './parallax.css';
import { OutlinedInput } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#00376c;',
    },
    secondary: {
      main: '#85267a',
    }
  },
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
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: 'whitesmoke',
        }
      }
    }, 
    MuiTextField: {
      styleOverrides: {
        root:{
          backgroundColor: 'whitesmoke',
        }
      }
    },
  }
})

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path='/' element={ <Index /> } />
        <Route path='/register' element={ <Register /> } />
        <Route path='/signin' element={ <Signin /> } />
        <Route path='/account_summary' element={ <AccountSummary /> } />
        <Route path='/vehicles' element={ <Vehicles /> } />
      </Routes>
    </ThemeProvider>
  )
};
