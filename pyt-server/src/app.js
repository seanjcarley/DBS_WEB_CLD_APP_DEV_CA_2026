const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { env } = require('./config/env');
const { errorHandler } = require('./middleware/errorHandler');
const authRoutes = require('./routes/auth.routes');

const app = express();
app.use(helmet());
app.use(express.json());
app.use(express.static('public'));

app.use(cors({
    origin: env.CORS_ORIGIN,
    credentials: true,
}));

app.get('/health', (req, res) => {
    res.json({ok: true, message: 'Pay Your Toll API running...'});
});

app.use('/api/auth', authRoutes)

app.use(errorHandler);
const stripe = require('stripe')(env.STRIPE_SECRET);

module.exports = { app };
