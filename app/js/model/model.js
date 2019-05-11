const Game = require("../model/game.js");
const InputParser = require("../inputParser.js");
EventDispatcher = require("../eventDispatcher.js");

class Model {
    constructor() {
        this.game = new Game();
        this.inputParser = new InputParser();

        this.addDieEvent = new EventDispatcher(this);
    }

    addDie(args) {
        var parsedFaces = this.inputParser.parseDieInput(args.dieFaces);

        if (parsedFaces === null) {
            $("#newDieFaces").tooltip("show");
            setTimeout(() => $("#newDieFaces").tooltip("hide"), 2000);
        } else {
            this.game.addDie(parsedFaces);
            var dieLi = document.createElement("li");
            dieLi.innerHTML = parsedFaces;
            dieLi.classList.add("list-group-item");
            this.addDieEvent.notify({
                dieItem: dieLi
            });
        }
    }

    rollExperiment() {
        this.rollExperimentButton.setAttribute("disabled", true);
        $("#rollExperimentButton").tooltip("show");
        this.game.rollExperiment();
            // .then(function() {
            //     this.rollExperimentButton.removeAttribute("disabled"); 
            //     $("#rollExperimentButton").tooltip("hide");
            // });
    }

    saveResults() {
        this.game.saveResults();
    }


}

module.exports = Model;
