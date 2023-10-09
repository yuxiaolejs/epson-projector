const epsonSerial = require('./index').tcp
const projector = new epsonSerial("10.0.1.102")
setTimeout(() => {
    projector.luminance().then((power) => {
        console.log(power)
    }).catch((err) => {
        console.log(err)
    })
}, 1000)