import { addBlackhole } from "./blackholes";

/**
    * Adds required event listeners to a canvas
    * @param {HTMLCanvasElement} canvas
    */
export function addEventListeners(canvas) {
    canvas.addEventListener("mousedown", mousedown);
    
    canvas.addEventListener("mousemove", mousemove);

    canvas.addEventListener("mouseup", mouseup);
}

/** 
    * @param {MouseEvent} e
    */
function mousedown(e) {
    addBlackhole(e.offsetX, e.offsetY);
}

/**
    * @param {MouseEvent} e
    */
function mousemove(e) {
}

/** 
    * @param {MouseEvent} e
    */
function mouseup(e) {
}
