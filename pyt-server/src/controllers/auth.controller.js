const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { env } = require('../config/env');
const { asyncHandler } = require('../utils/asyncHandler');
const { createUser, findUserByEmail, 
    fetchCustomerDetails, resetPassword } = require('../models/users.model');

const signup = asyncHandler(async (req, res) => {
    const { email, password, fname, surname, phone, vrn } = req.body;

    const existing = await findUserByEmail(email);
    if (existing) {
        const err = new Error('Unable to Create Account. Please Call <PHONENUMBER>...');
        err.statusCode = 409;
        throw err;
    }
    
    const passwordHash = await bcrypt.hash(password, 10);

    const userId = await createUser({
        email, 
        passwordHash, 
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
    // console.log(user);
    console.log(user.CUSTOMERID);

    if (!user) {
        const err = new Error('Invalid Email or Password...')
        err.statusCode = 409;
        throw err;
    }

    const token = jwt.sign(
        { sub: user.CUSTOMERID, email: user.EMAIL },
        env.JWT_SECRET, 
        { expiresIn: env.JWT_EXPIRES_IN }
    );

    res.status(200).json({ ok: true, token, id: user.CUSTOMERID });
});

const forgot_password = asyncHandler(async (req, res) => {
    const { email, accountNumber } = req.body;
    const user = await findUserByEmail(email);
    
    if (!user || user.CUSTOMERID !== Number(accountNumber)) {
        const err = new Error('Invalid Email or Account Number')
        err.statusCode = 401;
        throw err;
    }

    const token = jwt.sign(
        { sub: user.CUSTOMERID, email: user.EMAIL },
        env.JWT_SECRET, 
        { expiresIn: env.JWT_EXPIRES_IN }
    );

    res.json({ ok: true, token, id: user.CUSTOMERID });
});

const reset_password = asyncHandler(async (req, res) => {
    const { password, id } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);

    const results = await resetPassword(passwordHash, Number(id));

    res.json({ok: true, results});
});

const account_summary = asyncHandler(async (req, res) => {
    const id = Number(req.body.id);
    const results = await fetchCustomerDetails(id);

    res.json({ ok: true, results });
});

const customer_payment = asyncHandler( async (req, res) => {
    await makePayment();
    res.json({ ok: true });
});

module.exports = { signup, login, account_summary, 
    customer_payment, forgot_password, reset_password };