const epsonSerial = require('./index').http
const projector = new epsonSerial("10.0.1.102")
projector.luminance().then((power) => {
    console.log(power)
}).catch((err) => {
    console.log(err)
})
