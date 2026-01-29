import React, { useState } from "react";
import { Container, TextField, Typography } from "@mui/material";
import Validator from 'validator';

const SignupCreds = () => {  
    // variables for validation error alerts
    const [emailAlert, setEmailAlert] = useState('');
    const [emlAlrtClr, setEmlAlrtClr] = useState('')
    const [pwrdAlert, setPwrdAlert] = useState('');
    const [pwrdAlrtClr, setPwrdAlrtClr] = useState('')
    const [cnfpwAlert, setCnfpwAlert] = useState('');
    const [cnfpwAlrtClr, setCnfpwAlrtClr] = useState('');

    // validate that the provided email address is in a valid email format
    const validateEmail = (email) => {
        if (Validator.isEmail(email)) {
            setEmail(email);
            setEmailAlert('Valid Email Address Format!');
            setEmlAlrtClr('green');
        } else {
            setEmail('');
            setEmailAlert('Enter a Valid Email Address!');
            setEmlAlrtClr('red');
        }
    };

    // validate that the provided passwordmeets minimum requirements
    const validatePwd = (password) => {
        if (Validator.isStrongPassword(password)) {
            setPwrd(password);
            setPwrdAlert('Password meets minimum requirements!');
            setPwrdAlrtClr('green');
        } else {
            setPwrd('');
            setPwrdAlert('Password does not meet minimum requirements!');
            setPwrdAlrtClr('red');
        }
    };

    // validate that the provided passwords match
    const validatePwdMatch = (cnfpwd) => {
        if (cnfpwd === pwrd) {
            setCnfpwAlert('Passwords match!');
            setCnfpwAlrtClr('green');
        } else {
            setCnfpwAlert('Passwords do not match!');
            setCnfpwAlrtClr('red');
        }
    };

    return (
        <Container>
            <TextField
                fullWidth
                sx={{ mt: 2 }}
                label='Email'
                type="email"
                required
                onChange={ e => validateEmail(e.target.value)}
            />
            <Typography variant="caption" sx={{ color: emlAlrtClr }}>
                { emailAlert }
            </Typography>

            <TextField
                fullWidth
                sx={{ mt: 2 }}
                label='Password'
                type="Password"
                required
                onChange={ e => validatePwd(e.target.value)}
            />
            <Typography variant="caption" sx={{ color: pwrdAlrtClr }}>
                { pwrdAlert }
            </Typography>

            <TextField
                fullWidth
                sx={{ mt: 2 }}
                label='Confirm Password'
                type="password"
                required
                onChange={ e => validatePwdMatch(e.target.value)}
            />
            <Typography variant="caption" sx={{ color: cnfpwAlrtClr }}>
                { cnfpwAlert }
            </Typography>
        </Container>
    )
}

export default SignupCreds;