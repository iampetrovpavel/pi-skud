const {keysModule} = require('./keys')

function findKey(data){
    const keys = keysModule.getInstance().getKeys()
    const index = keys.map(i=>i.data).indexOf(data);
    if (index>=0){
        console.log("Key Found relay ON");
        return keys[index]
    }else {
        return null
    }
}

module.exports = findKey