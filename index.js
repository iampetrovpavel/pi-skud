const {keysModule} = require('./keys')
keysModule.getInstance().loadKeys()

require('./handle-exit')

if(process.env.NODE_ENV==='production') {
    require('./handle-exit-button')
    require('./handle-entry')
}
