var Gpio = require('onoff').Gpio;

var relay = new Gpio(4, 'out');

module.exports = function open(){
    console.log("RELAY ON OFF")
    relay.writeSync(1);
    setTimeout(()=>{relay.writeSync(0); console.log("relay Off")}, 5000);
}
