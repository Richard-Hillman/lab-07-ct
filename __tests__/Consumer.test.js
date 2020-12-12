const fs = require('fs');
const request = require('supertest');
const app = require('../lib/app');
const pool = require('../lib/utils/pool');
const ModelS = require('../lib/tesla/Consumer');

describe('Consumer', () => {

  beforeAll(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });
  
  afterAll(() => {
    return pool.end();
  });
  
  // -----------------------------------------------
  
  test('post a new consumer row to the data table', async() => {

    const post = {
      description: 'green',
      age: '16-20',
      gender: 'trans',
      location: 'east'
    };

    const expectation = {
      description: 'green',
      age: '16-20',
      gender: 'trans',
      location: 'east'
    };

    const data = await request(app)
      .post('/tesla/consumer')
      .send(post)
      .expect('Content-Type', /json/)
      .expect(200);
    expect(data.body).toEqual(expectation);
  });

  // -----------------------------------------------------

  test('gets all rows from consumer table', async() => {

    const expectation = [
      {
        description: 'green',
        age: '16-20',
        gender: 'trans',
        location: 'east'
      }
    ];


    const data = await request(app) 
      .get('/tesla/consumer/')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(data.body).toEqual(expectation); 
      
  });


  // -----------------------------------------------------

  test('get consumer by id', async() => { 

    const teslaConsumer = await Consumer.insert({
      description: 'green',
      age: '16-20',
      gender: 'trans',
      location: 'east'
    });


    const response = await request(app)
      .put(`/tesla/consumer/${teslaConsumer.id}`)
      .send({ 
        description: 'green',
        age: '16-20',
        gender: 'trans',
        location: 'west'
      });

    expect(response.body).toEqual({
      ...teslaConsumer,
      description: 'green',
      age: '16-20',
      gender: 'trans',
      location: 'west'
    });
  });

  //   -----------------------------------------------------

  test('delete a consumer', async() => {
    const expectation = {
      description: 'green',
      age: '16-20',
      gender: 'trans',
      location: 'east',
      id:'1'
    };

    const data = await request(app)
      .delete('/tesla/consumer/1')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(data.body).toEqual(expectation);

  });

  // END=======================================================

});

