import { canvas } from "./main"
import { scale } from "./constants"
/** 
    * Represents a 2D vector
    * @typedef {Object} Vector
    * @property {Number} x
    * @property {Number} y
    */

/** 
    * @param {Vector} pos
    * @returns {Vector}
    */
export function transformCanvasToWorld(pos) {
    return {
        x: (pos.x - canvas.width / 2) / scale,
        y: (canvas.height / 2 - pos.y) / scale,
    }
}

/** 
    * @param {Vector} pos
    * @returns {Vector}
    */
export function transformWorldToCanvas(pos) {
    return {
        x: pos.x * scale + canvas.width / 2,
        y: -pos.y * scale + canvas.height / 2,
    }
}
