const request = require('supertest');
const app = require('../lib/app');

describe('app endpoint', () => {
    it('creates a new car by post', async() => {
        const res = await request(app)
        .post('/api/v1/tesla/model_s');
        .send({
            title: 'model s',
            descript: 'very nice',
            model: 'extended',
            color: 'black',
            wheelType: 'ion',
            interior: 'black'
        });

        expect(res.body).toEqual({ 
            title: 'model s',
            descript: 'very nice',
            model: 'extended',
            color: 'black',
            wheelType: 'ion',
            interior: 'black'
        });
    }); 
});
