const fs = require('fs')
const axios = require('axios')
const {server} = require('./constants')

const keysModule = (function (){
    let instance, keys = []
    const getKeys = function () {
        return keys
    }
    const loadKeys = function (){
        console.log("Try load keys...");
        axios.get(server+'/keys?limit=999999')
            .then(res=>{
                keys = res.data.data;
                fs.writeFile('./keys.json', JSON.stringify(keys), err=>{if(err)console.log('Error write keys to file!')})
                console.log("Keys Loaded: ", keys.length);
            })
            .catch(err=>{
                console.log("Server error! Can`t load keys:(", err.message);
                fs.readFile('./keys.json', 'utf8', (err, data)=>{
                    if(err){
                        console.log('Can not read keys from file! ', err.message);
                        return;
                    }
                    keys = JSON.parse(data);
                    console.log('Successfull loaded keys from file! ', keys.length)
                })
            })
    }
    var createInstance = function () {
        return {
            getKeys,
            loadKeys
        }
    }
    return {
        getInstance: function () {
            return instance || (instance = createInstance());
        }
    }
})()

module.exports = {keysModule}