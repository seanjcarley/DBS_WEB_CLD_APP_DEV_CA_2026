const path = require('path');
require('donenv').config({
    path: path.join(__dirname, '../../../pyt-server/.env')
});

const env = {
    STRIPE_PUBLIC: process.env.STRIPE_PUBLIC,
}

const required = ['STRIPE_PUBLIC'];

for (const key of required) {
    if (!env[key]) throw new Error(`Missing environment variable: ${key}`);
}

module.exports = { env };