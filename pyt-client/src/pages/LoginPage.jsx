import React, { useState } from "react";
import { Button, Container, Paper, Stack, TextField, 
    Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/authContext";
import UnauthNavBar from "../components/UnauthNavBar";

export default function LoginPage() {
    const { login } = useAuth();
    const nav = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState('');
    const [error, setError] = useState('');

    async function onSubmit(e) {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await login(email, password);
            nav(`/account_summary`);
        } catch {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

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
                        Login
                    </Typography>
                    {error && <Alert severty='error'>{error}</Alert>}
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
                        >
                            Forgot Password
                        </Button>
                    </Stack>
                </Paper>
            </Container>
        </>
    );
}