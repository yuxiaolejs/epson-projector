const epsonSerial = require('./index').serial
const projector = new epsonSerial("COM3")
projector.power().then((power) => {
    console.log(power)
})