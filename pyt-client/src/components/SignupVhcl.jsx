import React, { useEffect, useState } from "react";
import { Button, Box, Container, Modal, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import VehicleModal from "./VehicleModal";
import axios from "axios";

const SignupVhcl = () => {
    // variables to hold vehicle details
    const [vrn, setVrn] = useState('')
    const [details, setDetails] = useState([]);

    const handleVehicleSearch = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:8080/api/vehicle_search', {vrn: vrn})
        .then((res) => {
            setDetails(res.data);
        })
    };

    return (
        <Container>
            <Box
                sx={{
                    width: '100%',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, minmax(min(200px, 50%), 1fr))',
                    gap: 2
                }}
            >
                
                <TextField
                    label='Vehicle Registration Number (VRN)'
                    onChange={ e => setVrn(e.target.value) }
                    sx={{ mt: 1}}
                    required
                />

                <Button
                    id="vehicle-search-btn"
                    variant="contained"
                    color="primary"
                    onClick={handleVehicleSearch}
                >
                    Find Vehicle
                </Button>
            </Box>
        </Container>
    )
};

export default SignupVhcl;