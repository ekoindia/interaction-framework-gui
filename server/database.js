/* eslint-disable no-console */
const dotenv = require('dotenv');
const Sequelize = require('sequelize');
const models = require('./models/init-models');

dotenv.config({ path: './.env' });

const Conn = new Sequelize(process.env.DB_LOCAL_URI, {
    define: {
        timestamps: false, // true by default. false because bydefault sequelize adds createdAt, modifiedAt columns with timestamps.if you want those columns make ths true.
    },
    logging: false,
});
Conn.sync({ force: false }).then(() => {
    console.log('sync is completed');
});
/* make sure you use false here. otherwise the total data 
    from the impported models will get deleted and new tables will be created */
const transaction_framework = models.initModels(Conn);

module.exports = transaction_framework;
