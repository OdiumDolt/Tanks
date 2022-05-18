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
players = {
        "p1":{
            "who":"p1",
            "x":0, 
            "y":0,
            "right_pressed":false,
            "left_pressed":false,
            "up_pressed":false,
            "down_pressed":false,
            "width":30, 
            "height":30, 
            "angle":0,
            "dead":false,
            "color":"blue"}, 
        "p2":{
            "who":"p2",
            "x":1000 - 50,
            "y":600 - 50,
            "right_pressed":false,
            "left_pressed":false,
            "up_pressed":false,
            "down_pressed":false,
            "width":30, 
            "height":30, 
            "angle":0,
            "dead":false,   
            "color":"red"}
        
        }

objects = {
    "mutes":[
        
    ],

    "nmutes":[
        {   
            "type":"wall",
            "position":{"x":100, "y":100, "width":30, "height":30},
            "lines":{
                "top":[{"x0":0, "y0":0, "x1":30, "y1":0}, {"x0":25, "y0":30, "x1":65, "y1":30}, {"x0":60, "y0":0, "x1":90, "y1":0}],
                "right":[{"x0":30, "y0":0, "x1":30, "y1":35}, {"x0":90, "y0":0, "x1":90, "y1":90}],
                "bottom":[{"x0":90, "y0":90, "x1":0, "y1":90}],
                "left":[{"x0":60, "y0":65, "x1":60, "y1":-5}, {"x0":0, "y0":90, "x1":0, "y1":0}]
            },
            "drawPath":[{"x":30, "y":0}, {"x":30, "y":30}, {"x":60, "y":30},
            {"x":60, "y":0}, {"x":90, "y":0}, {"x":90, "y":90},
            {"x":0, "y":90}, {"x":0, "y":0}
                ],
            "color":"grey"
        },
        {   
            "type":"wall",
            "position":{"x":700, "y":200, "width":30, "height":30},
            "lines":{
                "top":[{"x0":0, "y0":0, "x1":30, "y1":0}, {"x0":25, "y0":30, "x1":65, "y1":30}, {"x0":60, "y0":0, "x1":90, "y1":0}],
                "right":[{"x0":30, "y0":0, "x1":30, "y1":35}, {"x0":90, "y0":0, "x1":90, "y1":90}],
                "bottom":[{"x0":90, "y0":90, "x1":0, "y1":90}],
                "left":[{"x0":60, "y0":65, "x1":60, "y1":-5}, {"x0":0, "y0":90, "x1":0, "y1":0}]
            },
            "drawPath":[{"x":30, "y":0}, {"x":30, "y":30}, {"x":60, "y":30},
            {"x":60, "y":0}, {"x":90, "y":0}, {"x":90, "y":90},
            {"x":0, "y":90}, {"x":0, "y":0}
                ],
            "color":"grey"
        },
        {   
            "type":"wall",
            "position":{"x":500, "y":100    , "width":30, "height":30},
            "lines":{
                "top":[{"x0":0, "y0":0, "x1":30, "y1":0}, {"x0":25, "y0":30, "x1":65, "y1":30}, {"x0":60, "y0":0, "x1":90, "y1":0}],
                "right":[{"x0":30, "y0":0, "x1":30, "y1":35}, {"x0":90, "y0":0, "x1":90, "y1":90}],
                "bottom":[{"x0":90, "y0":90, "x1":0, "y1":90}],
                "left":[{"x0":60, "y0":65, "x1":60, "y1":0}, {"x0":0, "y0":90, "x1":0, "y1":0}]
            },
            "drawPath":[{"x":30, "y":0}, {"x":30, "y":30}, {"x":60, "y":30},
            {"x":60, "y":0}, {"x":90, "y":0}, {"x":90, "y":90},
            {"x":0, "y":90}, {"x":0, "y":0}
                ],
            "color":"grey"
        }

    ]

}

function init(){
    canvas = document.getElementById('game-canvas');
    canvas.width = 1000
    canvas.height = 600
    ctx = canvas.getContext('2d');
    

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
        }
        else if (e.key == "a") {
            players[you]["left_pressed"] = false
        }
        else if (e.key == "s") {
            players[you]["down_pressed"] = false
        }
        else if (e.key == "w") {
            players[you]["up_pressed"] = false
        }

    }

    socket.on("game_update", data => {
        players[opp] = data
    })

}

function draw_player(object){
    ctx.fillStyle = object["color"]

    if (object["angle"] == 0){
        ctx.fillRect(object["x"], object["y"], object["width"], object["height"])
    }
    else{
        ctx.save()
        ctx.translate(object["x"] + object["width"], object["y"] + object["height"])
        ctx.rotate(object["angle"] * Math.PI / 180)
        ctx.fillRect(object["width"] / -2, object["height"] / -2, object["width"], object["height"])
        ctx.restore()
    }
}

function player_movement(player){
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


function draw_objects(){
    for(i = 0; i < objects["nmutes"].length; i++){
        object = objects["nmutes"][i]
        ctx.fillStyle = object["color"]
        ctx.beginPath()
        ctx.moveTo(object["position"]["x"], object["position"]["y"])
        for (draw_it = 0; draw_it < object["drawPath"].length; draw_it++){
            ctx.lineTo(object["position"]["x"] + object["drawPath"][draw_it]["x"], object["position"]["y"] + object["drawPath"][draw_it]["y"])
        }
        ctx.fill()
    }
}


function physics(){
    for ([key, value] of Object.entries(players)){
        x = players[key]["x"] + 27
        y = players[key]["y"] + 27
        for (i of objects["nmutes"]){
            for (line of i["lines"]["top"]){ 
                if (x <= line["x1"] + i["position"]["x"] && x >= line["x0"] + i["position"]["x"] && line["y0"] + i["position"]["y"] <= y && y <= line["y0"] + i["position"]["y"] + 5){
                    players[key]["y"] = (line["y0"] + i["position"]["y"]) - 28
                }
            }
            for (line of i["lines"]["right"]){ 
                if (y >= line["y0"] + i["position"]["y"] && y <= line["y1"] + i["position"]["y"] && line["x0"] + i["position"]["x"] >= x && x >= line["x0"] + i["position"]["x"] - 5){
                    players[key]["x"] = (line["x0"] + i["position"]["x"]) - 26
                }
            }
            for (line of i["lines"]["bottom"]){
                if (x <= line["x0"] + i["position"]["x"] && x >= line["x1"] + i["position"]['x'] && line["y0"] + i["position"]["y"] >= y && y >= line["y0"] + i["position"]["y"] - 5){
                    players[key]["y"] = (line["y0"] + i["position"]["y"]) - 28
                }
            }

            for (line of i["lines"]["left"]){
                if (y <= line["y0"] + i["position"]["y"] && y >= line["y1"] + i["position"]['y'] && line["x0"] + i["position"]["x"] <= x && x <= line["x0"] + i["position"]["x"] + 5){
                    players[key]["x"] = (line["x0"] + i["position"]["x"]) - 28
                }
            }

        }

    }

}

function gameLoop(timeStamp) {
    deltaTime = (timeStamp - oldTimeStamp) / 1000;
    if (!deltaTime) deltaTime = 0;
    oldTimeStamp = timeStamp;
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // rotate block to mouse
    x_distance = mouseX - (players[you]["x"] + players[you]["width"])
    y_distance = mouseY - (players[you]["y"] + players[you]["height"])
    angle = Math.atan(y_distance/x_distance) * (180/Math.PI)
    players[you]["angle"] = angle

    // handle drawing player, and checking physics
    player_movement(players[you])
    player_movement(players[opp])
    physics()
    draw_objects()
    draw_player(players[you])
    draw_player(players[opp])

    window.requestAnimationFrame(gameLoop);
}

function gameUpdate(){
    socket.volatile.emit("game_update", {"id":game_id,"i_am":you,"gamestate":players[you], "my_id":my_id})
}

