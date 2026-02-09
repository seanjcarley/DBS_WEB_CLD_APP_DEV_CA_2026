const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { env } = require('../config/env');
const { asyncHandler } = require('../utils/asyncHandler');
const { createUser, findUserByEmail, 
    fetchCustomerDetails } = require('../models/users.model');
const { makePayment } = require('../models/stripe.models');

const signup = asyncHandler(async (req, res) => {
    const {email, password, fname, surname, phone, vrn} = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const existing = await findUserByEmail(email);
    if (existing) {
        const err = new Error('Unable to Create Account. Please Call <PHONENUMBER>...');
        err.statusCode = 409;
        throw err;
    }

    const userId = await createUser({
        email, 
        password, 
        fname, 
        surname, 
        phone, 
        vrn
    });

    res.status(201).json({ ok: true, userId });
});

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);
    console.log(user);

    if (!user) {
        const err = new Error('Invalid Email or Password...')
        err.statusCode = 401;
        throw err;
    }

    const token = jwt.sign(
        { sub: user.id, email: user.email },
        env.JWT_SECRET, 
        { expiresIn: env.JWT_EXPIRES_IN }
    );

    res.json({ ok: true, token, id: user.CUSTOMERID });
})

const account_summary = asyncHandler(async (req, res) => {
    const id = Number(req.body.id);
    const results = await fetchCustomerDetails(id);

    res.json({ ok: true, results });
})

const customer_payment = asyncHandler( async (req, res) => {
    await makePayment();
    res.json({ ok: true });
})

module.exports = { signup, login, account_summary, customer_payment };