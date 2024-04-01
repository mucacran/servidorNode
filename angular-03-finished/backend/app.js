const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const Post = require('./models/post');

const app = express();
mongoose.connect('mongodb+srv://elmucacranrasta:xxHMoTqkdyeTe2yf@cluster0.gieapmx.mongodb.net/')
    .then(() => {
        console.log('se ha conectado a la base de datos');
    })
    .catch(() => {
        console.log('Conección fallida ahora');
    });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
});
// xxHMoTqkdyeTe2yf
app.post("/api/posts", (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });

    post.save()
        .then(() => console.log('Post saved successfully'))
        .catch(error => console.error('Error saving post', error));

    console.log(post);
    res.status(201).json({
        message: 'Post added successfully'
    });
});

app.get("/api/posts", (req, res, next) => {
    Post.find()
        .then(posts => {
            console.log(posts); // Aquí obtienes los documentos recuperados de la base de datos
            res.status(200).json({
                message: "Posts fetched successfully!",
                posts: posts
            });
        })
        .catch(error => {
            console.error('Error al recuperar los posts:', error);
        });

    /*
    const posts = [
        {
            id: "fadf12421l",
            title: "First server-side post",
            content: "This is coming from the server"
        },
        {
            id: "ksajflaj132",
            title: "Second server-side post",
            content: "This is coming from the server!"
        }
    ];*/


});

app.delete("/api/posts/:id", (req, res, next) => {
    Post.deleteOne({ _id: req.params.id }).then(result => {
        console.log(result);
        res.status(200).json(
            {
                message: 'Post eliminado o borrado'
            }
        );
    }

    );

});

module.exports = app;
