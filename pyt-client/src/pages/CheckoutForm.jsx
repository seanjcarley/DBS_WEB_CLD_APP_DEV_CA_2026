import React, { useState } from "react";
import { Button, } from '@mui/material';
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";

export default function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsProcessing(true);

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/completion`,
            },
            redirect: 'if_required',
        });

        if (error) {
            setMessage(error.message);
        } else if (paymentIntent && paymentIntent.status === 'succeeded') {
            setMessage('Payment status: ' + paymentIntent.status);
        } else {
            setMessage('Unexpected State!')
        }

        setIsProcessing(false);
    };

    return (
        <>
            <PaymentElement />        
            <Button
                disabled={isProcessing}
                id='submit-btn'
            >
                {isProcessing ? "Processing" : "Pay now"}
            </Button>
        </>

    )
}