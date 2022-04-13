import json
from typing import Tuple
import os
import hashlib
import hmac
from itsdangerous import base64_decode, base64_encode

import jwt

# Add a new user
# MAKE SURE TO CHANGE THIS IF YOU WANT TO ADD NEW FEATURES TO THE USERS.JSON
def add_new_user(password: str, user):

    # Create salt
    salt = base64_encode(os.urandom(16))
    # hash with salt
    pw_hash = base64_encode(hashlib.pbkdf2_hmac('sha256', password.encode(), salt, 100000))

    # Add to users.json
    with open("users.json", "r") as read_file:
        users = json.load(read_file)
    users[user] = {
        "username":user,
        "password":pw_hash.decode(),
        "salt":salt.decode(),
        "friends":[],
        "pendingRequests":[]
    }
    with open("users.json", "w") as write_file:
        json.dump(users, write_file, indent=4)


# Verify that a tokens password is valid
def Verify(token, key):
    token_data = jwt.decode(token, key, algorithms="HS256")

    # Check if the passwords is correct
    def is_correct_password(salt: bytes, pw_hash: bytes, password: str):
        return hmac.compare_digest(
            pw_hash,
            base64_encode(hashlib.pbkdf2_hmac('sha256', password.encode(), salt, 100000))
        )

    with open("users.json", "r") as read_file:
        users = json.load(read_file)
    # make sure the user exists
    try:
        # if user exists, and the passwords are the same, return true
        if is_correct_password(users[token_data["username"]]["salt"].encode(), users[token_data["username"]]["password"].encode(), token_data["password"]) == True:
            return True
        else:
            return False
    except KeyError:
        return False


        
        