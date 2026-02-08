const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { env } = require('./config/env');
const { errorHandler } = require('./middleware/errorHandler');
const authRoutes = requrire('./routes/auth.routes')

const app = express();
app.use(helmet());
app.use(express.json());

app.use(cors({
    origin: env.CORS_ORIGIN,
    credentials: true,
}));

app.get('/health', (req, res) => {
    res.json({ok: true, message: 'Pay Your Toll API running...'});
});

app.use

app.use(errorHandler);

module.exports = { app };
