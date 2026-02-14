// src/config/env.js

const path = require('path');
require('dotenv').config({
    path: path.join(__dirname, '../../.env'),
});

const env = {
    PORT: process.env.PORT || 5000, 
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
    DB_PORT: process.env.DB_PORT || 3306,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '2h',
    ONEAUTO_SECRET: process.env.ONEAUTO_SECRET,
    ONEAUTO_BASE_URL: process.env.ONEAUTO_BASE_URL,
    STRIPE_SECRET: process.env.STRIPE_SECRET,
    STRIPE_PUBLIC: process.env.STRIPE_PUBLIC,
    CORS_ORIGIN: process.env.CORS_ORIGIN || '*'
}

const required = ['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME', 'JWT_SECRET'];

for (const key of required) {
    if (!env[key]) throw new Error(`Missing environment variable: ${key}`);
}

module.exports = { env };