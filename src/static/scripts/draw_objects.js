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


    for(i = 0; i < objects["mutes"][you].length; i++){
        object = objects["mutes"][you][i]
        ctx.fillStyle = object["color"]
        if (object["shape"] == "circle"){
            ctx.beginPath()
            ctx.arc(object["x"], object["y"], object["radius"], 0, 2 * Math.PI);
            ctx.fill()
        }
    }
    for(i = 0; i < objects["mutes"][opp].length; i++){
        object = objects["mutes"][opp][i]
        ctx.fillStyle = object["color"]
        if (object["shape"] == "circle"){
            ctx.beginPath()
            ctx.arc(object["x"], object["y"], object["radius"], 0, 2 * Math.PI);
            ctx.fill()
        }
    }
}