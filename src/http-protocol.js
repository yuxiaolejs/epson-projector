const axios = require('axios');
const jsdom = require("jsdom");

const EventEmitter = require('events').EventEmitter;
const util = require('util');

const cmdPageMap = {
    LUMINANCE: "webconf.dll?page=3",
    HREVERSE: "webconf.dll?page=4",
    VREVERSE: "webconf.dll?page=4",

}

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

    constructor(host) {
        EventEmitter.call(this);
        this.service = axios.create({
            baseURL: `http://${host}`,
            headers: {
                referer: `http://${host}/`,
            }
        })
        this.ready = false
    }

    /**
     * Set the the power status
     * @param  {[String]} power  "ON" or "OFF" to set the power status
     * @return {Promise}         Promise that resolves to the power status
     * @example
     * proj.power("ON").then((power) => {
     * console.log(power) // "undefined"
     * })
     */
    power(power) {
        return this.#sendGeneralCommand("PWR", power)
    }

    /**
     * Set the the source
     * @param  {[String]} source  "00"~"FF"
     * @return {Promise}         Promise that resolves to the source
     * @example
     * proj.source("00").then((source) => {
     *  console.log(source) // "undefined"
     * })
     */
    source(source) {
        return this.#sendGeneralCommand("SOURCE",sourceerror)
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
     * Set the mute status
     * @param {[String]} mute  "ON" or "OFF" to set the mute status
     * @returns {Promise} Promise that resolves to the mute status
     * @example
     * proj.mute("ON").then((mute) => {
     * console.log(mute) // "undefined"
     * })
     */
    mute(mute) {
        return this.#sendGeneralCommand("MUTE", mute)
    }

    /**
     * Set the freeze status
     * @param {[String]} freeze  "ON" or "OFF" to set the freeze status
     * @returns {Promise} Promise that resolves to the freeze status
     * @example
     * proj.freeze("ON").then((freeze) => {
     * console.log(freeze) // "undefined"
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
                this.service.get(`/cgi-bin/webconf.dll?${command}=${arg}`).then((response) => {
                    if (response.status == 200) {
                        res()
                    }
                    else {
                        rej(response.data)
                    }
                }).catch((err) => {
                    rej(err)
                })
            } else {
                this.service.get(`/cgi-bin/${cmdPageMap[command]}`).then((response) => {
                    if (response.status == 200) {
                        let dom = new jsdom.JSDOM(response.data)
                        let radios = dom.window.document.getElementsByName(command)
                        for (let i = 0; i < radios.length; i++) {
                            if (radios[i].checked) {
                                res(radios[i].value)
                                break
                            }
                        }
                        res()
                    }
                    else {
                        rej(response.data)
                    }
                }).catch((err) => {
                    rej(err)
                })
            }
        })
    }
}
util.inherits(EpsonProjector, EventEmitter);
module.exports = EpsonProjector