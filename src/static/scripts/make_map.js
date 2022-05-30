let olddTimeStamp;
left_click = false
rounding_val = 30
function round(num, precision) {
	num = parseFloat(num);
	if (!precision) return num;
	return (Math.round(num / precision) * precision);
}


function init_map(){
    canvas = document.getElementById('game-canvas');
    canvas.width = 1000
    canvas.height = 600
    ctx = canvas.getContext('2d');

    document.addEventListener("keydown", keyDownHandler, false)
    document.addEventListener("mouseup", leftClickUp, false)
    document.addEventListener("mousemove", getMousePos, false);
    

    function keyDownHandler(e){
        if (e.key == "t") {
            line_type = "top"
        }
        else if (e.key == "r") {
            line_type = "right"
        }
        else if (e.key == "l") {
            line_type = "left"
        }
        else if (e.key == "b") {
            line_type = "bottom"
        }
        else if (e.key == "s") {
            if (object["drawPath"].length > 0){
                objects.push(object)
            }
            last_line = {"x":0, "y":0}
            object = {
            "type":"wall",
            "position":{"x":round(mouseX, 30), "y":round(mouseY, (30))},
            "lines":{
                "top":[],
                "left":[],
                "right":[],
                "bottom":[]
            },
            "drawPath":[],
            "color":"grey"
            }
        }
    }
    function leftClickUp(){
        if (line_type == "top" || line_type == "bottom"){
            object["lines"][line_type].push({"x0":last_line["x"], "y0":last_line["y"], "x1":round(mouseX - object["position"]["x"], rounding_val), "y1":last_line["y"]})
            object["drawPath"].push({"x":round(mouseX - object["position"]["x"], rounding_val), "y":last_line["y"]})
            last_line = {"x":round(mouseX - object["position"]["x"], rounding_val), "y":last_line["y"]}
        }
        else if (line_type == "left" || line_type == "right"){
            object["lines"][line_type].push({"x0":last_line["x"], "y0":last_line["y"], "x1":last_line["x"], "y1":round(mouseY - object["position"]["y"], rounding_val)})
            object["drawPath"].push({"x":last_line["x"], "y":round(mouseY - object["position"]["y"], rounding_val)})
            last_line = {"x":last_line["x"], "y":round(mouseY - object["position"]["y"], rounding_val)}
        }
    }

    function getMousePos(evt) {
        var rect = canvas.getBoundingClientRect();
          mouseX = evt.clientX - rect.left
          mouseY = evt.clientY - rect.top
    }
    
    last_line = {"x":0, "y":0}
    objects = [
        {
            "type": "wall",
            "position": {
                "x": 60,
                "y": 150
            },
            "lines": {
                "top": [
                    {
                        "x0": 0,
                        "y0": 0,
                        "x1": 120,
                        "y1": 0
                    },
                    {
                        "x0": 120,
                        "y0": -90,
                        "x1": 150,
                        "y1": -90
                    }
                ],
                "left": [
                    {
                        "x0": 120,
                        "y0": 0,
                        "x1": 120,
                        "y1": -90
                    },
                    {
                        "x0": 0,
                        "y0": 30,
                        "x1": 0,
                        "y1": 0
                    }
                ],
                "right": [
                    {
                        "x0": 150,
                        "y0": -90,
                        "x1": 150,
                        "y1": 30
                    }
                ],
                "bottom": [
                    {
                        "x0": 150,
                        "y0": 30,
                        "x1": 0,
                        "y1": 30
                    }
                ]
            },
            "drawPath": [
                {
                    "x": 120,
                    "y": 0
                },
                {
                    "x": 120,
                    "y": -90
                },
                {
                    "x": 150,
                    "y": -90
                },
                {
                    "x": 150,
                    "y": 30
                },
                {
                    "x": 0,
                    "y": 30
                },
                {
                    "x": 0,
                    "y": 0
                }
            ],
            "color": "grey"
        },
        {
            "type": "wall",
            "position": {
                "x": 60,
                "y": 390
            },
            "lines": {
                "top": [
                    {
                        "x0": 0,
                        "y0": 0,
                        "x1": 150,
                        "y1": 0
                    }
                ],
                "left": [
                    {
                        "x0": 120,
                        "y0": 120,
                        "x1": 120,
                        "y1": 30
                    },
                    {
                        "x0": 0,
                        "y0": 30,
                        "x1": 0,
                        "y1": 0
                    }
                ],
                "right": [
                    {
                        "x0": 150,
                        "y0": 0,
                        "x1": 150,
                        "y1": 90
                    },
                    {
                        "x0": 150,
                        "y0": 90,
                        "x1": 150,
                        "y1": 120
                    },
                    {
                        "x0": 150,
                        "y0": 120,
                        "x1": 150,
                        "y1": 120
                    }
                ],
                "bottom": [
                    {
                        "x0": 150,
                        "y0": 120,
                        "x1": 120,
                        "y1": 120
                    },
                    {
                        "x0": 120,
                        "y0": 30,
                        "x1": 0,
                        "y1": 30
                    }
                ]
            },
            "drawPath": [
                {
                    "x": 150,
                    "y": 0
                },
                {
                    "x": 150,
                    "y": 90
                },
                {
                    "x": 150,
                    "y": 120
                },
                {
                    "x": 150,
                    "y": 120
                },
                {
                    "x": 120,
                    "y": 120
                },
                {
                    "x": 120,
                    "y": 30
                },
                {
                    "x": 0,
                    "y": 30
                },
                {
                    "x": 0,
                    "y": 0
                }
            ],
            "color": "grey"
        },
        {
            "type": "wall",
            "position": {
                "x": 300,
                "y": 360
            },
            "lines": {
                "top": [
                    {
                        "x0": 0,
                        "y0": 0,
                        "x1": 150,
                        "y1": 0
                    }
                ],
                "left": [
                    {
                        "x0": 120,
                        "y0": 120,
                        "x1": 120,
                        "y1": 30
                    }
                ],
                "right": [
                    {
                        "x0": 150,
                        "y0": 0,
                        "x1": 150,
                        "y1": 120
                    },
                    {
                        "x0": 0,
                        "y0": 30,
                        "x1": 0,
                        "y1": 0
                    }
                ],
                "bottom": [
                    {
                        "x0": 150,
                        "y0": 120,
                        "x1": 120,
                        "y1": 120
                    },
                    {
                        "x0": 120,
                        "y0": 30,
                        "x1": 0,
                        "y1": 30
                    }
                ]
            },
            "drawPath": [
                {
                    "x": 150,
                    "y": 0
                },
                {
                    "x": 150,
                    "y": 120
                },
                {
                    "x": 120,
                    "y": 120
                },
                {
                    "x": 120,
                    "y": 30
                },
                {
                    "x": 0,
                    "y": 30
                },
                {
                    "x": 0,
                    "y": 0
                }
            ],
            "color": "grey"
        },
        {
            "type": "wall",
            "position": {
                "x": 560,
                "y": 210
            },
            "lines": {
                "top": [
                    {
                        "x0": 0,
                        "y0": -120,
                        "x1": 30,
                        "y1": -120
                    },
                    {
                        "x0": 30,
                        "y0": -30,
                        "x1": 120,
                        "y1": -30
                    },
                    {
                        "x0": 120,
                        "y0": -30,
                        "x1": 150,
                        "y1": -30
                    }
                ],
                "left": [
                    {
                        "x0": 0,
                        "y0": 0,
                        "x1": 0,
                        "y1": -120
                    }
                ],
                "right": [
                    {
                        "x0": 30,
                        "y0": -120,
                        "x1": 30,
                        "y1": -30
                    },
                    {
                        "x0": 150,
                        "y0": -30,
                        "x1": 150,
                        "y1": 0
                    }
                ],
                "bottom": [
                    {
                        "x0": 150,
                        "y0": 0,
                        "x1": 0,
                        "y1": 0
                    }
                ]
            },
            "drawPath": [
                {
                    "x": 0,
                    "y": -120
                },
                {
                    "x": 30,
                    "y": -120
                },
                {
                    "x": 30,
                    "y": -30
                },
                {
                    "x": 120,
                    "y": -30
                },
                {
                    "x": 150,
                    "y": -30
                },
                {
                    "x": 150,
                    "y": 0
                },
                {
                    "x": 0,
                    "y": 0
                }
            ],
            "color": "grey"
        },
        {
            "type": "wall",
            "position": {
                "x": 560,
                "y": 360
            },
            "lines": {
                "top": [
                    {
                        "x0": 0,
                        "y0": 0,
                        "x1": 150,
                        "y1": 0
                    }
                ],
                "left": [
                    {
                        "x0": 0,
                        "y0": 120,
                        "x1": 0,
                        "y1": 0
                    }
                ],
                "right": [
                    {
                        "x0": 150,
                        "y0": 0,
                        "x1": 150,
                        "y1": 30
                    },
                    {
                        "x0": 30,
                        "y0": 30,
                        "x1": 30,
                        "y1": 90
                    },
                    {
                        "x0": 30,
                        "y0": 90,
                        "x1": 30,
                        "y1": 120
                    }
                ],
                "bottom": [
                    {
                        "x0": 150,
                        "y0": 30,
                        "x1": 30,
                        "y1": 30
                    },
                    {
                        "x0": 30,
                        "y0": 120,
                        "x1": 0,
                        "y1": 120
                    }
                ]
            },
            "drawPath": [
                {
                    "x": 150,
                    "y": 0
                },
                {
                    "x": 150,
                    "y": 30
                },
                {
                    "x": 30,
                    "y": 30
                },
                {
                    "x": 30,
                    "y": 90
                },
                {
                    "x": 30,
                    "y": 120
                },
                {
                    "x": 0,
                    "y": 120
                },
                {
                    "x": 0,
                    "y": 0
                }
            ],
            "color": "grey"
        },
        {
            "type": "wall",
            "position": {
                "x": 810,
                "y": 390
            },
            "lines": {
                "top": [
                    {
                        "x0": 0,
                        "y0": 0,
                        "x1": 90,
                        "y1": 0
                    },
                    {
                        "x0": 90,
                        "y0": 0,
                        "x1": 120,
                        "y1": 0
                    },
                    {
                        "x0": 120,
                        "y0": 0,
                        "x1": 150,
                        "y1": 0
                    }
                ],
                "left": [
                    {
                        "x0": 0,
                        "y0": 120,
                        "x1": 0,
                        "y1": 0
                    }
                ],
                "right": [
                    {
                        "x0": 150,
                        "y0": 0,
                        "x1": 150,
                        "y1": 30
                    },
                    {
                        "x0": 30,
                        "y0": 30,
                        "x1": 30,
                        "y1": 120
                    }
                ],
                "bottom": [
                    {
                        "x0": 150,
                        "y0": 30,
                        "x1": 30,
                        "y1": 30
                    },
                    {
                        "x0": 30,
                        "y0": 120,
                        "x1": 0,
                        "y1": 120
                    }
                ]
            },
            "drawPath": [
                {
                    "x": 90,
                    "y": 0
                },
                {
                    "x": 120,
                    "y": 0
                },
                {
                    "x": 150,
                    "y": 0
                },
                {
                    "x": 150,
                    "y": 30
                },
                {
                    "x": 30,
                    "y": 30
                },
                {
                    "x": 30,
                    "y": 120
                },
                {
                    "x": 0,
                    "y": 120
                },
                {
                    "x": 0,
                    "y": 0
                }
            ],
            "color": "grey"
        },
        {
            "type": "wall",
            "position": {
                "x": 480,
                "y": 270
            },
            "lines": {
                "top": [
                    {
                        "x0": 0,
                        "y0": 0,
                        "x1": 60,
                        "y1": 0
                    }
                ],
                "left": [
                    {
                        "x0": 0,
                        "y0": 30,
                        "x1": 0,
                        "y1": 0
                    }
                ],
                "right": [
                    {
                        "x0": 60,
                        "y0": 0,
                        "x1": 60,
                        "y1": 30
                    }
                ],
                "bottom": [
                    {
                        "x0": 60,
                        "y0": 30,
                        "x1": 0,
                        "y1": 30
                    }
                ]
            },
            "drawPath": [
                {
                    "x": 60,
                    "y": 0
                },
                {
                    "x": 60,
                    "y": 30
                },
                {
                    "x": 0,
                    "y": 30
                },
                {
                    "x": 0,
                    "y": 0
                }
            ],
            "color": "grey"
        },
    ]
    object = {
        "type":"wall",
        "position":{},
        "lines":{
            "top":[],
            "left":[],
            "right":[],
            "bottom":[]
        },
        "drawPath":[],
        "color":"grey"
        
    }


    window.requestAnimationFrame(frameLoop);
}

function draw_lines(){
    ctx.fillStyle = "white"
    ctx.beginPath();
    ctx.moveTo(object["position"]["x"], object["position"]["y"]);
    for(i = 0; i < object["drawPath"].length; i++){
        ctx.lineTo(object["position"]["x"] + object["drawPath"][i]["x"], object["position"]["y"] + object["drawPath"][i]["y"])
    }
    ctx.stroke()

    for(j = 0; j < objects.length; j++){
        ctx.beginPath();
        ctx.moveTo(objects[j]["position"]["x"], objects[j]["position"]["y"]);
        for(q = 0; q < objects[j]["drawPath"].length; q++){
            ctx.lineTo(objects[j]["position"]["x"] + objects[j]["drawPath"][q]["x"], objects[j]["position"]["y"] + objects[j]["drawPath"][q]["y"])
        }
        ctx.fill()
    }

}


function frameLoop(timeStampS){
    deltaTime = (timeStampS - olddTimeStamp) / 1000;
    if (!deltaTime) deltaTime = 0;
    olddTimeStamp = timeStampS;
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    draw_lines()
    ctx.fillStyle = "grey"
    window.requestAnimationFrame(frameLoop);
}