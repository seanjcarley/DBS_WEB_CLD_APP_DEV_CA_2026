import React, { useState } from "react";
import { Container, TextField } from "@mui/material";

const SignupPers = () => {
    // variables to hold personal details
    const [fname, setFname] = useState('');
    const [surname, setSurname] = useState('');
    const [phone, setPhone] = useState('');

    return (
        <Container>
            <TextField
                fullWidth
                required
                label='First Name'
                onChange={ e => setFname(e.target.value) }
                sx={{ mt: 1 }}
            />

            <TextField
                fullWidth
                required
                label='Surname'
                onChange={ e => setSurname(e.target.value) }
                sx={{ mt: 1 }}
            />

            <TextField
                fullWidth
                required
                label='Phone'
                type='tel'
                onChange={ e => setPhone(e.target.value) }
                sx={{ mt: 1 }}
            />
        </Container>
    );

};

export default SignupPers;
