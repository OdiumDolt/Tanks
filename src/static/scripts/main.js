
var socket = io();

function startGame(){
    game_mode = document.getElementById("game-mode-selector").value
    socket.emit("start_game", {"game_id":game_id, "game_mode":game_mode})
    document.querySelector(".main-container").innerHTML = "<canvas id='game-canvas'></canvas>"
    document.querySelector(".main-container").style["width"] = "1000px"
    document.querySelector(".main-container").style["height"] = "600px"
    document.getElementById("game-canvas").style["height"] = "600px"
    document.getElementById("game-canvas").style["width"] = "1000px"

    init()
}

socket.on("connect", function(){
    console.log("Connected to server")
    my_id = btoa(Math.random().toString()).substr(10, 30)
    socket.emit("my_id", my_id)
})


socket.on("TEST", data => {
    console.log("--- THIS IS TESTING DATA ---")
    console.log("DATA IS: " + data)

})

function createGame(){
    socket.emit("create_game", my_id)
    socket.on("game_id", data => {
        game_id = data["id"]
        you = data["you"]
        opp = data["opp"]
        copyToClipboard(game_id)
        document.querySelector(".main-container").innerHTML = '<div class="main-container">\
        <div class="player-joined" id="p1">Player 1</div> \
        <div class="player-not-joined" id="p2">Player 2</div> \
        <select id="game-lomode-selector" class="select-dropdown"> \
            <option value="respawn">Respawns</option> \
        </select> \
        <div class="join-button" onclick="startGame()">Start</div> \
        </div>\
    '
    
    })
    socket.on("player_joined", who => {
        document.getElementById("p2").style["background-color"] = "#e2b714"
        document.getElementById("p2").style["color"] = "#1a1a1a"
    })

}

function joinGame(){
    socket.emit("join_game", {"server_id":document.getElementById("id-input").value, "id":my_id})
    socket.on("game_id", data => {
        game_id = data["id"]
        you = data["you"]
        opp = data["opp"]
        document.querySelector(".main-container").innerHTML = '<div class="main-container">\
        <div class="player-joined" id="p1">Player 1</div> \
        <div class="player-joined" id="p2">Player 2</div>'
    })

    socket.on("game_start", data =>{
        game_mode = data["game_mode"]
        document.querySelector(".main-container").innerHTML = "<canvas id='game-canvas'></canvas>"
        document.querySelector(".main-container").style["width"] = "1000px"
        document.querySelector(".main-container").style["height"] = "600px"
        document.getElementById("game-canvas").style["height"] = "600px"
        document.getElementById("game-canvas").style["width"] = "1000px"
        init()
    })
}

function makeMap(){
    document.querySelector(".main-container").innerHTML = "<canvas id='game-canvas'></canvas>"
    document.querySelector(".main-container").style["width"] = "1000px"
    document.querySelector(".main-container").style["height"] = "600px"
    document.getElementById("game-canvas").style["height"] = "600px"
    document.getElementById("game-canvas").style["width"] = "1000px"

    init_map()
}


