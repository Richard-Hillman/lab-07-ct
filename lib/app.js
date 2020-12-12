require('dotenv').config();
const express = require('express');
const app = express();
const ModelS = require('./tesla/ModelS');
app.use(express.json());

// ---------------------------------------------

app.get('/tesla/model_s', (req, res) => {
  ModelS
    .find()
    .then(modelS => res.send(modelS));
  console.log('im here');
});

// -------------------------------------------

app.get('/tesla/model_s/:id', (req, res) => {
  ModelS
    .findById(req.params.id)
    .then(modelS => res.send(modelS));
});

// -------------------------------------------

app.post('/tesla/model_s', async(req, res) => {
  ModelS 
    .insert(req.body)
    .then(modelS => res.send(modelS));
});

// ---------------------------------------------

app.put('/tesla/model_s/:id', (req, res) => {
  ModelS
    .update(req.params.id, req.body)
    .then(modelS => res.send(modelS));
});

// ----------------------------------------------

app.delete('/tesla/model_s/:id', (req, res) => {
  ModelS
    .delete(req.params.id)
    .then(modelS => res.send(modelS));
}); 


module.exports = app ;
