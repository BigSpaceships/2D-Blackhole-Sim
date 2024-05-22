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

const posStep = .1;

/**
 * @param {Vector} pos
 * @param {Vector} velocity
 */
function drawPhoton(pos, velocity) {
    ctx.strokeStyle = "black";
    ctx.beginPath();

    const canvasStart = transformWorldToCanvas(pos);

    ctx.moveTo(canvasStart.x, canvasStart.y);

    for (let t = 0; t < 4000; t++) {
        var acceleration = calculateAcceleration(pos, velocity);

        velocity.x += acceleration.x;
        velocity.y += acceleration.y;

        velocity = normalized(velocity)

        pos.x += velocity.x * posStep;
        pos.y += velocity.y * posStep;

        if (isNaN(pos.x)) {
            break;
        }

        const transformedPos = transformWorldToCanvas(pos)

        ctx.lineTo(transformedPos.x, transformedPos.y);

        if (inBlackholes(pos)) {
            break;
        }
    }

    ctx.stroke();
}

function render() {
    if (ctx == undefined) {
        console.error("ctx is undefined");
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBlackholes(ctx);

    const numLines = 200;

    for (let i = 0; i < numLines; i++) {
        var pos = {
            x: 0 + 40 / numLines * 2 * Math.floor(i / 2),
            y: 0,
        }

        pos.x = 6;

        var beta = Math.PI * 2 / numLines * i;
        // beta = Math.PI / 2 * (i % 2 * 2 - 1)
        
        var velocity = {
            x: Math.cos(beta),
            y: Math.sin(beta),
        };

        drawPhoton(pos, velocity)
    }


    requestAnimationFrame(render);
}