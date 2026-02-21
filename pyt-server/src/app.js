const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { env } = require('./config/env');
const { errorHandler } = require('./middleware/errorHandler');
const authRoutes = require('./routes/auth.routes');
const vehicleRoutes = require('./routes/vehicle.routes');
const paymentRoutes = require('./routes/payment.routes');


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

app.use('/api/auth', authRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/payments', paymentRoutes);

app.use(errorHandler);

module.exports = { app };
