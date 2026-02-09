import React, { useMemo } from 'react';
import { AuthProvider, useAuth } from './auth/authContext';
import { loadStripe } from '@stripe/stripe-js';
import { CheckoutProvider } from '@stripe/react-stripe-js/checkout';
import { Navigate, BrowserRouter as Router, 
  Route, Routes } from 'react-router-dom';
import Index from './pages/index';
import Register from './pages/register';
import LoginPage from './pages/LoginPage';
import AccountSummary from './pages/accountSummary';
import Vehicles from './pages/vehicles';
import Journeys from './pages/journeys';
import CheckoutForm from './pages/CheckoutForm';
import { ThemeProvider, createTheme} from "@mui/material/styles";
import './App.css';
import './parallax.css';

const stripePromise = loadStripe(import.meta.env.STRIPE_PUBLIC);


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

  const promise = useMemo(() => {
    return fetch('/create-checkout-session', {
      method: 'POST',
    })
    .then((res) => res.json())
    .then((data) => data.clientSecret);
  }, []);

  const appearance = {
    theme: stripePromise,
  };

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>  
        <Router>
          <CheckoutProvider
            stripe={stripePromise}
            options={{
              clientSecret: promise,
              elementsOptions: {appearance},
            }}
          >
            <Routes>
              <Route path='/checkout' element={<CheckoutForm />} />
              {/* <Route path='complete' element={<Complete />} /> */}
            </Routes>
          </CheckoutProvider>
        </Router>
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
          <Route path='/create-checkout-session' />
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  )
};
