/** @type {HTMLCanvasElement} */
var canvas
/** @type {CanvasRenderingContext2D} */
var ctx; // screams in js i hate this
/** @type {HTMLElement} */
var canvasContainer;

/** @type {Number} */
var width;
/** @type {Number} */
var height;

window.addEventListener("load", () => {
    canvas = document.createElement("canvas");

    canvasContainer = document.getElementById("canvas-container");

    height = canvasContainer.clientHeight;
    width = canvasContainer.clientWidth;

    canvas.height = height;
    canvas.width = width;

    canvasContainer.appendChild(canvas);

    ctx = canvas.getContext("2d");

    addEventListeners(canvas);

    addBlackhole({
        x: 0, y: 0
    })

    render();
});

window.addEventListener("resize", () => {
    if (canvas) {
        height = canvasContainer.clientHeight;
        width = canvasContainer.clientWidth;

        canvas.height = height;
        canvas.width = width;
    }
});

const posStep = .1;

/**
 * @param {Vector} pos
 * @param {Vector} velocity
 * @returns {Number[]} points on the line
 */
function drawPhoton(pos, velocity) {
    const result = [];

    const canvasStart = transformWorldToCanvas(pos);

    result.push(canvasStart.x, canvasStart.y);

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

        result.push(transformedPos.x, transformedPos.y);

        if (inBlackholes(pos)) {
            break;
        }

        if (transformedPos.x <= -canvasBoundsCheckScale * width || transformedPos.x >= (1 + canvasBoundsCheckScale) * width
            || transformedPos.y <= -canvasBoundsCheckScale * height || transformedPos.y >= (1 + canvasBoundsCheckScale) * height) {
            break;
        }
    }

    return result;
}

var mathTime = 0;
var drawTime = 0;
var lineLength = 0;

var renderCount = 0;

function render() { // TODO: move to web worker
    if (ctx == undefined) {
        console.error("ctx is undefined");
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBlackholes(ctx);

    const numLines = 360;

    for (let i = 0; i < numLines; i++) {
        const startTime = new Date().getTime();
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

        var points = drawPhoton(pos, velocity);

        var pointsTime = new Date().getTime();

        ctx.strokeStyle = "lightyellow";
        ctx.beginPath();

        ctx.moveTo(points[0], points[1])

        for (let i = 2; i < points.length; i += 2) {
            ctx.lineTo(points[i], points[i + 1]);
        }

        ctx.stroke();

        var individualDrawTime = new Date().getTime();

        lineLength = (lineLength * renderCount + points.length / 2) / (renderCount + 1);
        mathTime = (mathTime * renderCount + (pointsTime - startTime)) / (renderCount + 1);
        drawTime = (drawTime * renderCount + (individualDrawTime - pointsTime)) / (renderCount + 1);

        renderCount++;
    }

    console.log(`Math: ${mathTime * numLines}ms, Draw: ${drawTime * numLines}ms, Points: ${lineLength}`)

    requestAnimationFrame(render);
}