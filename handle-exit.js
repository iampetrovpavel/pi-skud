const api = require("./api")
const open = require("./open")
const findKey = require('./find-key')
const SerialPort = require('serialport')
const colors = require('colors');

let parserExit

if(process.env.NODE_ENV==='production'){
    const portExit = new SerialPort('/dev/ttyACM1', {
        baudRate: 9600
    })
    portExit.on('error', function(err) {
        console.log('Port Exit Error: ', err.message)
    })
    const Readline = SerialPort.parsers.Readline;
    parserExit = portExit.pipe(new Readline({ delimiter: '\r' }));
}else {
    const {FakeParser} = require('./fake-parser')
    parserExit = new FakeParser()
}


parserExit.on('data', (data)=>{
    console.log("EXIT KEY: ", data, "Date: ", Date(Date.now()).toString());
    let key = findKey(data)
    if(!key){
        console.log(`Key ${data} not found...`.red)
        api('post', '/access', {action: 0, key: {data}, time: new Date().toISOString()})
        return
    }
    console.log(`Key ${data} found. Owner is ${key.owner}.`.green)
    open()
    api('post', '/access', {action: 0, key: {key_id: key._id, owner: key.owner, data: key.data}, time: new Date().toISOString()})
})

