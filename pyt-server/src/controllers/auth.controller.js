const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { env } = require('../config/env');
const { asyncHandler } = require('../utils/asyncHandler');
const { createUser, findUserByEmail } = require('../models/users.model');

const signup = asyncHandler(async (req, res) => {
    const {email, password, fname, surname, phone, vrn} = req.body;

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

    res.json({ ok: true, token });
})

module.exports = { signup, login };