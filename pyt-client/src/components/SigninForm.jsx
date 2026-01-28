import React, { useState } from "react";
import { Button, Container, TextField, Typography } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";

const SigninForm = () => {
    const [email, setEmail] = useState('');
    const [pwrd, setPwrd] = useState('');

    return (
        <Container
            maxWidth='sm'
            sx={{ mt: 10}}
            align='center'
        >
            <Typography variant="h4" align="center" sx={{ mt: 2 }}>
                Login
            </Typography>
            
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
                onChange={ e => setPwrd(e.target.value) }
            />

            <Button
                variant="contained"
                color="secondary"
                sx={{ mt: 2 }}
                
            >
                Login
            </Button>
        </Container>
    );
};

export default SigninForm;