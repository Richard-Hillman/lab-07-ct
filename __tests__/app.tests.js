const request = require('supertest');
const app = require('../lib/app');

describe('app endpoint', () => {
    it('creates a new car via post', async() => {
        const res = await request(app).get('/');
        
        expect(res.body).toEqual({ hello: 'world' });
    }); 
});
