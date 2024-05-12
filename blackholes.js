/** 
    * Represents a blackhole
    * @typedef {Object} Blackhole
    * @property {Number} x
    * @property {Number} y
    * @property {Number} mass
    */

/** @type {Blackhole[]} */
export var blackholes;

export function setupBlackholes() {
    blackholes = [];
}

/**
    * @param {Number} x
    * @param {Number} y
    */
export function addBlackhole(x, y) {
    blackholes.push({
        x,
        y,
        mass: 10
    });
}

/** 
    * @param {CanvasRenderingContext2D} ctx
    */
export function drawBlackholes(ctx) {
    ctx.fillStyle = "black";

    for (let i = 0; i < blackholes.length; i++) {
        ctx.beginPath();

        ctx.ellipse(blackholes[i].x, blackholes[i].y, blackholes[i].mass, blackholes[i].mass, 0, 0, 2 * Math.PI);

        ctx.fill();
    }
}
