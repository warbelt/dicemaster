const Game = require("./game.js");
const InputParser = require("./inputParser.js");

var game;
var inputParser;

document.addEventListener("DOMContentLoaded", initialize);

function initialize() {
    game = new Game();
    inputParser = new InputParser();

    // Activate tooltips
    $('[data-toggle="tooltip"]').tooltip();

    attachListeners();
}

function attachListeners(){
    // Click on Add Die
    addDieButton = document.querySelector("#addDieButton");
    addDieButton.addEventListener("click", function(){
        faces = document.querySelector("#newDieFaces");
        // TODO validate input before adding and updating list
        parsedFaces = inputParser.parseDieInput(faces.value);

        if (parsedFaces === null) {
            $("#newDieFaces").tooltip("show");
            setTimeout(() => $("#newDieFaces").tooltip("hide"), 2000);
        } else {
            game.addDie(parsedFaces);
            diceList = document.querySelector("#diceListUl");
            var dieLi = document.createElement("li");
            dieLi.innerHTML = parsedFaces;
            dieLi.classList.add("list-group-item");
            diceList.appendChild(dieLi);
        }
    });

    // Click on Roll Experiment
    rollExperimentButton = document.querySelector("#rollExperimentButton");
    rollExperimentButton.addEventListener("click", function() {
        rollExperimentButton.setAttribute("disabled", true);
        $("#rollExperimentButton").tooltip("show");
        game.rollExperiment()
            .then(function() {
                rollExperimentButton.removeAttribute("disabled"); 
                $("#rollExperimentButton").tooltip("hide");
            });
    });

    // Click on Save Results
    saveResultsButton = document.querySelector("#saveResultsButton");
    saveResultsButton.addEventListener("click", () => game.saveResults());
}
