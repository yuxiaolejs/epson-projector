const serial = require('./src/serial-protocol')
const http = require('./src/http-protocol')
const tcp = require('./src/tcp-protocol')

module.exports = {
    serial,
    http,
    tcp
}