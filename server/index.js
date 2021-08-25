/* eslint-disable no-console */
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './.env' });

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});
