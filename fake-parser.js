const {keysModule} = require('./keys')
class FakeParser {
    cbks = []
    constructor() {
        setInterval(()=>{
            const keys = keysModule.getInstance().getKeys()
            const randomIndex = Math.floor(Math.random()*(keys.length-1))
            const key = keys[randomIndex]
            console.log(" randomIndex", randomIndex)
            console.log("PRESSED KEY", key.data)
            this.cbks.map(callback=>callback(key.data))
        }, 5000)
    }
    on = (event, callback) => {
        this.cbks.push(callback)
    }
}

module.exports = {FakeParser}