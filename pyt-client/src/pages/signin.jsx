import React from "react";
import { Container } from "@mui/material";
import UnauthNavBar from "../components/UnauthNavBar";
import SigninForm from "../components/SigninForm";

const Signin = () => {
    return (
        <>
            <UnauthNavBar />
            <Container>
                <SigninForm />
            </Container>
        </>
    );
};

export default Signin;