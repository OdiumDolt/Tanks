function physics(){
    x_move = players[you]["velocity"]["x"]
    y_move = players[you]["velocity"]["y"]
    for (j of objects["nmutes"]){
        for (line of j["lines"]["top"]){
            if ((players[you]["x"] + players[you]["width"]) + x_move <= line["x1"] + j["position"]["x"] && (players[you]["x"] + players[you]["width"]) + x_move >= line["x0"] + j["position"]["x"] && line["y0"] + j["position"]["y"] <= (players[you]["y"] + players[you]["height"]) + y_move && (players[you]["y"] + players[you]["height"]) + y_move <= line["y0"] + j["position"]["y"] + y_move){
                y_move = 0
            }
        }
        for (line of j["lines"]["right"]){ 
            if ((players[you]["y"] + players[you]["height"]) + y_move >= line["y0"] + j["position"]["y"] && (players[you]["y"] + players[you]["height"]) + y_move <= line["y1"] + j["position"]["y"] && line["x0"] + j["position"]["x"] >= (players[you]["x"] + players[you]["width"]) + x_move && (players[you]["x"] + players[you]["width"]) + x_move >= line["x0"] + j["position"]["x"] + x_move){
                x_move = 0
            }
        }
        for (line of j["lines"]["left"]){
            // check if the line in intersetcting
            if ((players[you]["y"] + players[you]["height"]) + y_move <= line["y0"] + j["position"]["y"] && (players[you]["y"] + players[you]["height"]) + y_move >= line["y1"] + j["position"]['y'] && line["x0"] + j["position"]["x"] <= (players[you]["x"] + players[you]["width"]) + x_move && (players[you]["x"] + players[you]["width"]) + x_move <= line["x0"] + j["position"]["x"] + x_move){
                x_move = 0
            }
        }
        for (line of j["lines"]["bottom"]){
            // check if the line in intersetcting
            if ((players[you]["x"] + players[you]["width"]) + x_move <= line["x0"] + j["position"]["x"] && (players[you]["x"] + players[you]["width"]) + x_move >= line["x1"] + j["position"]['x'] && line["y0"] + j["position"]["y"] >= (players[you]["y"] + players[you]["height"]) + y_move && (players[you]["y"] + players[you]["height"]) + y_move >= line["y0"] + j["position"]["y"] + y_move){
                y_move = 0
            }
        }

    }

    if (players[you]["x"] + players[you]["width"] + x_move > canvas.width || players[you]["x"] + players[you]["width"] + x_move < -5){
        
        x_move = 0
    }

    if(players[you]["y"] + players[you]["height"] + y_move > canvas.height || players[you]["y"] + players[you]["height"] + y_move < 0){
        y_move = 0
    }
    players[you]["x"] += x_move
    players[you]["y"] += y_move

    // for all mutibale objects
        for (i = 0; i < objects["mutes"][you].length; i++){
            object = objects["mutes"][you][i]
            if (object["type"] == "bullet"){
                bullet_physics(object)
        }
    }
}



function bullet_physics(object){
    x_move = object["velocity"]["x"] * deltaTime
    y_move = object["velocity"]["y"] * deltaTime
    for (j of objects["nmutes"]){
        for (line of j["lines"]["top"]){
            if (object["x"] + x_move <= line["x1"] + j["position"]["x"] && object["x"] + x_move >= line["x0"] + j["position"]["x"] && line["y0"] + j["position"]["y"] <= object["y"] + y_move && object["y"] + y_move <= line["y0"] + j["position"]["y"] + y_move){
                object["velocity"]["y"] *= -1
            }
        }
        for (line of j["lines"]["right"]){ 
            if (object["y"] + y_move >= line["y0"] + j["position"]["y"] && object["y"] + y_move <= line["y1"] + j["position"]["y"] && line["x0"] + j["position"]["x"] >= object["x"] + x_move && object["x"] + x_move >= line["x0"] + j["position"]["x"] + x_move){
                object["velocity"]["x"] *= -1
            }
        }
        for (line of j["lines"]["left"]){
            // check if the line in intersetcting
            if (object["y"] + y_move <= line["y0"] + j["position"]["y"] && object["y"] + y_move >= line["y1"] + j["position"]['y'] && line["x0"] + j["position"]["x"] <= object["x"] + x_move && object["x"] + x_move <= line["x0"] + j["position"]["x"] + x_move){
                object["velocity"]["x"] *= -1
            }
        }
        for (line of j["lines"]["bottom"]){
            // check if the line in intersetcting
            if (object["x"] + x_move <= line["x0"] + j["position"]["x"] && object["x"] + x_move >= line["x1"] + j["position"]['x'] && line["y0"] + j["position"]["y"] >= object["y"] + y_move && object["y"] + y_move >= line["y0"] + j["position"]["y"] + y_move){
                object["velocity"]["y"] *= -1
            }
        }

    }
    
        if (object["x"] <= players[opp]["x"] + (players[opp]["width"] * 2) && object["x"] >= players[opp]["x"] + (players[opp]["width"] /2) - 15 && players[opp]["y"] + (players[opp]["height"]/2) <= object["y"] && object["y"] <= players[opp]["y"] + players[opp]["height"]/2 + y_move){
            socket.emit("opp_dead", {"game_id":game_id, "im":you})
        }
        if (object["y"] >= players[opp]["y"] + (players[opp]["height"] /2) - 15 && object["y"] <= players[opp]["y"] + (players[opp]["height"] * 2) && players[opp]["x"] + (players[opp]["width"]/2) >= object["x"] && object["x"] >= players[opp]["x"] + players[opp]["width"]/2 + x_move){
            socket.emit("opp_dead", {"game_id":game_id, "im":you})
        }
        if (object["y"] >= players[opp]["y"] + (players[opp]["height"] /2) - 15 && object["y"] <= players[opp]["y"] + (players[opp]["height"] * 2) && players[opp]["x"] + (players[opp]["width"]/2) <= object["x"] && object["x"] <= players[opp]["x"] + players[opp]["width"]/2 + x_move){
            socket.emit("opp_dead", {"game_id":game_id, "im":you})
        }
        if (object["x"] <= players[opp]["x"] + (players[opp]["width"] * 2) && object["x"] >= players[opp]["x"] + (players[opp]["width"] /2) - 15 && players[opp]["y"] + (players[opp]["height"]/2) >= object["y"] && object["y"] >= players[opp]["y"] + players[opp]["height"]/2 + y_move){
            socket.emit("opp_dead", {"game_id":game_id, "im":you})
        }




    if (object["x"] + x_move > canvas.width || object["x"] + x_move < -5){
        object["velocity"]["x"] *= -1
        if (object["x"] < 0){
            object["x"] = 1
        }
    }
    if(object["y"] + y_move > canvas.height || object["y"] + y_move < -5){
        object["velocity"]["y"] *= -1
        if (object["y"] < 0){
            object["y"] = 1
        }
    }
    

    if (object["timer"] >= object["time"]){
        objects["mutes"][you].splice(i, 1)
    }

    object["timer"] += deltaTime

    object["x"] += x_move
    object["y"] += y_move
    }
