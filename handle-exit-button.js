const Gpio = require('onoff').Gpio;
const open = require('./open')

const button = new Gpio(17, 'in', 'rising', {debounceTimeout: 100});

button.watch((err, value) => {
    if (err)throw err
    console.log("Button Pressed relay On Value: ", value);
    open()
});