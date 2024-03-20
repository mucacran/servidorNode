const express = require('express');

const app = express();

app.use((req, res, next) => {
    console.log("Este es el primer intermediario");
    next();
});

app.use((req, res, next) => {
    res.send('Hola panchito lo hiciste super bien');
});

module.exports = app;