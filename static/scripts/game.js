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
            "width":35, 
            "height":35, 
            "angle":0, 
            "color":"blue"}, 
        "p2":{
            "x":1000 - 50,
            "y":600 - 50,
            "width":35,
            "height":35,
            "angle":0, 
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


    // Start the first frame request
    window.requestAnimationFrame(gameLoop);
    

    function getMousePos(evt) {
        var rect = canvas.getBoundingClientRect();
          mouseX = evt.clientX - rect.left
          mouseY = evt.clientY - rect.top
      }
    
    function keyDownHandler(e) {
        if (e.key == "d") {
            right_pressed = true
        }
        else if (e.key == "a") {
            left_pressed = true
        }
        else if (e.key == "s") {
            down_pressed = true
        }
        else if (e.key == "w") {
            up_pressed = true
        }

    }
    
    function keyUpHandler(e) {
        if (e.key == "d") {
            right_pressed = false
        }
        else if (e.key == "a") {
            left_pressed = false
        }
        else if (e.key == "s") {
            down_pressed = false
        }
        else if (e.key == "w") {
            up_pressed = false
        }

    }
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
    if (right_pressed == true){
        if ((player["x"] + (player["width"]) + speed * deltaTime) < canvas.width){
            player["x"] += speed * deltaTime
        }
    }
    else if (left_pressed == true){
        if ((player["x"] + (player["width"]) + speed * deltaTime) > 0){
            player["x"] -= speed * deltaTime
        }
    } 
    if (up_pressed == true){
        player["y"] -= speed * deltaTime
    }
    else if (down_pressed == true){
        player["y"] += speed * deltaTime
    }

}

function gameLoop(timeStamp) {
    deltaTime = (timeStamp - oldTimeStamp) / 1000;
    if (!deltaTime) deltaTime = 0;
    oldTimeStamp = timeStamp;
    context.clearRect(0, 0, canvas.width, canvas.height)

    // rotate block to mouse
    x_distance = mouseX - (objects["p1"]["x"] + objects["p1"]["width"])
    y_distance = mouseY - (objects["p1"]["y"] + objects["p1"]["height"])
    angle = Math.atan(y_distance/x_distance) * (180/Math.PI)
    objects["p1"]["angle"] = angle
    console.log(angle)
    player_physics(objects["p1"])
    draw_player(objects["p1"])
    draw_player(objects["p2"])
    window.requestAnimationFrame(gameLoop);
}