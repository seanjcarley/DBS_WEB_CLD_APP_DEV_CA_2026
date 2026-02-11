import React, { useMemo } from 'react';
import { AuthProvider, useAuth } from './auth/authContext';
import { loadStripe } from '@stripe/stripe-js';
import { CheckoutProvider } from '@stripe/react-stripe-js/checkout';
import { Navigate, BrowserRouter as Router, 
  Route, Routes } from 'react-router-dom';
import { ThemeModeProvider } from './theme/ThemeModeProvider';
import Index from './pages/index';
import Register from './pages/Register';
import LoginPage from './pages/LoginPage';
import AccountSummary from './pages/AccountSummary';
import Vehicles from './pages/Vehicles';
import Journeys from './pages/journeys';
import ForgotPassswordPage from './pages/ForgotPasswordPage';
import ResetPassswordPage from './pages/ResetPasswordPage';
import CheckoutForm from './pages/CheckoutForm';
import { ThemeProvider, createTheme} from "@mui/material/styles";
import './App.css';
import './parallax.css';

const stripePromise = loadStripe(import.meta.env.STRIPE_PUBLIC);

function RequireAuth({ children }) {
  const { isAuthed } = useAuth();
  if (!isAuthed) return <Navigate to='/' replace />;
  return children;
}

export default function App() {

  // const promise = useMemo(() => {
  //   return fetch('/create-checkout-session', {
  //     method: 'POST',
  //   })
  //   .then((res) => res.json())
  //   .then((data) => data.clientSecret);
  // }, []);

  // const appearance = {
  //   theme: stripePromise,
  // };

  return (
    <ThemeModeProvider>
      <AuthProvider>  
        <Routes>
          <Route path='/' element={ <Index /> } />
          <Route path='/register' element={ <Register /> } />
          <Route path='/signin' element={ <LoginPage /> } />
          <Route path='/forgot_password' element={ <ForgotPassswordPage /> } />
          <Route 
            path='/account_summary' 
            element={ 
              <RequireAuth>
                <AccountSummary /> 
              </RequireAuth>
            } 
          />
          <Route
            path='/reset_password'
            element={
              <RequireAuth>
                <ResetPassswordPage />
              </RequireAuth>
            }
          />
          <Route 
            path='/vehicles' 
            element={ 
              <RequireAuth>
                <Vehicles />
              </RequireAuth>
            }
          />
          <Route path='/journeys' element={ <Journeys /> } />
          <Route path='/create-checkout-session' />
        </Routes>
      </AuthProvider>
    </ThemeModeProvider>
  )
};
