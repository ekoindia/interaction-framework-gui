/* eslint-disable no-console */
const request = require('supertest');
const app = require('../app');
const sequelize = require('../database');

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
    // it('check database connection', (done) => {
    //     sequelize
    //         .authenticate()
    //         .then(() => {
    //             // console.log('Database connection has been established successfully.');
    //             done();
    //         })
    //         .catch((error) => console.log('Unable to connect to the database:', error));
    // });
});
