const router = require('express').Router();
const { z } = require('zod');
const { validate } = require('../middleware/validate');
const { signup, login, account_summary, forgot_password, 
    reset_password} = require('../controllers/auth.controller');

const registerSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    fname: z.string().min(3),
    surname: z.string().min(3),
    phone: z.string().min(9),
    vrn: z.string().min(4),
});

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
})

const forgotPasswordSchema = z.object({
    email: z.string().email(),
    accountNumber: z.string(),
})

const resetPasswordSchema = z.object({
    password: z.string().min(8),
    id: z.string(),
})

const summarySchema = z.object({
    id: z.string(),
});


router.post('/register', validate(registerSchema), signup);
router.post('/login', validate(loginSchema), login);
router.post('/account_summary', validate(summarySchema), account_summary);
router.post(
    '/forgot_password', validate(forgotPasswordSchema), forgot_password);
router.post('/reset_password', validate(resetPasswordSchema), reset_password);
// router.post('/create-checkout-session', makePayment);

module.exports = router;
