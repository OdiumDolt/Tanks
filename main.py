from flask_socketio import SocketIO, join_room, leave_room, send, emit
from flask import *
import jwt
import logging
from server import Server

app = Flask(__name__)
key = "askdfj9iuxcv0-124lkahsdfahdf9783KLJKHASD09843klj++=+=++_"
socketio = SocketIO(app, async_mode='threading')
logging.getLogger('werkzeug').setLevel(logging.CRITICAL)

@app.route("/")
def main():
    return render_template("main.html")

@socketio.on("my_id")
def setId(id):
    join_room(id)

@socketio.on("create_game")
def createGame(p1_id):
    new_server = Server(socketio=socketio)
    new_server.p1 = p1_id
    join_room(new_server.id)
    emit("game_id", new_server.id, to=p1_id)
    


socketio.run(app, host="192.168.1.76", port=5000)
