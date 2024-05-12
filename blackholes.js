/** 
    * Represents a blackhole
    * @typedef {Object} Blackhole
    * @property {import("./util").Vector} pos
    * @property {Number} mass
    */

import { G, c, scale } from "./constants";
import { transformWorldToCanvas } from "./util";

/** @type {Blackhole[]} */
export var blackholes;

export function setupBlackholes() {
    blackholes = [];
}

/** 
    * @property {Blackhole} blackhole
    * @returns {Number} Schwarzchild radius of blackhole
    */
export function getRadius(blackhole) {
    return 2 * blackhole.mass * G / (c ** 2);
}

/**
    * @param {Vector} pos
    */
export function addBlackhole(pos) {
    blackholes.push({
        pos,
        mass: 1
    });
}

/** 
    * @param {Vector} pos
    * @returns {Number | undefined} black hole at the position uses radius
    */
export function getBlackhole(pos) {
    for (let i = 0; i < blackholes.length; i++) {
        const blackhole = blackholes[i];
        const holeRadius = getRadius(blackhole);

        if (((pos.x - blackhole.pos.x) ** 2 + (pos.y - blackhole.pos.y) ** 2) < (holeRadius ** 2)) {
            return i;
        }
    }

    return undefined;
}

/** 
    * moves blackhole by index to specified position
    * @param {Number} index
    * @param {Vector} pos
    */
export function moveBlackhole(index, pos) {
    blackholes[index].pos.x = pos.x;
    blackholes[index].pos.y = pos.y;
}

/** 
    * @param {CanvasRenderingContext2D} ctx
    */
export function drawBlackholes(ctx) {
    ctx.fillStyle = "black";

    for (let i = 0; i < blackholes.length; i++) {
        ctx.beginPath();

        const radius = getRadius(blackholes[i]);

        const canvasPos = transformWorldToCanvas(blackholes[i].pos);

        ctx.arc(canvasPos.x, canvasPos.y, radius * scale, 0, 2 * Math.PI);

        ctx.fill();
    }
}
