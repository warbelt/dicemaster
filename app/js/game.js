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
}

module.exports = Game
