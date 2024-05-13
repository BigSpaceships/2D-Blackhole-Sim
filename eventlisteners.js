/** 
    * Hole that is being moved
    * @type {Number}
    */
var activeHole = -1;

/**
    * Adds required event listeners to a canvas
    * @param {HTMLCanvasElement} canvas
    */
function addEventListeners(canvas) {
    canvas.addEventListener("mousedown", mousedown);

    canvas.addEventListener("mousemove", mousemove);

    canvas.addEventListener("mouseup", mouseup);
}

/** 
    * @param {MouseEvent} e
    */
function mousedown(e) {
    const clickPos = transformCanvasToWorld({x: e.offsetX, y: e.offsetY});

    let index = getBlackhole(clickPos)

    if (index) {
        activeHole = index;
    } else {
        addBlackhole(clickPos);
    }
}

/**
    * @param {MouseEvent} e
    */
function mousemove(e) {
    const clickPos = transformCanvasToWorld({x: e.offsetX, y: e.offsetY});

    if (activeHole != -1) {
        moveBlackhole(activeHole, clickPos);
    }
}

/** 
    * @param {MouseEvent} e
    */
function mouseup(e) {
    const clickPos = transformCanvasToWorld({x: e.offsetX, y: e.offsetY});

    if (activeHole != -1) {
        moveBlackhole(activeHole, clickPos);

        activeHole = -1;
    }
}
