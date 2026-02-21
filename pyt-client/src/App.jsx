import React, { useMemo } from 'react';
import { AuthProvider, useAuth } from './auth/authContext';
import { loadStripe } from '@stripe/stripe-js';
import { CheckoutProvider } from '@stripe/react-stripe-js/checkout';
import { BrowserRouter as Router, generatePath, Navigate, Route, 
  Routes, useParams } from 'react-router-dom';
import { ThemeModeProvider } from './theme/ThemeModeProvider';
import Index from './pages/index';
import Register from './pages/Register';
import LoginPage from './pages/LoginPage';
import AccountSummary from './pages/AccountSummary';
import Vehicles from './pages/Vehicles';
import Journeys from './pages/journeys';
import ForgotPassswordPage from './pages/ForgotPasswordPage';
import ResetPassswordPage from './pages/ResetPasswordPage';
import PaymentForm from './pages/PaymentForm';
import PaymentSetup from './pages/PaymentSetup';
import PaymentComplete from './pages/PaymentComplete';
import './App.css';
import './parallax.css';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC);

const Redirect = ({ to }) => {
  const params = useParams();
  return <Navigate to={generatePath(to, params)} replace />;
}

function RequireAuth({ children }) {
  const { isAuthed } = useAuth();
  if (!isAuthed) return <Navigate to='/' replace />;
  return children;
}

export default function App() {

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
          <Route
            path='/add_vehicle'
            element={
              <RequireAuth>
                <Vehicles />
              </RequireAuth>
            }
          />
          <Route
            path='/delete_vehicle'
            element={
              <RequireAuth>
                <Vehicles />
              </RequireAuth>
            }
          />
          <Route path='/journeys' element={ <Journeys /> } />
          <Route path='/payments' element={ <PaymentSetup /> } />
          {/* <Route path='/payment_form/:priceId/:quantity/:email' element={ <PaymentForm /> } />  */}
          <Route path='/payment_form/' element={ <PaymentForm /> } /> 
          <Route path='/payment_completion' element={ <PaymentComplete /> } />
        </Routes>
      </AuthProvider>
    </ThemeModeProvider>
  )
};
