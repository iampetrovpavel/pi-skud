const api = require("./api")
const open = require("./open")
const findKey = require('./find-key')
const SerialPort = require('serialport')

const portEntry= new SerialPort('/dev/ttyACM0', {
    baudRate: 9600
})

portEntry.on('error', function(err) {
    console.log('Port Entry Error: ', err.message)
})

const Readline = SerialPort.parsers.Readline
const parserEntry = portEntry.pipe(new Readline({ delimiter: '\r' }));

parserEntry.on('data', (data)=>{
    console.log("ENTRY KEY: ", data, "Date: ", Date(Date.now()).toString());
    let key = findKey(data)
    if(!key){
        api('post', '/access', {action: 1, key: {data}, time: new Date().toISOString()})
        return
    }
    open()
    api('post', '/access', {action: 1, key: {key_id: key._id, owner: key.owner, data: key.data}, time: new Date().toISOString()})
})