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

    canvas.addEventListener("mouseleave", mouseup);
    canvas.addEventListener("mouseout", mouseup);
}

/** 
    * @param {MouseEvent} e
    */
function mousedown(e) {
    const clickPos = transformCanvasToWorld({x: e.clientX, y: e.clientY});

    let index = getBlackhole(clickPos)

    if (e.ctrlKey) {
        removeBlackhole(index);
        activeHole = -1;

        return;
    }

    if (index !== undefined) {
        activeHole = index;
    } else {
        activeHole = addBlackhole(clickPos);
    }

    loadHole(activeHole);
}

/**
    * @param {MouseEvent} e
    */
function mousemove(e) {
    const clickPos = transformCanvasToWorld({x: e.clientX, y: e.clientY});

    if (activeHole != -1) {
        moveBlackhole(activeHole, clickPos);
    }
}

/** 
    * @param {MouseEvent} e
    */
function mouseup(e) {
    const clickPos = transformCanvasToWorld({x: e.clientX, y: e.clientY});

    if (activeHole != -1) {
        activeHole = -1;
    }
}
