import React, { useState } from "react";
import { Alert, Button, Container, Paper, Stack, TextField, 
    Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/authContext";
import UnauthNavBar from "../components/UnauthNavBar";
import UnauthSideBar from '../components/UnauthSideBar';

export default function LoginPage() {
    const { login } = useAuth();
    const nav = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState('');
    const [error, setError] = useState('');
    const [open, setOpen] = useState(false);

    async function onSubmit(e) {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await login(email, password);
            nav(`/account_summary`);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <UnauthNavBar onMenuClick={ () => setOpen(true) } />
            <UnauthSideBar open={open} onClose={() => setOpen(false)} />
            <Container
                maxWidth='md'
                sx={{ 
                    mx: 'auto',
                    mt: 10
                }}
                align='center'
            >
                <Paper 
                    sx={{ p: 5 }}
                >
                    <Typography 
                        variant="h4" 
                        align="center" 
                        color='primary'
                        sx={{ 
                            mt: 2,
                        }}
                    >
                        Login
                    </Typography>
                    {error && (
                        <Alert severity='error' sx={{ mt: 2 }}>{error}</Alert>
                    )}
                    <Stack 
                        component='form' 
                        spacing={2} 
                        onSubmit={onSubmit} 
                        sx={{ 
                            mt : 2
                        }}
                        >
                        <TextField
                            fullWidth
                            required
                            sx={{ mt: 3 }}
                            type="email"
                            label='Email'
                            onChange={ e => setEmail(e.target.value) }
                            />
                        <TextField
                            fullWidth
                            required
                            sx={{ mt: 3 }}
                            type="password"
                            label='Password'
                            onChange={ e => setPassword(e.target.value) }
                            />
                        <Button
                            variant="contained"
                            color="secondary"
                            sx={{ mt: 2 }}
                            type='submit'
                            disabled={loading}
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </Button>
                        <Button
                            variant="outlined"
                            color="secondary"
                            sx={{ mt: 2 }}
                            type='submit'
                            disabled={loading}
                            component={Link}
                            to='/forgot_password'
                        >
                            Forgot Password
                        </Button>
                    </Stack>
                </Paper>
            </Container>
        </>
    );
}