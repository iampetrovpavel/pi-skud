const Gpio = require('onoff').Gpio;
var colors = require('colors');

let relay

if(process.env.NODE_ENV === 'production'){
    relay = new Gpio(4, 'out');
} else {
  relay = {
      writeSync: (arg)=>{console.log("Imitate relay")}
  }
}

module.exports = function open(){
    console.log("RELAY ON".underline.green)
    relay.writeSync(1);
    setTimeout(()=>{relay.writeSync(0); console.log("RELAY OFF".underline.red)}, 5000);
}
