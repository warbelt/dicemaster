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
        this.dieEditedEvent = new EventDispatcher(this);
        this.dieRemovedEvent = new EventDispatcher(this);

        this.dice_list = [];
        this.results = [];
        this.experimentRolls = DEFAULT_EXPERIMENT_ROLLS;
    }

    addDie(args) {
        var parsedFaces = this.inputParser.parseDieInput(args.dieFaces);

        if (parsedFaces === null) {
            this.invalidDieInputEvent.notify();
        } else {
            this.dice_list.push(this.createDie(parsedFaces));
            this.dieAddedEvent.notify();
        }
    }

    createDie(faces) {
        var die = new Die(faces);
        return die;
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
        
        let csvBlob = new Blob([csvContent], { 
            type : "application/csv;charset=utf-8;" 
        }); 

        var csvUrl = URL.createObjectURL(csvBlob);
        var link = document.createElement("a");
        link.setAttribute("href", csvUrl);
        link.setAttribute("download", "my_data.csv");
        link.click();
    }

    editDie(args) {
        if (args.index < this.dice_list.length) {
            // First parse die
            var parsedFaces = this.inputParser.parseDieInput(args.dieFaces);

            if (parsedFaces === null) {
                this.invalidDieInputEvent.notify();
            } else {
                this.dice_list[args.index] = this.createDie(parsedFaces);
                this.dieEditedEvent.notify();
            }
        }
    }

    removeDie(args) {
        if (args.index < this.dice_list.length) {
            this.dice_list.splice(args.index, 1);
        }
        this.dieRemovedEvent.notify();
    }

    saveDiceList() {
        // Newline is needed after each row
        let csvContent = "";
        this.dice_list.forEach(function(rowArray){
            let row = rowArray.faces_list.join(",");
            csvContent += row + "\r\n";
        }); 
        
        let csvBlob = new Blob([csvContent], { 
            type : "application/csv;charset=utf-8;" 
        }); 

        var csvUrl = URL.createObjectURL(csvBlob);
        var link = document.createElement("a");
        link.setAttribute("href", csvUrl);
        link.setAttribute("download", "my_dice.csv");
        link.click();
    }

    loadDiceList() {
        var input = document.createElement('input');
        input.type = 'file';

        input.onchange = e => { 
            var file = e.target.files[0];
            var reader = new FileReader();
            reader.readAsText(file,'UTF-8');
         
            reader.onload = readerEvent => {
                var content = readerEvent.target.result;
                content.split("\n").forEach(faces => 
                    this.addDie({
                        dieFaces: faces 
                    })
                );
            };
         };
         
        input.click();
        
    }
}

module.exports = GameModel;
