const EventDispatcher = require("../eventDispatcher.js");
const Die = require("./die.js");

const DEFAULT_EXPERIMENT_ROLLS = 100000;

class GameModel {
    constructor(inputParser) {
        // Dependencies
        this.inputParser = inputParser;
        // Events
        this.dieAddedEvent = new EventDispatcher(this);
        this.invalidDieInputEvent = new EventDispatcher(this);
        this.experimentEndEvent = new EventDispatcher(this);

        this.dice_list = [];
        this.results = [];
        this.experimentRolls = DEFAULT_EXPERIMENT_ROLLS;
    }

    addDie(args) {
        var parsedFaces = this.inputParser.parseDieInput(args.dieFaces);

        if (parsedFaces === null) {
            this.invalidDieInputEvent.notify();
        } else {
            var die = new Die(parsedFaces);
            this.dice_list.push(die);
            var dieLi = document.createElement("li");
            dieLi.innerHTML = parsedFaces;
            dieLi.classList.add("list-group-item");
            this.dieAddedEvent.notify({
                dieItem: dieLi
            });
        }
    }

    restartResults() {
        this.results = [];
    }

    rollExperiment() {
        this.restartResults();

        var rollPromise = new Promise(
            (resolve, reject) => {
                for (let i = 0; i < this.experimentRolls; i++)
                {
                    this.results.push(this.rollDice());
                }
                resolve();
            }
        );
        rollPromise.then(() => this.experimentEndEvent.notify());
    }

    rollDice() {
        var roll = [];
        this.dice_list.forEach(
            function(dice) {
                roll.push(dice.roll());
        });
        return roll;
    }

    saveResults(){
        // Newline is needed after each row
        let csvContent = "";
        this.results.forEach(function(rowArray){
            let row = rowArray.join(",");
            csvContent += row + "\r\n";
        }); 
        
        // TODO fix out of memory crash when experiment is too large
        let csvBlob = new Blob([csvContent], { 
            type : "application/csv;charset=utf-8;" 
        }); 

        var csvUrl = URL.createObjectURL(csvBlob);
        var link = document.createElement("a");
        link.setAttribute("href", csvUrl);
        link.setAttribute("download", "my_data.csv");
        link.click();
    }
}

module.exports = GameModel;
