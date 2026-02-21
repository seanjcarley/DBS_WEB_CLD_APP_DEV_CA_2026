const { response } = require('express');
const { env } = require('../config/env');
const stripe = require('stripe')(env.STRIPE_SECRET);

// make stripe payment
async function createCheckout(priceId, quantity, email) {
    // console.log(priceId, quantity);
    const session = await stripe.checkout.sessions.create({
        ui_mode: 'custom',
        customer_email: email,
        line_items: [
            {
                price: priceId,
                quantity: quantity,
            },
        ],
        mode: 'payment',
        return_url: 'http://localhost:5173/complete?session_id={CHECKOUT_SESSION_ID}',
    });

    console.log('Session: ', session);

    return { clientSecret: session.client_secret } || null;
}

async function createIntent(priceId, quantity, email) {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            ui_mode: 'custom',
            customer_email: email,
            line_items: [
                {
                    price: priceId,
                    quantity: quantity,
                },
            ],
            mode: 'payment',
            return_url: 'http://localhost:5173/complete?session_id={CHECKOUT_SESSION_ID}',
            currency: 'eur',
            // amount: 1999,
            automatic_payment_methods: {
                enabled: true,
            },
        });
        console.log('PI: ', paymentIntent);
        return ({clientSecret: paymentIntent.client_secret});
    } catch (err) {
        return response.status(400).send({
            error: {
                message: err.message,
            },
        });
    }
}

async function getCheckout (clientSecret) {
    const start = 'cs_test_';
    const session = await stripe.checkout.sessions.retrieve(
        start.concat(clientSecret)
    ); 

    // console.log('Get Session: ', session)

    return session || null
}

async function sessionStatus(req) {
    const session = await stripe.checkout.sessions.retrieve(req.query.session_id, {expand: ['payment_intent']});
    console.log(session);
    return session || null;
}

async function fetchTollRate() {
    const tollRates = await stripe.products.list({
        ids: ['prod_TygVtQjbdJg5Av', 'prod_TygcH7UECo4n75', 
            'prod_TygdsvOR3bIt8t', 'prod_TygfWorybuamfP', 
            'prod_TyggqHtiPz244x', 'prod_TyghYBqY0mI8yb']
    });
    // console.log(tollRates)
    return tollRates || null;
}

module.exports = { createCheckout, createIntent, getCheckout, sessionStatus, fetchTollRate };