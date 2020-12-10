const express = require('express');
const ModelS = require('./cars/ModelS');
const app = express();

app.use(express.json());

app.post('/api/v1/tesla/model_s', (req, res, next) => {
  ModelS
    .insert(req.body)
    .then(model_s => res.send(model_s))
    .catch(next);
});

module.exports = app;
