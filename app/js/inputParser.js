class InputParser {
    parseDieInput(dieInput) {
        let splitInput = dieInput.split(",");
        let trimmedInput = splitInput.map(x => x.trim())
        return(trimmedInput)
    }
}


module.exports = InputParser
