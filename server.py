import uuid
import threading
import time

class Server():
    def __init__(self, socketio) -> None:
        self.id = str(uuid.uuid4().hex)
        self.p1 = None
        self.p2 = None
        self.stats = {
            "speed":10,
            "bullet_speed":50,
            "bullet_damage":1,
            "player_size":1000
        }
        self.gamestate = {
            "p1":{
                "x":0,
                "y":0,
                "right_pressed":False,
                "left_pressed":False,
                "up_pressed":False,
                "down_pressed":False,
                "angle":0,
                "ammo":10, 
                "dead":False,
                },
            "p2":{
                "x":1000 - 50,
                "y":600 - 50,
                "right_pressed":False,
                "left_pressed":False,
                "up_pressed":False,
                "down_pressed":False,
                "angle":0,
                "dead":False, 
            },
            "other":{"bullets":{}}
        }
        # IM SO SORRY
        time.sleep(0.25)
        self.stop_thread = False
        self.game_loop = threading.Thread(target=self.gameLoop, args=(socketio,))
        self.game_loop.start()
    
    def gameLoop(self, socketio):
        while True:
            socketio.emit("game_update", self.gamestate, to=self.id)
            time.sleep(0.016)
            if self.stop_thread:
                break