import React from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';
import Index from './pages/index';
import Register from './pages/register';
import Signin from './pages/signin';
import './App.css';

export default function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={ <Index /> } />
        <Route path='/register' element={ <Register /> } />
        <Route path='/signin' element= { <Signin /> } />
      </Routes>
    </>
  )
};
