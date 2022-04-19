from distutils.log import set_verbosity
from flask_socketio import SocketIO, join_room, leave_room, send, emit
from flask import *
import jwt
import logging
from server import Server

app = Flask(__name__)
key = "askdfj9iuxcv0-124lkahsdfahdf9783KLJKHASD09843klj++=+=++_"
socketio = SocketIO(app, async_mode='threading')
logging.getLogger('werkzeug').setLevel(logging.CRITICAL)

servers = {}
@app.route("/")
def main():
    return render_template("main.html")

@socketio.on("my_id")
def setId(id):
    join_room(id)

@socketio.on("create_game")
def createGame(p1_id):
    while True:
        new_server = Server(socketio=socketio)
        try:
            if new_server.id == servers[new_server.id][new_server.id]:
                del new_server
            else:
                del new_server
        except KeyError:
            break
    new_server.p1 = p1_id
    servers[new_server.id] = new_server
    print(servers[new_server.id].id)
    join_room(new_server.id)
    emit("game_id", {"id":new_server.id, "you":"p1", "opp":"p2"}, to=p1_id)

@socketio.on("join_game")
def joinGame(data):
    id = data["server_id"]
    p2_id = data["id"]
    try:
        if servers[id].p2 == None:
            servers[id].p2 = p2_id
            join_room(servers[id].id)
            emit("game_id", {"id":id, "you":"p2", "opp":"p1"}, to=p2_id)
        else:
            pass
    except KeyError:
        pass

@socketio.on("game_update")
def gameUpdate(data):
    print("got update")
    id = data["id"]
    user = data["i_am"]
    gamestate = data["gamestate"]
    try:
        servers[id].gamestate[user] = gamestate
    except:
        pass

    


socketio.run(app, host="0.0.0.0", port=5000)
