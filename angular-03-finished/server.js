const http = require('http');
//se exporta express
const app = require('./backend/app');

/*const server = http.createServer((req, res) => {
    res.end('Todo bien pelado');
});*/

const port = process.env.PORT || 3000;

app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => {
    console.log('Se conecto con express');
});

/*
const http = require('http');

const server = http.createServer((req, res) => {
    //res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hola panchito, lo hiciste bien');
});

server.listen(process.env.PORT || 3000, () => {
    console.log('Servidor en ejecución en el puerto 3000');
});*/