const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const gameServer = require("./modules/gameServer.js")
helper = require("./modules/helper.js")
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
        while (true){
            id = helper.makeid(10)
            console.log(id)
            if (id in servers){
                'pass'
            }
            else{
                servers[id] = new_server
                break
            }
        }
        servers[id].p1 = p1_id
        servers[id].id = id
        socket.join(id)
        io.to(p1_id).emit("game_id", {"id":id, "you":"p1", "opp":"p2"})
    })

    socket.on("join_game", (data) => {
        game_id = data["server_id"]
        player_id = data["id"]
        if (game_id in servers){
            if(servers[game_id].p2 == null){
                servers[game_id].p2 = player_id
                socket.join(game_id)
                io.to(player_id).emit("game_id", {"id":game_id, "you":"p2", "opp":"p1"})
                io.to(servers[game_id].p1).emit("player_joined", "p2")
            }  
        }

    })


    socket.on("start_game", (data) => {
        io.to(servers[data["game_id"]].p2).emit("game_start", {"game_mode":data["game_mode"]})
    })

    socket.on("game_update", (data) => {
        try{
            update_things = true
            player = data["my_id"]
            game_id = data["id"]
            player_num = data["i_am"]
            gamestate = data["gamestate"]
            if(update_things){
                if (player_num == "p1"){
                    io.volatile.to(servers[game_id].p2).emit("game_update", {"gamestate":gamestate, "objects":data["objects"], "p1":data["p1"], "p2":data["p2"]})
                }
                else{
                    io.volatile.to(servers[game_id].p1).emit("game_update", {"gamestate":gamestate, "objects":data["objects"], "p1":data["p1"], "p2":data["p2"]})
                }
            }
        }
        catch{
            
        }
    })
    socket.on("opp_dead", data => {
        game_id = data["game_id"]
        who = data["im"]
        if (who == "p1"){
            io.to(servers[game_id].p2).emit("your_dead", "cool")
        }
        else if (who == "p2"){
            io.to(servers[game_id].p1).emit("your_dead", "cool")
        }
    })

    socket.on("disconnect", function() {
        console.log("disconnected")
    })

});





server.listen(5000, () => {
  console.log('listening on *:5000');
});