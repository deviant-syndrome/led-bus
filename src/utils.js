/**
 * Slices a fixed-size moving window through the text string, cycling around it
 *
 * @param {number} start - window's left boundary (inclusive)
 * @param {number} end - window's right boundary (inclusive)
 * @param {string} text - text to window through
 */
export function offsetTextWrap(start, end, text) {
    if (end > text.length - 1) {
        return text.substr(start, text.length - start) + text.substr(0, end - text.length)
    } else {
        return text.substr(start, end)
    }
}

/**
 * Convert hexadecimal number to binary representation
 * Each hexadecimal ASCII code should be 15 bits (14 segs plus decimal point)
 *
 * @param {number} hex
 * @param {number} maxLength
 * @returns {string}
 */
export function hex2bin(hex, maxLength){
    return hex.toString(2).padStart(maxLength, "0")
}