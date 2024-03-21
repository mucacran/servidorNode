const express = require('express');

const app = express();

app.use('/api/posts',(req, res, next) => {
    //console.log("Este es el primer intermediario");
    //next();
    const posts = [
{
    id: "pepepepe",
    title: "First server-side post",
    content: "This is coming grom Serfe"
},{
    id: "fskdhfksj",
    title: "Sgundo server-side post",
    content: "This is coming from Serfe"
}
    ];
    res.status(200).json({
        message: 'Posts fetche satisfactoriamente!',
        posts: posts
    });
});

/*
app.use((req, res, next) => {
    res.send('Hola panchito lo hiciste super bien');
});*/

module.exports = app;