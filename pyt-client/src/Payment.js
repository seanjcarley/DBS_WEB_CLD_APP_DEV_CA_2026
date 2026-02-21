import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { apiFetch } from "./api/client";
import CheckoutForm from "./pages/CheckoutForm";

function Payment(props) {
    const [stripePromise, setStripePromise] = useState(null);
    const [clientSecret, setClientSecret] = useState('');
    const [priceId, setPriceId] = useState('');
    const [quantity, setQuantity] = useState('');
    const [email, setEmail] = useState('');

    setPriceId(props.priceId);
    setQuantity(props.quantity);
    setEmail(props.email);
     
    const payload = {
        priceId: priceId,
        quantity:quantity,
        email: email,
    }

    setStripePromise(loadStripe(import.meta.env.VITE_STRIPE_PUBLIC));

    setPayload()



    return (
        <>
            <h1>Payment Element</h1>
            { stripePromise && clientSecret && (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <PaymentForm />
                </Elements>
            )}
        </>

    )

}