import React, { useEffect, useState } from "react";
import { Elements, } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useParams } from "react-router-dom";

export default function PaymentForm(props) {
    // stripe variables
    const [stripePromise, setStripePromise] = useState(null);
    const [clientSecret, setClientSecret] = useState('');
    setStripePromise(loadStripe(import.meta.env.VITE_STRIPE_PUBLIC));
    
    // setting the info to be passed to the payment intent
    // const { priceId, quantity, email } = useParams();
    
    // const payload = {
    //     priceId: priceId,
    //     quantity: quantity,
    //     email: email,
    // }

    useEffect(() => {
        fetch('/api/payments/create_intent', {
            method: 'POST',
            body: JSON.stringify({}),  // payload,
        }).then(async (response) => {
            const { clientSecret } = await response.json();
            
            setClientSecret(clientSecret)
        })
    }, []);

    return (
        <>
            <h1>Payment Form</h1>
            {stripePromise && clientSecret && (
                <Elements stripe={ stripePromise } options={{ clientSecret }}>
                    <CheckoutForm />
                </Elements>
            )}
        </>
    );
}