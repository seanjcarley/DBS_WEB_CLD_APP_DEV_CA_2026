const router = require('express').Router();
// const { z } = require('zod');
// const validate = require('../middleware/validate');
const { create_checkout, create_intent, session_status, fetch_toll_rates, 
    get_checkout } = require('../controllers/payment.controller')

router.post('/create_checkout', create_checkout);
router.get('/session_status', session_status);
router.get('/toll_rates', fetch_toll_rates);
router.get('/get_checkout/:clientSecret', get_checkout);
router.post('/create_intent', create_intent);

module.exports = router;