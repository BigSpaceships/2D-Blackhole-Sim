/** 
    * Represents a 2D vector
    * @typedef {Object} Vector
    * @property {Number} x
    * @property {Number} y
    */

/**
    * @param {Vector} pos1
    * @param {Vector} pos2
    * @returns {Number}
    */
function distance(pos1, pos2) {
    return Math.sqrt((pos1.x - pos2.x) ** 2 + (pos1.y - pos2.y) ** 2);
}

/** 
    * @param {Vector} pos
    * @returns {Vector}
    */
function transformCanvasToWorld(pos) {
    return {
        x: (pos.x - canvas.width / 2) / scale,
        y: (canvas.height / 2 - pos.y) / scale,
    }
}

/** 
    * @param {Vector} pos
    * @returns {Vector}
    */
function transformWorldToCanvas(pos) {
    return {
        x: pos.x * scale + canvas.width / 2,
        y: -pos.y * scale + canvas.height / 2,
    }
}
