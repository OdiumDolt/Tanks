
class gameServer {
    constructor(socket){
        this.socket = socket
        this.p1 = null
        this.p2 = null
        this.gamestate = require('./gamestate.json')
        this.id = ""
    }

}

module.exports = {
    gameServer
}