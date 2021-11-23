const api = require("./api")
const open = require("./open")
const findKey = require('./find-key')
const SerialPort = require('serialport')
// const {FakeParser} = require('./fake-parser')

const portExit = new SerialPort('/dev/ttyACM1', {
    baudRate: 9600
})

portExit.on('error', function(err) {
    console.log('Port Exit Error: ', err.message)
})

const Readline = SerialPort.parsers.Readline;
const parserExit = portExit.pipe(new Readline({ delimiter: '\r' }));
// const parserExit = new FakeParser()

parserExit.on('data', (data)=>{
    console.log("EXIT KEY: ", data, "Date: ", Date(Date.now()).toString());
    let key = findKey(data)
    if(!key)return
    open()
    api('post', '/access', {action: 0, key: {key_id: key._id, owner: key.owner, data: key.data}, time: new Date().toISOString()})
})

