const Game = require("./game.js")


game = new Game()
game.addDie(["mapache", "mapache", "perro", "gato", "ganso", "ganso"])
game.addDie(["gato", "perro", "perro", "perro", "perro", "perro"])

var tiradas = 10000
for (i = 0; i < tiradas; i++)
{
    game.rollDice()
}