import './style.css'
import { addEventListeners } from './eventlisteners';
import { addBlackhole, drawBlackholes, setupBlackholes } from './blackholes';

/** @type {HTMLCanvasElement} */
export var canvas
/** @type {CanvasRenderingContext2D} */
export var ctx; // screams in js i hate this

window.addEventListener("load", () => {
    setupBlackholes();

    canvas = document.createElement("canvas");

    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    document.getElementById("app").appendChild(canvas);

    ctx = canvas.getContext("2d");

    addEventListeners(canvas);

    addBlackhole({
        pos: { x: 0, y: 0 }
    })

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
