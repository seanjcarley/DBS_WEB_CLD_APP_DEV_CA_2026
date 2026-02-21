const { asyncHandler } = require('../utils/asyncHandler');
const { createCheckout, createIntent, sessionStatus, 
    fetchTollRate, getCheckout  } = require('../models/payment.model');

const create_checkout = asyncHandler( async (req, res) => {
    const {priceId, quantity, email} = req.body;
    const result = await createCheckout(priceId, quantity, email);
    console.log(result);

    res.send(result);
});

const create_intent = asyncHandler( async (req, res) => {
    const intent = await createIntent();

    res.send(intent);
})

const get_checkout = asyncHandler( async (req, res) => {
    // console.log('Client Secret');
    // console.log(req.params.clientSecret);
    // console.log(typeof req.params.clientSecret);
    const clientSecret = req.params.clientSecret;

    const result = await getCheckout(clientSecret);
    res.send('Controller: ', result);
});

const session_status = asyncHandler( async (req, res) => {
    const result = await sessionStatus(req);
    console.log(result.status);
    res.send({
        status: result.status, 
        payment_status: result.payment_status,
        payment_intent_id: result.payment_intent.id,
        payment_intent_status: result.payment_intent.status,
    });
});

const fetch_toll_rates = asyncHandler(async (req, res) => {
    const result = await fetchTollRate();
    res.send(result);
});

module.exports = { create_checkout, create_intent, get_checkout, 
    session_status, fetch_toll_rates };