import React, { useEffect, useState } from "react";
import { Alert, Box, Button, Card, CircularProgress, Container, Grid, 
    IconButton, List, ListItem, Paper, Typography, 
    TextField } from "@mui/material";
import AuthNavBar from "../components/AuthNavBar";
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { apiFetch } from "../api/client";


const Vehicles = () => {

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [activeVehDetails, setActiveVehDetails] = useState([]);
    const [inactiveVehDetails, setInactiveVehDetails] = useState([]);
    const custID = localStorage.getItem('id');

    useEffect(() => {
        async function fetchVehicleDetails(e) {
            // e.preventDefault();
            setError('');
            setLoading(true);
             try{
                const payload = {
                    id: custID,
                }
                const data = await apiFetch('/api/vehicles/vehicles', {
                    method: 'POST',
                    auth: true,
                    body: payload,
                });
                setActiveVehDetails(data.results[0]);
                setInactiveVehDetails(data.results[1]);
             } catch (err) {
                setError(err.message || 'Failed to retrieve vehicle details...');
             } finally {
                setLoading(false);
             }
        }
        fetchVehicleDetails();
    }, []);

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

    return (
        <>
            <AuthNavBar />
            <Container
                // maxWidth='sm'
                sx={{ 
                    mt: 10,
                }}
                align='center'
            >
                <Paper 
                    sx={{ 
                        p: 5,
                    }}   
                >
                    <Typography 
                        variant="h4"
                        align="center" 
                        color='primary'
                        sx={{ 
                            mt: 2,
                        }}
                    >
                        Vehicles
                    </Typography>
                    {error && (
                        <Alert severity='error' sx={{ mt: 2 }}>{error}</Alert>
                    )}

                    <Box>
                        <Grid 
                            container 
                            spacing={2}
                        >
                            <Grid 
                                size={{xs: 10, md: 6}}
                                offset={{xs: 1, md: 0}}
                            >
                                <Card 
                                    align='center'
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        flexDirection: 'column',
                                        height: '100%',
                                    }}
                                >
                                    <Box>
                                        <TableContainer
                                            component={Paper}
                                            sx={{
                                                width: '100%',
                                                mt: 1,
                                            }}
                                        >
                                            <Table>
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell 
                                                            colSpan={6}
                                                            align='center'
                                                        >
                                                            Active Vehicles
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>
                                                            Registration Number
                                                        </TableCell>
                                                        <TableCell>
                                                            Make
                                                        </TableCell>
                                                        <TableCell>
                                                            Model
                                                        </TableCell>
                                                        <TableCell>
                                                            Colour
                                                        </TableCell>
                                                        <TableCell>
                                                            Vehicle Class
                                                        </TableCell>
                                                        <TableCell></TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {activeVehDetails.map((detail) => (
                                                        <StyledTableRow>
                                                            <TableCell>{detail.VEHICLEREGNO}</TableCell>
                                                            <TableCell>{detail.VEHICLEMAKE}</TableCell>
                                                            <TableCell>{detail.VEHICLEMODEL}</TableCell>
                                                            <TableCell>{detail.VEHICLECOLOUR}</TableCell>
                                                            <TableCell>{detail.VEHICLECLASS}</TableCell>
                                                            <TableCell>
                                                                <Button
                                                                    variant='outlined'
                                                                    sx={{
                                                                        display: 'inline-flex'   
                                                                    }}
                                                                >
                                                                    <DeleteIcon />
                                                                </Button>
                                                            </TableCell>
                                                        </StyledTableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Box>
                                    <Box>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            sx={{
                                                my: 1
                                            }}
                                        >
                                            Add Vehicle
                                        </Button>
                                    </Box>
                                </Card>
                            </Grid>
                            <Grid 
                                size={{xs: 10, md: 6}}
                                offset={{xs: 1, md: 0}}
                            >
                                <Card 
                                    align='center'
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        flexDirection: 'column',
                                        height: '100%',
                                    }}
                                >
                                    <Box>
                                        <TableContainer
                                            component={Paper}
                                            sx={{
                                                width: '100%',
                                                mt: 1,
                                            }}
                                        >
                                            <Table>
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell 
                                                            colSpan={6}
                                                            align='center'
                                                        >
                                                            Inactive Vehicles
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>
                                                            Registration Number
                                                        </TableCell>
                                                        <TableCell>
                                                            Make
                                                        </TableCell>
                                                        <TableCell>
                                                            Model
                                                        </TableCell>
                                                        <TableCell>
                                                            Vehicle Class
                                                        </TableCell>
                                                        <TableCell>
                                                            Date Removed
                                                        </TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {inactiveVehDetails.map((detail) => (
                                                        <StyledTableRow>
                                                            <TableCell>{detail.VEHICLEREGNO}</TableCell>
                                                            <TableCell>{detail.VEHICLEMAKE}</TableCell>
                                                            <TableCell>{detail.VEHICLEMODEL}</TableCell>
                                                            <TableCell>{detail.VEHICLECLASS}</TableCell>
                                                            <TableCell>{detail.VEHICLEREMOVED}</TableCell>
                                                        </StyledTableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Box>
                                </Card>
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
            </Container>
        </>
    )
};

export default Vehicles;