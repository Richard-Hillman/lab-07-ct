require('dotenv').config();
const express = require('express');
const app = express();
const ModelS = require('./tesla/ModelS');
const Consumer = require('./tesla/Consumer');
app.use(express.json());

// ---------------------------------------------

app.get('/tesla/model_s', (req, res) => {
  ModelS
    .find()
    .then(modelS => res.send(modelS));
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

// ==============================================================

app.get('/tesla/consumer', (req, res) => {
  Consumer
    .find()
    .then(consumer => res.send(consumer));

});

// -------------------------------------------

app.get('/tesla/consumer/:id', (req, res) => {
  Consumer
    .findById(req.params.id)
    .then(consumer => res.send(consumer));
});

// -------------------------------------------

app.post('/tesla/consumer', async(req, res) => {
  Consumer 
    .insert(req.body)
    .then(consumer => res.send(consumer));
});

// ---------------------------------------------

app.put('/tesla/consumer/:id', (req, res) => {
  Consumer
    .update(req.params.id, req.body)
    .then(consumer => res.send(consumer));
});

// ----------------------------------------------

app.delete('/tesla/consumer/:id', (req, res) => {
  Consumer
    .delete(req.params.id)
    .then(consumer => res.send(consumer));
}); 


module.exports = app ;
