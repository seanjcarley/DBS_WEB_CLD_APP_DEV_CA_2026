import React, { useState } from 'react';
import { styled } from '@mui/material/styles'
import { Box, Button, Card, CircularProgress, Container, Grid, IconButton, 
    List, ListItem, Typography, TextField, TableFooter, } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import EditIcon from '@mui/icons-material/Edit';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import Paper from '@mui/material/Paper';

export default function PersonalDetailsTable(props) {
    // set the customer details variables
    // const [fname, setFname] = useState('');
    const [tempFname, setTempFname] = useState('');
    const [nameFieldDisp, setNameFieldDisp] = useState('none');
    const [nameTypoDisp, setNameTypoDisp] = useState();
    // const [sname, setSname] = useState('');
    const [tempSname, setTempSname] = useState('');
    const [snameFieldDisp, setSnameFieldDisp] = useState('none');
    const [snameTypoDisp, setSnameTypoDisp] = useState('inline-flex');
    // const [email, setEmail] = useState('');
    const [tempEmail, setTempEmail] = useState('');
    const [emailFieldDisp, setEmailFieldDisp] = useState('none');
    const [wmailTypoDisp, setEmailTypoDisp] = useState('inline-flex');
    // const [phone, setPhone] = useState('');
    const [tempPhone, setTempPhone] = useState('');
    const [phoneFieldDisp, setPhoneFieldDisp] = useState('none');
    const [phoneTypoDisp, setPhoneTypoDisp] = useState('inline-flex');
    // variables for validation error alerts
    const [emailAlert, setEmailAlert] = useState('');
    const [emlAlrtClr, setEmlAlrtClr] = useState('');
    // used to change the styling of table rows
    const StyledTableRow = styled(TableRow)(({theme}) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.primary.contrastText,
        },
        '&:nth-of-type(even)':{
            backgroundColor: theme.palette.secondary.contrastText,
        },
        // '&:last-child': {
        //     backgroundColor: '#fff'
        // }
    }));

    const enableFnameEdit = () => {
        setNameFieldDisp();
        setNameTypoDisp('none');
    }

    const updateFname = () => {
        setNameFieldDisp('none');
        setNameTypoDisp();
        console.log(tempFname);
    }

    const enablesnameEdit = () => {
        setSnameFieldDisp('flex');
        setSnameTypoDisp('none');
    }

    const enableEmailEdit = () => {
        setEmailFieldDisp('flex');
        setEmailTypoDisp('none');
    }

    const enablePhoneEdit = () => {
        setPhoneFieldDisp('flex');
        setPhoneTypoDisp('none');
    }

    return (
        <TableContainer component={Paper} sx={{ width: '96%', mt: 1, }}>        
            <Table key='pd_table'>
                <TableHead>
                    <TableRow>
                        <TableCell colSpan={3} align='center' sx={{ py: 1 }}>
                            <Typography variant="h6" sx={{ mt: 1, }}>
                                Personal Details
                            </Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <StyledTableRow key={'pd_fname'}>
                        <TableCell>
                            <Typography variant="body2">
                                Name:
                            </Typography>
                        </TableCell>
                        <TableCell
                            sx={{ display: nameTypoDisp, }}
                        >
                            <Typography variant="body1">
                                {props.fname}
                            </Typography>
                        </TableCell>
                        <TableCell
                            sx={{ display: nameTypoDisp, }}
                        >
                            <Button 
                                variant='outlined' 
                                color="secondary" 
                                onClick={enableFnameEdit}
                            >
                                <EditIcon />
                            </Button>
                        </TableCell>
                        <TableCell
                            sx={{ display: nameFieldDisp, }}
                        >
                            <TextField 
                                sx={{  }} 
                                value={tempFname}
                                onChange={ e => setTempFname(e.target.value) } 
                                label={props.fname}
                            />
                        </TableCell>
                        <TableCell
                            sx={{ display: nameFieldDisp, }}
                        >
                            <Button 
                                variant='contained' 
                                color="success"
                                onClick={updateFname}
                            >
                                <ThumbUpAltIcon />
                            </Button>
                        </TableCell>
                    </StyledTableRow>
                    <StyledTableRow key={'pd_sname'}>
                        <TableCell>
                            <Typography variant="body2">
                                Surname:
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="body1" sx={{ display: 'inline-flex', }}>
                                {props.sname}
                            </Typography>
                            <TextField 
                                sx={{ display: snameFieldDisp, }} />
                        </TableCell>
                        <TableCell>
                            <Button variant='outlined' sx={{ display: 'inline-flex', }}>
                                <EditIcon />
                            </Button>
                        </TableCell>
                    </StyledTableRow>
                    <StyledTableRow key={'pd_email'}>
                        <TableCell>
                            <Typography variant="body2">
                                Email:
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="body1" sx={{ display: 'inline-flex', }}>
                                {props.email}
                            </Typography>
                             <TextField sx={{ display: emailFieldDisp, }} />
                        </TableCell>
                        <TableCell>
                            <Button variant='outlined' color="secondary" sx={{ display: 'inline-flex', }}>
                                <EditIcon />
                            </Button>
                        </TableCell>
                    </StyledTableRow>
                    <StyledTableRow key={'pd_phone'}>
                        <TableCell>
                            <Typography variant="body2">
                                Phone
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="body1" sx={{ display: 'inline-flex', }}>
                                {props.phone}
                            </Typography>
                             <TextField sx={{ display: phoneFieldDisp, }} />
                        </TableCell>
                        <TableCell>
                            <Button variant='outlined' sx={{ display: 'inline-flex', }}>
                                <EditIcon />
                            </Button>
                        </TableCell>
                    </StyledTableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}