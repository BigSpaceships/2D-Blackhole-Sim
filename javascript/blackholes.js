/** 
    * Represents a blackhole
    * @typedef {Object} Blackhole
    * @property {import("./util").Vector} pos
    * @property {Number} mass
    */

/** @type {Blackhole[]} */
var blackholes = [];

/** 
    * @property {Blackhole} blackhole
    * @returns {Number} Schwarzchild radius of blackhole
    */
function getRadius(blackhole) {
    return 2 * blackhole.mass * G / (c ** 2);
}

/**
 * @property {Number} mass
 * @returns {Number} Mass number of blackhole (x10^27)
 */
function getMassDisplayNumber(mass) {
    return mass * 1.35; // 1/(G/c^2)
}

/**
 * @property {Number} mass
 * @returns {Number} mass for simulation
 */
function getMassFromDisplay(mass) {
    return mass / 1.35;
}

/**
 * @param {Vector} pos
 * @returns {Number} index of added blackhole
 */
function addBlackhole(pos) {
    blackholes.push({
        pos,
        mass: 1,
    });

    return blackholes.length - 1;
}

/**
 * @param {Number} index
 */
function removeBlackhole(index) {
    blackholes.splice(index, 1);
}

/** 
    * @param {Vector} pos
    * @returns {Number | undefined} black hole at the position uses radius
    */
function getBlackhole(pos) {
    for (let i = 0; i < blackholes.length; i++) {
        const blackhole = blackholes[i];
        const holeRadius = getRadius(blackhole);

        if (distance(pos, blackhole.pos) <= holeRadius) {
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
function moveBlackhole(index, pos) {
    blackholes[index].pos.x = pos.x;
    blackholes[index].pos.y = pos.y;
}

var output = []

/**
 * @param {Blackhole} blackhole
 * @param {Vector} pos
 * @returns {Vector}
 */
function calculateSingleAcceleration(blackhole, pos, velocity) {
    // sorry this is such a rats nest i don't even know how to explain it right now
    // if i can ever get it working i'll expain or we can talk in math
    // also it isn't working at all with multiple black holes for whatever reason

    const dist = distance(pos, blackhole.pos);

    const u = 1 / dist;

    const relativePos = {
        x: pos.x - blackhole.pos.x,
        y: pos.y - blackhole.pos.y
    }
    
    const direction = normalized(relativePos)
    let phi = Math.atan2(direction.y,direction.x);
    let newPhi = Math.atan2(pos.y + velocity.y * posStep - blackhole.pos.y, pos.x + velocity.x * posStep - blackhole.pos.x);

    phi = (Math.PI * 2 + phi) % (2 * Math.PI);
    newPhi = (Math.PI * 2 + newPhi) % (2 * Math.PI);

    const delPhi = Math.min(Math.abs(phi - newPhi), Math.abs(phi - newPhi + 2 * Math.PI), Math.abs(phi - newPhi - 2 * Math.PI));
    
    const radialVelocityLength = dot({
        x: velocity.x * posStep,
        y: velocity.y * posStep
    }, direction);

    const radialVelocity = {
        x: radialVelocityLength * direction.x,
        y: radialVelocityLength * direction.y,
    }
    
    const tangentialDirection = {
        x: -direction.y,
        y: direction.x,
    }

    const tangentialVelocityLength = dot({
        x: velocity.x * posStep,
        y: velocity.y * posStep,
    }, tangentialDirection)

    let acceleration = 3 * G * blackhole.mass / (c ** 2) * (u ** 2) - u;

    // TODO: this dies if its moving directly away from a blackhole
    const du = -(dist ** -2) * radialVelocityLength / delPhi;

    let newdu = du + acceleration * delPhi;

    let targetRadialVelocityLength = -newdu * delPhi / (dist ** -2);
    
    const targetRadialVelocity = {
        x: Math.cos(newPhi) * targetRadialVelocityLength,
        y: Math.sin(newPhi) * targetRadialVelocityLength,
    }

    const targetVelocityTangential = {
        x: -Math.sin(newPhi) * tangentialVelocityLength,
        y: Math.cos(newPhi) * tangentialVelocityLength,
    }

    const targetVelocity = {
        x: (targetVelocityTangential.x + targetRadialVelocity.x) / posStep,
        y: (targetVelocityTangential.y + targetRadialVelocity.y) / posStep,
    }

    const accelerationVector = {
        x: (targetVelocity.x - velocity.x),
        y: (targetVelocity.y - velocity.y),
    }

    return accelerationVector;
}

/**
 * @param {Vector} pos
 * @returns {Vector}
 */
function calculateAcceleration(pos, velocity) {
    let acceleration = {
        x: 0,
        y: 0,
    }
    
    for (let i = 0; i < blackholes.length; i++) {
        const accelerationReturned = calculateSingleAcceleration(blackholes[i], pos, velocity);

        acceleration.x += accelerationReturned.x;
        acceleration.y += accelerationReturned.y;
    }

    // targetVelocity.x /= blackholes.length;
    // targetVelocity.y /= blackholes.length;

    return acceleration;
}

function inBlackholes(point) {
    for (let i = 0; i < blackholes.length; i++) {
        const radius = getRadius(blackholes[i]);

        if (distance(blackholes[i].pos, point) <= radius) {
            return true;
        }
    }

    return false;
}

/** 
    * @param {CanvasRenderingContext2D} ctx
    */
function drawBlackholes(ctx) {
    ctx.fillStyle = "black";

    for (let i = 0; i < blackholes.length; i++) {
        ctx.beginPath();

        const radius = getRadius(blackholes[i]);

        const canvasPos = transformWorldToCanvas(blackholes[i].pos);

        ctx.arc(canvasPos.x, canvasPos.y, radius * scale, 0, 2 * Math.PI);

        ctx.fill();
    }
}
