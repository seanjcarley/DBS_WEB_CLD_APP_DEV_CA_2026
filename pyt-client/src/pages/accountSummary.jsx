import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import AuthNavBar from "../components/AuthNavBar";
import axios from "axios";

const AccountSummary = () => {
    const [details, setDetails] = useState({})


    const fetchSummaryDetails = async () => {
        const token = localStorage.getItem('token');
        const custID = localStorage.getItem('ID');
        const res = await axios.post(
            `http://localhost:5000/api/account_summary/:${custID}`, {}, {
            headers: { Authorization: `Bearer ${token}` }
        });
    
        // console.log(res.data);
        console.log(res.data[0]);
        console.log(details)
    };

    useEffect( () => { fetchSummaryDetails(); }, [] );


    return (
        <>
            <AuthNavBar />
            <Typography 
                variant="h3"
                align="center"
            >
                Account Summary
            </Typography>
            <Typography variant="h1">
            </Typography>
        </>
    )
};

export default AccountSummary;