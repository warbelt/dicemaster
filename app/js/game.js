const Die = require("./die.js")


class Game {
    constructor() {
        this.dice_list = []
        this.results = []
    }

    restartResults() {
        this.results = []
    }

    addDie(faces_list) {
        var die = new Die(faces_list)
        this.dice_list.push(die)
    }

    getDiceList() {
        for (var dice in this.dice_list) {
            console.log(dice)
        }
    }

    rollExperiment(rolls){
        this.restartResults()
        for (let i = 0; i < rolls; i++)
        {
            this.rollDice()
        }
    }

    rollDice() {
        var roll = []
        this.dice_list.forEach(
            function(dice) {
                roll.push(dice.roll())
        })
        this.results.push(roll)
    }

    getResults() {
        return this.results
    }

    saveResults(){
        let csvContent = "data:text/csv;charset=utf-8,";
        this.results.forEach(function(rowArray){
            let row = rowArray.join(",");
            csvContent += row + "\r\n";
        }); 
            
        var encodedUri = encodeURI(csvContent);
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "my_data.csv");

        link.click();
    }
}


module.exports = Game
