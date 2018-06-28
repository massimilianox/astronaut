const http = require('http');
const express = require('express'); // npm install express --save
const app = express();

const server = http.createServer(app);
console.log('server started');

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/astronaut.html');
});

server.listen(1818);
console.log('server listening at: 1818');
