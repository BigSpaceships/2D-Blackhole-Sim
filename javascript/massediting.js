/** @type {HTMLInputElement} */
var massInputElement;

/** @type {HTMLDivElement} */
var massInputDiv;

/** @type {Number} */
var loadedHole;

window.addEventListener("load", () => {
    massInputDiv = document.getElementById("mass-selector")
    massInputElement = document.getElementById("mass-input")
    
    massInputElement.addEventListener("input", (e) => {
        var newMass = getMassFromDisplay(parseFloat(massInputElement.value));

        console.log(newMass)

        if (loadedHole != -1) {
            blackholes[loadedHole].mass = newMass;
        }
    })
});

/**
 * @param {Number} loadedHole
 */
function loadHole(hole) {
    massInputDiv.classList.remove(...massInputDiv.classList)
    massInputDiv.classList.add("show")

    loadedHole = hole;

    massInputElement.value = getMassDisplayNumber(blackholes[loadedHole].mass);
}
