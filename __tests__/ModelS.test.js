// const fs = require('fs');
// const request = require('supertest');
// const app = require('../lib/app');
// const pool = require('../lib/utils/pool');
// const ModelS = require('../lib/tesla/ModelS');

// describe('endpoint', () => {

//   beforeAll(() => {
//     return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
//   });

//   afterAll(() => {
//     return pool.end();
//   });

//   // -----------------------------------------------

//   it('post a new car model_s row to the data table', async() => {

//     const post = {
//       title: 'Model S',
//       descript: 'an evolution in automobile engineering. Dual Motor Model S is a categorical improvement on conventional all-wheel drive systems. With two motors, one in the front and one in the rear, Model S digitally and independently controls torque to the front and rear wheels.', 
//       model: 'Long Range Plus',
//       color: 'Solid Black',
//       wheelType: '19inch Tempest',
//       interior: 'All Black'
//     };


//     const expectation = {
//       title: 'Model S',
//       descript: 'an evolution in automobile engineering. Dual Motor Model S is a categorical improvement on conventional all-wheel drive systems. With two motors, one in the front and one in the rear, Model S digitally and independently controls torque to the front and rear wheels.', 
//       model: 'Long Range Plus',
//       color: 'Solid Black',
//       wheelType: '19inch Tempest',
//       interior: 'All Black',
//       id: '1'
//     };

//     const data = await request(app)
//       .post('/tesla/model_s')
//       .send(post)
//       .expect('Content-Type', /json/)
//       .expect(200);
//     expect(data.body).toEqual(expectation);
//   });

//   // -----------------------------------------------------

//   it('gets all rows from models table', async() => {

//     const expectation = [
//       {
//         title: 'Model S',
//         descript: 'an evolution in automobile engineering. Dual Motor Model S is a categorical improvement on conventional all-wheel drive systems. With two motors, one in the front and one in the rear, Model S digitally and independently controls torque to the front and rear wheels.', 
//         model: 'Long Range Plus',
//         color: 'Solid Black',
//         wheelType: '19inch Tempest',
//         interior: 'All Black',
//         id: '1'
//       }
//     ];


//     const data = await request(app) 
//       .get('/tesla/model_s/')
//       .expect('Content-Type', /json/)
//       .expect(200);
//     expect(data.body).toEqual(expectation); 
      
//   });


//   // -----------------------------------------------------

//   it('get car by id', async() => { 

//     const tesla = await ModelS.insert({
//       title: 'Model S',
//       descript: 'an evolution in automobile engineering. Dual Motor Model S is a categorical improvement on conventional all-wheel drive systems. With two motors, one in the front and one in the rear, Model S digitally and independently controls torque to the front and rear wheels.', 
//       model: 'Long Range Plus',
//       color: 'Solid Black',
//       wheelType: '19inch Tempest',
//       interior: 'All Black'
//     });


//     const response = await request(app)
//       .put(`/tesla/model_s/${tesla.id}`)
//       .send({ 
//         title: 'Model S',
//         descript: 'an evolution in automobile engineering. Dual Motor Model S is a categorical improvement on conventional all-wheel drive systems. With two motors, one in the front and one in the rear, Model S digitally and independently controls torque to the front and rear wheels.', 
//         model: 'Long Range Plus',
//         color: 'Solid Black',
//         wheelType: '19inch Tempest',
//         interior: 'Cream'
//       });

//     expect(response.body).toEqual({
//       ...tesla,
//       title: 'Model S',
//       descript: 'an evolution in automobile engineering. Dual Motor Model S is a categorical improvement on conventional all-wheel drive systems. With two motors, one in the front and one in the rear, Model S digitally and independently controls torque to the front and rear wheels.', 
//       model: 'Long Range Plus',
//       color: 'Solid Black',
//       wheelType: '19inch Tempest',
//       interior: 'Cream'
//     });
//   });

//   //   -----------------------------------------------------

//   it('delete a car', async() => {
//     const expectation = {
//       title: 'Model S',
//       descript: 'an evolution in automobile engineering. Dual Motor Model S is a categorical improvement on conventional all-wheel drive systems. With two motors, one in the front and one in the rear, Model S digitally and independently controls torque to the front and rear wheels.', 
//       model: 'Long Range Plus',
//       color: 'Solid Black',
//       wheelType: '19inch Tempest',
//       interior: 'All Black',
//       id:'1'
//     };

//     const data = await request(app)
//       .delete('/tesla/model_s/1')
//       .expect('Content-Type', /json/)
//       .expect(200);

//     expect(data.body).toEqual(expectation);

//   });

//   // END=======================================================

// });

