# Epson projector control
## Installation
```{bash}
npm i epson-projector-ctrl
```
## Using Serial Protocol
### Quick start - Serial Protocol
```{js}
const epsonSerial = require('epson-projector-ctrl').serial
const projector = new epsonSerial("COM3") // The COM port connected to projector
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
### Supported methods - Serial Protocol
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
## Using HTTP Protocol
### Quick start - HTTP Protocol
```{js}
const epsonSerial = require('epson-projector-ctrl').http
const projector = new epsonSerial("10.0.1.101") // The IP address of the projector
// Set the power state
projector.power("ON").then((power) => {
    console.log(power) // Should be undefined
})
```
### Supported methods - HTTP Protocol
| Method    | EPSON CMD | Type    | Argument    |
| --------- | --------- | ------- | ----------- |
| power     | PWR       | Set     | "ON", "OFF" |
| source    | SOURCE    | Set     | "00"~"FF"   |
| luminance | LUMINANCE | Get/Set | "00", "01"  |
| mute      | MUTE      | Set     | "ON", "OFF" |
| freeze    | FREEZE    | Set     | "ON", "OFF" |
| hreverse  | HREVERSE  | Get/Set | "ON", "OFF" |
| vreverse  | VREVERSE  | Get/Set | "ON", "OFF" |
## Using TCP Protocol
### Quick start - TCP Protocol
```{js}
const epsonSerial = require('epson-projector-ctrl').tcp
const projector = new epsonSerial("10.0.1.101") // The COM port connected to projector
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
### Supported methods - TCP Protocol
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
- [x] HTTP protocol
- [ ] TCP protocol
