/** @type {HTMLCanvasElement} */
var canvas
/** @type {CanvasRenderingContext2D} */
var ctx; // screams in js i hate this

window.addEventListener("load", () => {
    canvas = document.createElement("canvas");

    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    document.body.appendChild(canvas);

    ctx = canvas.getContext("2d");

    addEventListeners(canvas);

    addBlackhole({
        x: 0, y: 0
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
