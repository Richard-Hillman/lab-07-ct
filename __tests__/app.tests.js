const fs = require('fs');
const request = require('supertest');
const app = require('../lib/app');
const pool = require('../lib/utils/pool');

// -------------------------------------------

describe('app endpoint', () => {

  // sets up database before each test
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  // ---------------------------------

  // Destroys connection to postgres after tests are finished    
  afterAll(() => {
    return pool.end();
  });

  // ----------------------------------

  it('creates a new car by post', async() => {
    const res = await request(app)
      .post('/api/v1/tesla/model_s')
      .send({
        title: 'model s',
        descript: 'very nice',
        model: 'extended',
        color: 'black',
        wheelType: 'ion',
        interior: 'black'
      });

    expect(res.body).toEqual({ 
      id: '1',
      title: 'model s',
      descript: 'very nice',
      model: 'extended',
      color: 'black',
      wheelType: 'ion',
      interior: 'black'
    });
  }); 
});
