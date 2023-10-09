const SerialPort = require('serialport').SerialPort;
const EventEmitter = require('events').EventEmitter;
const util = require('util');

class EpsonProjector {
    /**
     * Create a new projector object
     * @param  {String} portName The name of the serial port to use
     * @example
     * const proj = require('epson-projector').serial
     * const a = new proj("COM3")
     * a.power("ON").then((power) => {
     * console.log(power) // "undefined"
     * })
     */

    constructor(portName) {
        EventEmitter.call(this);
        this.port = new SerialPort({
            path: portName,
            baudRate: 9600,
            stopBits: 1,
            dataBits: 8
        })
        this.ready = false
        this.port.on("open", (d) => {
            this.ready = true
        })
        this.port.on("data", (d) => {
            this.emit("data")
        })
    }

    /**
     * Open the connection to the projector
     * @return {Promise} Promise that resolves when the connection is open
     * @example
     * proj.open().then(() => {
     * console.log("Connection open")
     * })
     */

    open() {
        let that = this
        return new Promise((res, rej) => {
            that.port.open((err) => {
                if (err)
                    rej(err)
                else
                    res()
            })
        })
    }

    /**
     * Close the connection to the projector
     * @return {Promise} Promise that resolves when the connection is closed
     * @example
     * proj.close().then(() => {
     * console.log("Connection closed")
     * })
     */

    close() {
        let that = this
        return new Promise((res, rej) => {
            that.port.close((err) => {
                if (err)
                    rej(err)
                else
                    res()
            })
        })
    }

    /**
     * Get or set the the power status
     * @param  {[String]} power  "ON" or "OFF" to set the power status, or undefined to get the power status
     * @return {Promise}         Promise that resolves to the power status
     * @example
     * proj.power("ON").then((power) => {
     * console.log(power) // "undefined"
     * })
     * proj.power().then((power) => {
     * console.log(power) // "ON"
     * })
     */
    power(power) {
        return this.#sendGeneralCommand("PWR", power)
    }
    /**
     * Get error type
     * @return {Promise}         Promise that resolves error type
     */
    error() {
        return this.#sendGeneralCommand("ERR")
    }

    /**
     * Get or set the the source
     * @param  {[String]} source  "00"~"FF", or undefined to get the source
     * @return {Promise}         Promise that resolves to the source
     * @example
     * proj.source("00").then((source) => {
     *  console.log(source) // "undefined"
     * })
     * proj.source().then((source) => {
     * console.log(source) // "FF"
     * })
     */
    source(source) {
        return this.#sendGeneralCommand("SOURCE", error)
    }

    /**
     * Get the lamp hours
     * @return {Promise}         Promise that resolves to the lamp hours
     */
    lamp() {
        return this.#sendGeneralCommand("LAMP")
    }
    /**
     * Get or set the luminance
     * @param {[String]} luminance "00", "01", or undefined to get the luminance
     * @returns {Promise} Promise that resolves to the luminance
     * @example
     * proj.luminance("00").then((luminance) => {
     * console.log(luminance) // "undefined"
     * })
     * proj.luminance().then((luminance) => {
     * console.log(luminance) // "01"
     * })
     */
    luminance(luminance) {
        return this.#sendGeneralCommand("LUMINANCE", luminance)
    }
    /**
     * Get or set the mute status
     * @param {[String]} mute  "ON" or "OFF" to set the mute status, or undefined to get the mute status
     * @returns {Promise} Promise that resolves to the mute status
     * @example
     * proj.mute("ON").then((mute) => {
     * console.log(mute) // "undefined"
     * })
     * proj.mute().then((mute) => {
     * console.log(mute) // "ON"
     * })
     */
    mute(mute) {
        return this.#sendGeneralCommand("MUTE", mute)
    }

    /**
     * Get or set the freeze status
     * @param {[String]} freeze  "ON" or "OFF" to set the freeze status, or undefined to get the freeze status
     * @returns {Promise} Promise that resolves to the freeze status
     * @example
     * proj.freeze("ON").then((freeze) => {
     * console.log(freeze) // "undefined"
     * })
     * proj.freeze().then((freeze) => {
     * console.log(freeze) // "ON"
     * })
     */
    freeze(freeze) {
        return this.#sendGeneralCommand("FREEZE", freeze)
    }

    /**
     * Get or set the horizontal reverse status
     * @param {[String]} reverse  "ON" or "OFF" to set the horizontal reverse status, or undefined to get the horizontal reverse status
     * @returns {Promise} Promise that resolves to the horizontal reverse status
     * @example
     * proj.hreverse("ON").then((hreverse) => {
     * console.log(hreverse) // "undefined"
     * })
     * proj.hreverse().then((hreverse) => {
     * console.log(hreverse) // "ON"
     * })
     */
    hreverse(reverse) {
        return this.#sendGeneralCommand("HREVERSE", reverse)
    }

    /**
     * Get or set the vertical reverse status
     * @param {[String]} reverse  "ON" or "OFF" to set the vertical reverse status, or undefined to get the vertical reverse status
     * @returns {Promise} Promise that resolves to the vertical reverse status
     * @example
     * proj.vreverse("ON").then((vreverse) => {
     * console.log(vreverse) // "undefined"
     * })
     * proj.vreverse().then((vreverse) => {
     * console.log(vreverse) // "ON"
     * })
     */
    vreverse(reverse) {
        return this.#sendGeneralCommand("VREVERSE", reverse)
    }


    #sendGeneralCommand(command, arg) {
        return new Promise((res, rej) => {
            if (arg) {
                this.port.write(`${command} ${arg}\r`)
                this.port.once("data", (d) => {
                    if (d.indexOf(":") != 0) {
                        rej("Error: " + d)
                        return
                    }
                    res()
                })
            } else {
                this.port.once("data", (d) => {
                    d = d.toString()
                    if (d.indexOf("=") < 0) {
                        rej("Error: " + d)
                        return
                    }
                    res(d.split("=")[1])
                })
                this.port.write(`${command}?\r`)
            }
        })
    }
}
util.inherits(EpsonProjector, EventEmitter);
module.exports = EpsonProjector