const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
// const gameServer = require("./modules/gameServer")
gamer = require("./modules/helper")
console.log(gamer.makeid(10))

console.log(makeid(10))
servers = {}

app.use("/static/styles", express.static(__dirname + "/static/styles"))
app.use("/static/scripts", express.static(__dirname + "/static/scripts"))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/templates/main.html');
});

io.on('connection', (socket) => {
    console.log("user connected")

    socket.on("my_id", (id) => {
        socket.join(id)
    })

    socket.on("create_game", (p1_id) => {
        new_server = new gameServer.gameServer(socket)
        console.log(new_server.gamestate)
        while (true){
            id = makeid()
        }

    })
});



server.listen(3000, () => {
  console.log('listening on *:3000');
});