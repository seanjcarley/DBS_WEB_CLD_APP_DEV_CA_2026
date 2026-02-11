import React, { useState } from "react";
import { Alert, Button, Container, Paper, Stack, TextField, 
    Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/authContext";
import UnauthNavBar from "../components/UnauthNavBar";


export default function ForgotPassswordPage() {
    const { forgot_password } = useAuth();
    const nav = useNavigate();

    const [email, setEmail] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [loading, setLoading] = useState('');
    const [error, setError] = useState('');
    
    async function onSubmit(e) {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await forgot_password(email, accountNumber);
            nav(`/reset_password`);
        } catch (err) {
            setError(err.message);
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
                        Forgot Password
                    </Typography>
                    <Typography
                        variant="caption"
                        align="center"
                        color="secondary"
                        sx={{
                            mt:2
                        }}
                    >
                        To reset your password, please provide your email and 
                        account number!
                    </Typography>
                    {error && (
                        <Alert severity="error" sx={{ mt: 2}}>{error}</Alert>
                    )}
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
                            type="email"
                            label='Email'
                            onChange={ e => setEmail(e.target.value) }
                        />
                        <TextField
                            fullWidth
                            required
                            sx={{ mt: 3 }}
                            label='Account Number'
                            onChange={ e => setAccountNumber(e.target.value) }
                        />
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