import './style.css'
import { addEventListeners } from './eventlisteners';
import { drawBlackholes, setupBlackholes } from './blackholes';

/** @type {HTMLCanvasElement} */
var canvas
/** @type {CanvasRenderingContext2D} */
var ctx; // screams in js i hate this

window.addEventListener("load", () => {
    setupBlackholes();

    canvas = document.createElement("canvas");

    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    document.getElementById("app").appendChild(canvas);

    ctx = canvas.getContext("2d");

    addEventListeners(canvas);

    console.log("render");

    render();
});

window.addEventListener("resize", () => {
    if (canvas) {
        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth;
    }
});

function render() {
    if (ctx == undefined) {
        console.error("ctx is undefined");
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBlackholes(ctx);

    requestAnimationFrame(render);
}
