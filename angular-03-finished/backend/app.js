const express = require('express');
const bP = require('body-parser');

const app = express();

app.use(bP.json());
app.use(bP.urlencoded({extended:false}));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
    next();
});

app.post('/api/posts',(req, res, next)=>{
    const post = req.body;
    console.log(req);
    res.status(201).json({
        message: 'Post añadido satisfactoriamente'
    });
});


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