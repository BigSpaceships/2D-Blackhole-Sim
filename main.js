import './style.css'
/** 
    * Represents a blackhole
    * @typedef {Object} Blackhole
    * @property {Number} x
    * @property {Number} y
    * @property {Number} mass
    */

/** @type {HTMLCanvasElement} */
var canvas
/** @type {CanvasRenderingContext2D} */
var ctx; // screams in js i hate this

/** @type {Blackhole[]}
    * all blackholes in the scene 
    */
let blackholes = [];

window.addEventListener("load", () => {
    canvas = document.createElement("canvas");

    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    document.getElementById("app").appendChild(canvas);

    ctx = canvas.getContext("2d");

    canvas.addEventListener("click", (e) => {
        blackholes.push({
            x: e.offsetX,
            y: e.offsetY,
            mass: 10
        });
    
        drawBlackholes();
    });
});

window.addEventListener("resize", () => {
    if (canvas) {
        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth;
    }
});

function drawBlackholes() {
    ctx.fillStyle = "white";
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "black";

    for (let i = 0; i < blackholes.length; i++) {
        ctx.beginPath();

        ctx.ellipse(blackholes[i].x, blackholes[i].y, blackholes[i].mass, blackholes[i].mass, 0, 0, 2 * Math.PI);

        ctx.fill();
    }
}

