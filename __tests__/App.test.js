const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
const ModelS = require('../lib/tesla/ModelS');
const Consumer = require('../lib/tesla/consumer'); 

// -----------------------------------------------

describe('Consumer', () => {

  let modelS;
  let consumer;

  beforeEach(async() => {
    await pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
    
    modelS = await ModelS.insert({
      title: 'Model S',
      descript: 'an evolution in automobile engineering. Dual Motor Model S is a categorical improvement on conventional all-wheel drive systems. With two motors, one in the front and one in the rear, Model S digitally and independently controls torque to the front and rear wheels.', 
      model: 'Long Range Plus',
      color: 'Solid Black',
      wheelType: '19inch Tempest',
      interior: 'All Black'  
    });

    consumer = await Consumer.insert({
      description: 'green',
      age: 16,
      gender: 'trans',
      location: 'east'
    });
  });

  // -----------------------------------------------

  afterAll(() => {
    return pool.end();
  });

  // -----------------------------------------------

  it('post a new car model_s row to the data table', async() => {

    const post = {
      title: 'Model S',
      descript: 'an evolution in automobile engineering. Dual Motor Model S is a categorical improvement on conventional all-wheel drive systems. With two motors, one in the front and one in the rear, Model S digitally and independently controls torque to the front and rear wheels.', 
      model: 'Long Range Plus',
      color: 'Solid Black',
      wheelType: '19inch Tempest',
      interior: 'All Black'
    };

    const expectation = {
      title: 'Model S',
      descript: 'an evolution in automobile engineering. Dual Motor Model S is a categorical improvement on conventional all-wheel drive systems. With two motors, one in the front and one in the rear, Model S digitally and independently controls torque to the front and rear wheels.', 
      model: 'Long Range Plus',
      color: 'Solid Black',
      wheelType: '19inch Tempest',
      interior: 'All Black',
      id:  expect.any(String)
    };

    const data = await request(app)
      .post('/tesla/model_s')
      .send(post)
      .expect('Content-Type', /json/)
      .expect(200);
    expect(data.body).toEqual(expectation);
  });

  //   -----------------------------------------------

  it('finds a model by id and associated consumer via GET', async() => {
    
    const modelS = await ModelS.insert({
      title: 'Model S',
      descript: 'an evolution in automobile engineering. Dual Motor Model S is a categorical improvement on conventional all-wheel drive systems. With two motors, one in the front and one in the rear, Model S digitally and independently controls torque to the front and rear wheels.', 
      model: 'Long Range Plus',
      color: 'Solid Black',
      wheelType: '19inch Tempest',
      interior: 'All Black' 
    });

    const consumers = await Promise.all([
      {  description: 'green',
        age: 16,
        gender: 'trans',
        location: 'east',
        modelsId: modelS.id},
      { description: 'orange',
        age: 17,
        gender: 'trans',
        location: 'east',
        modelsId: modelS.id },
      {  description: 'red',
        age: 19,
        gender: 'trans',
        location: 'east',
        modelsId: modelS.id
      }
    ].map(consumers => Consumer.insert(consumers)));

    const res = await request(app)
      .get(`/tesla/model_s/${modelS.id}`);

    expect(res.body).toEqual({
      ...modelS,
      consumers: expect.arrayContaining(consumers)
    });
  });

  // -----------------------------------------------------

  it('gets all rows from models table', async() => {

    const expectation = [
      {
        title: 'Model S',
        descript: 'an evolution in automobile engineering. Dual Motor Model S is a categorical improvement on conventional all-wheel drive systems. With two motors, one in the front and one in the rear, Model S digitally and independently controls torque to the front and rear wheels.', 
        model: 'Long Range Plus',
        color: 'Solid Black',
        wheelType: '19inch Tempest',
        interior: 'All Black',
        id: '1'
      }
    ];

    const data = await request(app) 
      .get('/tesla/model_s/')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(data.body).toEqual(expect.arrayContaining(expectation)); 
    expect(data.body).toHaveLength(expectation.length);
      
  });

  // -----------------------------------------------------

  it('get car by id', async() => { 

    const tesla = await ModelS.insert({
      title: 'Model S',
      descript: 'an evolution in automobile engineering. Dual Motor Model S is a categorical improvement on conventional all-wheel drive systems. With two motors, one in the front and one in the rear, Model S digitally and independently controls torque to the front and rear wheels.', 
      model: 'Long Range Plus',
      color: 'Solid Black',
      wheelType: '19inch Tempest',
      interior: 'All Black'
    });

    const response = await request(app)
      .put(`/tesla/model_s/${tesla.id}`)
      .send({ 
        title: 'Model S',
        descript: 'an evolution in automobile engineering. Dual Motor Model S is a categorical improvement on conventional all-wheel drive systems. With two motors, one in the front and one in the rear, Model S digitally and independently controls torque to the front and rear wheels.', 
        model: 'Long Range Plus',
        color: 'Solid Black',
        wheelType: '19inch Tempest',
        interior: 'Cream'
      });

    expect(response.body).toEqual({
      ...tesla,
      title: 'Model S',
      descript: 'an evolution in automobile engineering. Dual Motor Model S is a categorical improvement on conventional all-wheel drive systems. With two motors, one in the front and one in the rear, Model S digitally and independently controls torque to the front and rear wheels.', 
      model: 'Long Range Plus',
      color: 'Solid Black',
      wheelType: '19inch Tempest',
      interior: 'Cream'
    });
  });

  //   -----------------------------------------------------

  it('delete a car', async() => {
    const expectation = {
      title: 'Model S',
      descript: 'an evolution in automobile engineering. Dual Motor Model S is a categorical improvement on conventional all-wheel drive systems. With two motors, one in the front and one in the rear, Model S digitally and independently controls torque to the front and rear wheels.', 
      model: 'Long Range Plus',
      color: 'Solid Black',
      wheelType: '19inch Tempest',
      interior: 'All Black',
      id:'1'
    };

    const data = await request(app)
      .delete('/tesla/model_s/1')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(data.body).toEqual(expectation);
  });

  // END OF MODELS=======================================================

  it('post a new consumer row to the data table', async() => {

    const post = {
      description: 'green',
      age: 16,
      gender: 'trans',
      location: 'east'
    };

    const expectation = {
      description: 'green',
      age: 16,
      gender: 'trans',
      location: 'east',
      id: expect.any(String),
      modelsId: expect.any(String)
    };

    const data = await request(app)
      .post('/tesla/consumer')
      .send(post)
      .expect('Content-Type', /json/)
      .expect(200);
    expect(data.body).toEqual(expectation);
  });

  // -----------------------------------------------------

  it('gets all rows from consumer table', async() => {

    const expectation = [
      {
        description: 'green',
        age: 16,
        gender: 'trans',
        location: 'east',
        id: '1',
        modelsId: expect.any(String) 
      }
    ];

    const data = await request(app) 
      .get('/tesla/consumer/')
      .expect(200);
    expect(data.body).toEqual(expect.arrayContaining(expectation)); 
    expect(data.body).toHaveLength(expectation.length);

  });

  // -----------------------------------------------------

  it('get consumer by id', async() => { 

    const teslaConsumer = await Consumer.insert({
      description: 'green',
      age: 16,
      gender: 'trans',
      location: 'east'
    });

    const response = await request(app)
      .put(`/tesla/consumer/${teslaConsumer.id}`)
      .send({ 
        description: 'green',
        age: 16,
        gender: 'trans',
        location: 'west'
      });

    expect(response.body).toEqual({
      ...teslaConsumer,
      description: 'green',
      age: 16,
      gender: 'trans',
      location: 'west'
    });
  });

  //   -----------------------------------------------------

  it('delete a consumer', async() => {
    const expectation = {
      description: 'green',
      age: 16,
      gender: 'trans',
      location: 'east',
      id:'1',
      modelsId: expect.any(String) 
    };

    const data = await request(app)
      .delete('/tesla/consumer/1')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(data.body).toEqual(expectation);
  });

  // END=======================================================

});
