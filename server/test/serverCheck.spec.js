/* eslint-disable jest/expect-expect */
/* eslint-disable jest/no-done-callback */
/* eslint-disable no-console */
const request = require('supertest');
const dotenv = require('dotenv');
const Sequelize = require('sequelize');
const app = require('../app');

dotenv.config({ path: '../.env' });

describe('Server Check Tests', () => {
    it('returns 200 OK if server is up', (done) => {
        // request(app).get('/api/v1/').expect(200, done);
        request(app)
            .get('/api/v1/')
            .then((response) => {
                expect(response.status).toBe(200);
                done();
            });
    });
    it('check database connection', (done) => {
        const Conn = new Sequelize(process.env.DB_LOCAL_URI, {
            define: {
                timestamps: false, // true by default. false because bydefault sequelize adds createdAt, modifiedAt columns with timestamps.if you want those columns make ths true.
            },
            logging: false,
        });
        Conn.sync({ force: false })
            .then(() => {
                done();
            })
            .catch((error) => console.log('Unable to connect to the database:', error));
    });
});
