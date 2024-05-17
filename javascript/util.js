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
 * @param {Vector} vector
 * @returns {Vector}
 */
function normalized(vector) {
    const magnitude = Math.sqrt(vector.x ** 2 + vector.y ** 2);

    return {
        x: vector.x / magnitude,
        y: vector.y / magnitude,
    }
}

/**
 * @param {Vector} v1
 * @param {Vector} v2
 * @returns {Number}
 */
function dot(v1, v2) {
    return v1.x * v2.x + v1.y * v2.y;
}

/**
 * @param {Vector} v
 * @returns {Number}
 */
function length(v) {
    return Math.sqrt(v.x * v.x + v.y * v.y);
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
