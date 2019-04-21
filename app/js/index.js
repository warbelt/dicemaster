const Game = require("./game.js")
const InputParser = require("./inputParser.js")

var game;
var inputParser;

document.addEventListener("DOMContentLoaded", initialize);

function initialize() {
    game = new Game();
    inputParser = new InputParser();

    attachListeners();
}

function attachListeners(){
    // Click on Add Die
    addDieButton = document.querySelector("#addDieButton");
    addDieButton.addEventListener("click", function(){
        faces = document.querySelector("#newDieFaces");
        game.addDie(inputParser.parseDieInput(faces.value));

    })

    // Click on Roll Experiment
    rollExperimentButton = document.querySelector("#rollExperimentButton");
    rollExperimentButton.addEventListener("click", function() {
        rollExperimentButton.setAttribute("disabled", true);
        game.rollExperiment()
            .then(() => rollExperimentButton.removeAttribute("disabled"));
    })

    // Click on Save Results
    saveResultsButton = document.querySelector("#saveResultsButton");
    saveResultsButton.addEventListener("click", () => game.saveResults())
}


