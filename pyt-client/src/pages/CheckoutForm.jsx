import React, { useState } from "react";
import { PaymentElement, useCheckout } from '@stripe/react-stripe-js/checkout';


const validateEmail = async (email, checkout) => {
    const updateResult = await checkout.updateEmail(email);
    const isValid = updateResult.type !== 'error';

    return { isValid, message: !isValid ? updateResult.error.message : null};
}

const EmailInput = ({ checkout, email, setEmail, error, setError }) => {
    const handleBlur = async () => {
        if (!email) {
            return;
        }


        const { isValid, message } = await validateEmail(email, checkout);
    
        if (!isValid) {
            setError(message);
        }
    };

    const handleChange = (e) => {
        setError(null);
        setEmail(e.target.value);
    };

    return (
        <>
            <label>
                Email
                <input 
                    id='email'
                    type='text'
                    value={email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={error ? 'error' : ''}
                />
            </label>
            {error && <div id='email-errors'>{errors}</div>}
        </>
    );
};

const CheckoutForm = () => {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(null);
    const [message, setMessage] = useState(null)
    const [isSubmitting, setIsSubmitting] = useState(false);

    const checkoutState = useCheckout();

    if (checkoutState.type === 'loading') {
        return (
            <div>Loading...</div>
        );
    }

    if (checkoutState.type === 'error') {
        return (
            <div>Error: {checkoutState.error.message}</div>
        );
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const {checkout} = checkoutState;
        setIsSubmitting(true);
        
        const { isValid, message } = await validateEmail(email, checkout);
        if (!isValid) {
            setEmailError(message);
            setMessage(messge);
            setIsSubmitting(false);
            return;
        }

        const confirmResult = await checkout.confirm();

        if (confirm.type === 'error') {
            setMessage(confirmResult.error.message);
        }

        setIsSubmitting(false)
    };

    return (
        <form onSubmit={handleSubmit}>
            <EmailInput
                checkout={checkoutState.checkout}
                email={email}
                setEmail={setEmail}
                error={emailError}
                setError={setEmailError}
            />
            <h4>Payment</h4>
            <PaymentElement id='payment-element' />
            <button disabled={isSubmitting} id='submit'>
                {isSubmitting ? (
                    <div className='spinner'></div>
                ) : (
                    `Pay ${checkoutState.checkout.total.total.amount} now`
                )}
            </button>
            {message && <div id='payment-message'>{message}</div>}
        </form>
    );
}

export default CheckoutForm;