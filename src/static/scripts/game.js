let oldTimeStamp;
speed = 200
mouseX = 0
mouseY = 0
spawn_locations = [{"x":65, "y":267},{"x":64, "y":50},{"x":59, "y":460},{"x":890, "y":465},{"x":895,"y":225},{"x":882,"y":40}]


function init(){
    canvas = document.getElementById('game-canvas');
    canvas.width = 1000
    canvas.height = 600
    ctx = canvas.getContext('2d');

    document.addEventListener("keydown", keyDownHandler, false)
    document.addEventListener("keyup", keyUpHandler, false);
    document.addEventListener("mousemove", getMousePos, false);
    document.addEventListener("mousedown", leftClickDown, false);
    document.addEventListener("mouseup", leftClickUp, false)

    setInterval(gameUpdate, 10)

    // Start the first frame request
    window.requestAnimationFrame(gameLoop);

    function leftClickDown(){
        players[you]["left_clicked"] = true
    }
    function leftClickUp(){
        players[you]["left_clicked"] = false
    }

    function getMousePos(evt) {
        var rect = canvas.getBoundingClientRect();
          mouseX = evt.clientX - rect.left
          mouseY = evt.clientY - rect.top
      }
    
    function keyDownHandler(e) {
        if (e.key == "d") {
            players[you]["right_pressed"] = true
        }
        else if (e.key == "a") {
            players[you]["left_pressed"] = true
        }
        else if (e.key == "s") {
            players[you]["down_pressed"] = true
        }
        else if (e.key == "w") {
            players[you]["up_pressed"] = true
        }

    }
    
    function keyUpHandler(e) {
        if (e.key == "d") {
            players[you]["right_pressed"] = false
            players[you]["velocity"]["x"] = 0
        }
        else if (e.key == "a") {
            players[you]["left_pressed"] = false
            players[you]["velocity"]["x"] = 0
        }
        else if (e.key == "s") {
            players[you]["down_pressed"] = false
            players[you]["velocity"]["y"] = 0
        }
        else if (e.key == "w") {
            players[you]["up_pressed"] = false
            players[you]["velocity"]["y"] = 0
        }

    }

    socket.on("game_update", data => {
        players[opp] = data["gamestate"]
        objects["mutes"][opp] = data["objects"]
        
    })

    socket.on("your_dead", data =>{
        spawn = spawn_locations[Math.floor(Math.random()*spawn_locations.length)]
        players[you]["x"] = spawn["x"]
        players[you]["y"] = spawn["y"]
        players[you]["dead"] = false

    })
}

function player_movement(player){
    if (player["right_pressed"] == true){
        player["velocity"]["x"] = player["speed"] * deltaTime
    }
    else if (player["left_pressed"] == true){
        player["velocity"]["x"] = (player["speed"] * deltaTime) * -1
    } 
    if (player["up_pressed"] == true){
        player["velocity"]["y"] = (player["speed"] * deltaTime) * -1
    }
    else if (player["down_pressed"] == true){
        player["velocity"]["y"] = (player["speed"] * deltaTime)
    }
    if (player["who"] == you){
        if (player["left_clicked"]){
            if (player["cshoot_cooldown"] <= 0){
                objects["mutes"][you].push({
                    "shape":"circle",
                    "type":"bullet",
                    "color":players[you]["color"],
                    "timer":0,
                    "time":3,
                    "velocity":{
                        "x":(Math.cos(player["angle"] * Math.PI/180) * player["bullet_speed"]),
                        "y":(Math.sin(player["angle"] * Math.PI/180) * player["bullet_speed"]),
                    },
                    "radius":15,
                    "x":player["x"] + player["width"],
                    "y": player["y"] + player["height"]
                })
                player["cshoot_cooldown"] += player["shoot_cooldown"]
            }

        }
    }
}

function handleCooldowns(player){
    if (player["cshoot_cooldown"] > 0){
        player["cshoot_cooldown"] -= deltaTime
    }
}

function gameLoop(timeStamp) {
    // calculate deltaTime for use in physics based calculations
    deltaTime = (timeStamp - oldTimeStamp) / 1000;
    if (!deltaTime) deltaTime = 0;
    oldTimeStamp = timeStamp;
    
    // clear canvas for next frame
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // find the x distance between the x position and the mouse x position. Same with Y
    // Do this is order to use tan(x) = y_distance/x_distance
    x_distance = mouseX - (players[you]["x"] + players[you]["width"])
    y_distance = mouseY - (players[you]["y"] + players[you]["height"])
    angle = (Math.atan2(y_distance, x_distance) * 180/Math.PI)
    players[you]["angle"] = angle

    // handle player cooldowns
    handleCooldowns(players[you])
    
    // handle player movement
    player_movement(players[you])
    player_movement(players[opp])

    // handle physics for all objects in scene
    physics()

    // draw all objects
    draw_objects()

    // draw all players
    draw_player(players[you])
    draw_player(players[opp])
    // request new animation frame
    if (players[you]["dead"] == true){
        spawn = spawn_locations[Math.floor(Math.random()*spawn_locations.length)]
        players[you]["x"] = spawn["x"]
        players[you]["y"] = spawn["y"]
        players[you]["dead"] = false
    }
    window.requestAnimationFrame(gameLoop);
    
}

function gameUpdate(){
    // emit the current gamestate
    if(you == "p1"){
        socket.volatile.emit("game_update", {"id":game_id,"i_am":you,"gamestate":players[you], "my_id":my_id, "objects":objects["mutes"][you], "p1":players[you]["dead"], "p2":players[opp]["dead"]})
    }
    if(you == "p2"){
        socket.volatile.emit("game_update", {"id":game_id,"i_am":you,"gamestate":players[you], "my_id":my_id, "objects":objects["mutes"][you], "p2":players[you]["dead"], "p1":players[opp]["dead"]})
    }

}

