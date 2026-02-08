import React from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './auth/authContext';
import Index from './pages/index';
import Register from './pages/Register';
import LoginPage from './pages/LoginPage';
import AccountSummary from './pages/accountSummary';
import Vehicles from './pages/vehicles';
import Journeys from './pages/journeys';
import { ThemeProvider, createTheme} from "@mui/material/styles";
import './App.css';
import './parallax.css';


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
});

function RequireAuth({ children }) {
  const { isAuthed } = useAuth();
  if (!isAuthed) return <Navigate to='/login' replace />;
  return children;
}

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>  
        <Routes>
          <Route path='/' element={ <Index /> } />
          <Route path='/register' element={ <Register /> } />
          <Route path='/signin' element={ <LoginPage /> } />
          <Route 
            path='/account_summary' 
            element={ 
              <RequireAuth>
                <AccountSummary /> 
              </RequireAuth>
            } 
            />
          <Route path='/vehicles' element={ <Vehicles /> } />
          <Route path='/journeys' element={ <Journeys /> } />
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  )
};
