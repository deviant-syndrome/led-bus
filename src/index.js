import { fourteenSegmentASCII, segments } from "./ASCIIHex14Seg"
import { hex2bin, offsetTextWrap } from "./utils";

const ASCII_OFFSET = 32
const NUM_SEGS = 14
const NUM_SEG_W_DP = NUM_SEGS + 1
const CODE_DP = "dp"

export class LEDEncoder {
    /** @type {number} */
    numDisplays
    /** @type {LEDEncoder~SegmentCommandHandler} */
    segmentCommandHandler
    /** @type {number} */
    offset = 0
    /** @type {LEDEncoder~EncoderOptions} */
    options
    /** @type {LEDEncoder~EncoderOptions} */
    defaultOptions = {
        decimalPointSupport: true
    }

    /** @type {LEDEncoder~SegmentCommandHandler} */
    dpSupportCheckingHandler = (dNum, seg, on) => {
        if (seg === CODE_DP && !this.options.decimalPointSupport) {
            return
        }
        this.segmentCommandHandler(dNum, seg, on)
    }

    /**
     * Creates a LEDEncoder instance
     *
     * @param {number} numDisplays
     * @param {LEDEncoder~SegmentCommandHandler} segmentCommandHandler
     * @param {LEDEncoder~EncoderOptions} [options]
     */
    constructor(numDisplays, segmentCommandHandler, options) {
        this.numDisplays = numDisplays
        this.segmentCommandHandler = segmentCommandHandler
        this.options = {
            ...this.defaultOptions,
            ...options
        }
    }

    /**
     * Encodes text fragment into sequence of segment LED commands
     * Text fragment size is determined by the number of LED displays
     * passed to the class
     *
     * @param {string} text - Text to encode
     */
    sendText(text) {
        for (let chNum = 0; chNum < text.substr(0, this.numDisplays).length; chNum++) {
            let count = 0
            let binaryString = hex2bin(fourteenSegmentASCII[text.charCodeAt(chNum) - ASCII_OFFSET], NUM_SEG_W_DP)
            Array.from(binaryString).forEach(b => {
                this.dpSupportCheckingHandler(chNum, segments[NUM_SEGS - count], b === '1')
                count++
            })
        }
    }

    /**
     * Encodes text fragment into sequence of segment LED commands, refreshed every
     *
     * @param {string} textString - Text to encode
     * @param {number} [scrollSpeed] - Scrolling speed in milliseconds, defaults to 1000
     */
    sendScrollingText(textString, scrollSpeed) {
        let timeout = scrollSpeed || 1000;
        setTimeout(() => {
            this.sendText(offsetTextWrap(this.offset, this.offset + this.numDisplays, textString));
            this.offset++
            if (this.offset === (textString.length + 1)) {
                this.offset = 0
            }
            this.sendScrollingText(textString, timeout)
        }, timeout)
    }

    /**
     * Handler for LED segment commands, inside this callback you can put
     * any type of LED display visualisation you prefer, like drawing an SVG,
     * canvas, or plain HTML
     *
     * @callback LEDEncoder~SegmentCommandHandler
     * @param {number} displayNumber - LED position number [0 to numDisplays - 1]
     * @param {string} segmentCode - segment code, according to standard LED pinout
     * @param {boolean} on - true, if segment should be lit
     */

    /**
     * Encoder options container
     *
     * @typedef LEDEncoder~EncoderOptions
     * @type {object}
     * @property {boolean} decimalPointSupport - enables decimal point LED segments support,
     * set to true, if you want to receive `dp` codes to your handlers, set false otherwise
     */
}
