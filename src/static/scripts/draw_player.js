function draw_player(object){
    ctx.fillStyle = object["color"]

    if (object["angle"] == 0){
        ctx.fillRect(object["x"], object["y"], object["width"], object["height"])
    }
    else{
        ctx.save()
        ctx.translate(object["x"] + object["width"], object["y"] + object["height"])
        ctx.rotate(object["angle"] * Math.PI/180)
        ctx.fillRect(object["width"]/-2, object["height"]/-2, object["width"], object["height"])
        ctx.restore()
        ctx.fillStyle = "green"
    }
}