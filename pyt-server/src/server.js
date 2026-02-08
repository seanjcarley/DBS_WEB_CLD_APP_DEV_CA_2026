const { app } = require('./app');
const { env } = require('./config/env');

app.listen(env.PORT, () => {
    console.log(`Pay-Your-Toll API listening on http://localhost:${env.PORT}`);
});
