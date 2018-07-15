const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io').listen(server);

const VIEWS_PATH = `${__dirname}/views`

app.use(express.static('public'))

//url request example 3
app.get('/', (req, res) => {
  res.sendFile(`${VIEWS_PATH}/index.html`);
});

app.listen(8080);
console.log('Server listening on 8080');

// Quand un client se connecte, on le note dans la console
io.sockets.on('connection', (socket) => {
    console.log('Un client est connecté !');
});
