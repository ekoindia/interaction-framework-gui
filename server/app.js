const express = require('express');
const cors = require('cors');
const getInteraction = require('./routes/getInteractions');
const getDataFlow = require('./routes/getDataFlow');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/v1', (req, res) =>
    res.json({
        success: true,
        message: 'Server is up',
    }),
);
app.use('/api/v1', getInteraction);
app.use('/api/v1', getDataFlow);

module.exports = app;
