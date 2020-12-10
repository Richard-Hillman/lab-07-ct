const express = require('express');
const app = express();

// endpoint 
app.get('/', (req, res, next) => {
    res.send({ hello: 'world' });
});


module.exports = app;
