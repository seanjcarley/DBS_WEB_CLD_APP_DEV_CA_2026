const router = required('express').Router();
const { z } = require('zod');
const { validate } = require('../middleware/validate');

const { signup, login } = require('../controllers/auth.controller');

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


router.post('/signup', validate(registerSchema), signup);
router.post('/login', validate(loginSchema), login);

module.exports = router;
