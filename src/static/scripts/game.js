let secondsPassed;
let oldTimeStamp;
let right_pressed
let left_pressed
let down_pressed
let up_pressed
speed = 200
rotate_speed = 10
mouseX = 0
mouseY = 0

objects = {
        "p1":{
            "x":0, 
            "y":0,
            "right_pressed":false,
            "left_pressed":false,
            "up_pressed":false,
            "down_pressed":false,
            "width":35, 
            "height":35, 
            "angle":0,
            "dead":false,
            "color":"blue"}, 
        "p2":{
            "x":1000 - 50,
            "y":600 - 50,
            "right_pressed":false,
            "left_pressed":false,
            "up_pressed":false,
            "down_pressed":false,
            "width":35, 
            "height":35, 
            "angle":0,
            "dead":false,   
            "color":"red"}
        }

function init(){
    canvas = document.getElementById('game-canvas');
    canvas.width = 1000
    canvas.height = 600
    context = canvas.getContext('2d');
    
    document.addEventListener("keydown", keyDownHandler, false)
    document.addEventListener("keyup", keyUpHandler, false);
    document.addEventListener("mousemove",  getMousePos, false);

    setInterval(gameUpdate, 15)
    // Start the first frame request
    window.requestAnimationFrame(gameLoop);

    function getMousePos(evt) {
        var rect = canvas.getBoundingClientRect();
          mouseX = evt.clientX - rect.left
          mouseY = evt.clientY - rect.top
      }
    
    function keyDownHandler(e) {
        if (e.key == "d") {
            objects[you]["right_pressed"] = true
        }
        else if (e.key == "a") {
            objects[you]["left_pressed"] = true
        }
        else if (e.key == "s") {
            objects[you]["down_pressed"] = true
        }
        else if (e.key == "w") {
            objects[you]["up_pressed"] = true
        }

    }
    
    function keyUpHandler(e) {
        if (e.key == "d") {
            objects[you]["right_pressed"] = false
        }
        else if (e.key == "a") {
            objects[you]["left_pressed"] = false
        }
        else if (e.key == "s") {
            objects[you]["down_pressed"] = false
        }
        else if (e.key == "w") {
            objects[you]["up_pressed"] = false
        }

    }

    socket.on("game_update", data => {
        objects[opp] = data
    })

}

function draw_player(object){
    context.fillStyle = object["color"]

    if (object["angle"] == 0){
        context.fillRect(object["x"], object["y"], object["width"], object["height"])
    }
    else{
        context.save()
        context.translate(object["x"] + object["width"], object["y"] + object["height"])
        context.rotate(object["angle"] * Math.PI / 180)
        context.fillRect(object["width"] / -2, object["height"] / -2, object["width"], object["height"])
        context.restore()
    }
}

function player_physics(player){
    if (player["right_pressed"] == true){
        if ((player["x"] + (player["width"]) + speed * deltaTime) < canvas.width){
            player["x"] += speed * deltaTime
        }
    }
    else if (player["left_pressed"] == true){
        if ((player["x"] + (player["width"]) + speed * deltaTime) > 0){
            player["x"] -= speed * deltaTime
        }
    } 
    if (player["up_pressed"] == true){
        if ((player["y"]) + (player["height"] + speed * deltaTime) > 0){
            player["y"] -= speed * deltaTime
        }
    }
    else if (player["down_pressed"] == true){
        if ((player["y"]) + (player["height"] + speed * deltaTime) < canvas.height){
            player["y"] += speed * deltaTime
        }
    }

}

function gameLoop(timeStamp) {
    deltaTime = (timeStamp - oldTimeStamp) / 1000;
    if (!deltaTime) deltaTime = 0;
    oldTimeStamp = timeStamp;
    context.clearRect(0, 0, canvas.width, canvas.height)

    // rotate block to mouse
    x_distance = mouseX - (objects[you]["x"] + objects[you]["width"])
    y_distance = mouseY - (objects[you]["y"] + objects[you]["height"])
    angle = Math.atan(y_distance/x_distance) * (180/Math.PI)
    objects[you]["angle"] = angle

    // handle drawing player, and checking physics
    player_physics(objects[you])
    player_physics(objects[opp])
    draw_player(objects[you])
    draw_player(objects[opp])

    window.requestAnimationFrame(gameLoop);
}

function gameUpdate(){
    socket.volatile.emit("game_update", {"id":game_id,"i_am":you,"gamestate":objects[you], "my_id":my_id})
}

