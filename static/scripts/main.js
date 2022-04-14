
var socket = io();

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
        document.querySelector(".main-container").innerHTML = "<canvas id='game-canvas'></canvas>"
        document.querySelector(".main-container").style["width"] = "1000px"
        document.querySelector(".main-container").style["height"] = "600px"
        document.getElementById("game-canvas").style["height"] = "600px"
        document.getElementById("game-canvas").style["width"] = "1000px"

        init()
    })
}

function joinGame(){
    socket.emit("join_game", {"server_id":document.getElementById("id-input").value, "id":my_id})
    socket.on("game_id", data => {
        game_id = data["id"]
        you = data["you"]
        opp = data["opp"]
        document.querySelector(".main-container").innerHTML = "<canvas id='game-canvas'></canvas>"
        document.querySelector(".main-container").style["width"] = "1000px"
        document.querySelector(".main-container").style["height"] = "600px"
        document.getElementById("game-canvas").style["height"] = "600px"
        document.getElementById("game-canvas").style["width"] = "1000px"

        init()
    })
}


