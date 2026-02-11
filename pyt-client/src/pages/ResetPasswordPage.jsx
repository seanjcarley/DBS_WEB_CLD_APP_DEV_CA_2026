import React, { useState } from "react";
import { Alert, Button, Container, Paper, Stack, TextField, 
    Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/authContext";
import UnauthNavBar from "../components/UnauthNavBar";
import Validator from 'validator';
import { apiFetch } from "../api/client";

export default function ResetPassswordPage() {
    const { logout } = useAuth();
    const nav = useNavigate();

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const id = localStorage.getItem('id')
    const [pwrdAlert, setPwrdAlert] = useState('');
    const [pwrdAlrtClr, setPwrdAlrtClr] = useState('')
    const [cnfpwAlert, setCnfpwAlert] = useState('');
    const [cnfpwAlrtClr, setCnfpwAlrtClr] = useState('');
    const [loading, setLoading] = useState('');
    const [error, setError] = useState('');

    async function onSubmit(e) {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            if (confirmPassword === 'match') {
                const payload = {
                    password: password,
                    id: id,
                }

                await apiFetch('/api/auth/reset_password', {
                    method: 'POST',
                    body: payload,
                })

                await logout();
                nav('/signin');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    const validatePwd = (password) => {
            if (Validator.isStrongPassword(password)) {
                setPassword(password);
                setPwrdAlert('Password meets minimum requirements!');
                setPwrdAlrtClr('green');
            } else {
                setPassword('');
                setPwrdAlert('Password does not meet minimum requirements!');
                setPwrdAlrtClr('red');
            }
        };
        // validate that the provided passwords match
        const validatePwdMatch = (confirmPassword) => {
            if (confirmPassword === password) {
                setCnfpwAlert('Passwords match!');
                setCnfpwAlrtClr('green');
                setConfirmPassword('match')
            } else {
                setCnfpwAlert('Passwords do not match!');
                setCnfpwAlrtClr('red');
            }
        };
    

    return (
        <>
            <UnauthNavBar />
            <Container
                maxWidth='sm'
                sx={{ 
                    mt: 10,
                }}
                align='center'
            >
                <Paper 
                    sx={{ p: 5 }}>
                    <Typography 
                        variant="h4" 
                        align="center" 
                        color='primary'
                        sx={{ 
                            mt: 2,
                        }}
                    >
                        Reset Password
                    </Typography>
                    <Typography
                        variant="caption"
                        align="center"
                        color="secondary"
                        sx={{
                            mt:2
                        }}
                    >
                        Enter your new password below.
                    </Typography>
                    {error && <Alert severity='error'>{error}</Alert>}
                    <Stack 
                        component='form' 
                        spacing={2} 
                        sx={{ 
                            mt : 2
                        }}
                        onSubmit={onSubmit}
                    >
                        <TextField
                            fullWidth
                            required
                            sx={{ mt: 3 }}
                            type="password"
                            label='Password'
                            onChange={ 
                                e => validatePwd(e.target.value)
                            }
                        />
                        <Typography 
                            variant="caption" 
                            sx={{ 
                                color: pwrdAlrtClr 
                            }}
                        >
                            { pwrdAlert }
                        </Typography>
                        <TextField
                            fullWidth
                            required
                            sx={{ mt: 3 }}
                            type="password"
                            label='Confirm Password'
                            onChange={ 
                                e => validatePwdMatch(e.target.value)
                            }
                        />
                        <Typography 
                            variant="caption" 
                            sx={{ 
                                color: cnfpwAlrtClr 
                            }}
                        >
                            { cnfpwAlert }
                        </Typography>
                        <Button
                            variant="contained"
                            color="secondary"
                            sx={{ mt: 2 }}
                            type='submit'
                            disabled={loading}
                        >
                            {loading ? 'Submitting...' : 'Submit'}
                        </Button>
                    </Stack>
                </Paper>
            </Container>
        </>
    );
}