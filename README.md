# Epson projector control
## Installation
```{bash}
npm i epson-projector
```
## Quick start
```{js}
const epsonSerial = require('epson-projector').serial
const projector = new epsonSerial("COM3")
// Get the power state
projector.power().then((power) => {
    console.log(power)
})
// Set the power state
projector.power("ON").then((power) => {
    console.log(power) // Should be undefined
})
projector.close() // Close serial connection
```
## Supported methods
| Method    | EPSON CMD | Type    | Argument    |
| --------- | --------- | ------- | ----------- |
| power     | PWR       | Get/Set | "ON", "OFF" |
| source    | SOURCE    | Get/Set | "00"~"FF"   |
| luminance | LUMINANCE | Get/Set | "00", "01"  |
| mute      | MUTE      | Get/Set | "ON", "OFF" |
| freeze    | FREEZE    | Get/Set | "ON", "OFF" |
| hreverse  | HREVERSE  | Get/Set | "ON", "OFF" |
| vreverse  | VREVERSE  | Get/Set | "ON", "OFF" |
| lamp      | LAMP      | Get     | N/A         |
| error     | ERR       | Get     | N/A         |
## Progress
- [x] Serial protocol
- [ ] Http protocol
- [ ] TCP protocol
