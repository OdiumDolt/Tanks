import uuid
import threading
import time

class Server():
    def __init__(self, socketio) -> None:
        self.id = str(uuid.uuid4().hex)
        self.p1 = ""
        self.p2 = ""
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
                "movement_x":0,
                "movement_y":0,
                "facing":0,
                "ammo":10, 
                "reloading":False, 
                "dead":False, 
                "health":10, 
                },
            "p2":{
                "x":0,
                "y":0,
                "facing":0,
                "ammo":10, 
                "reloading":False, 
                "dead":False, 
                "health":10,
            },
            "other":{"bullets":{}}
        }
        # self.stop_thread = False
        # self.game_loop = threading.Thread(target=self.gameLoop, args=(socketio,))
        # self.game_loop.start()
    
    def gameLoop(self, socketio):
        while True:
            if self.stop_thread:
                break