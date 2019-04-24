class InputParser {
    constructor() {
        // one or more alphanumeric symbols, separated by commas
        // no comma before first symbol nor after last symbol
        this.dieValidationRegex = /^([\s\w]+,)*[\s\w]+$/;
    }

    validateDieInput(dieInput) { 
        return this.dieValidationRegex.test(dieInput)
    }

    parseDieInput(dieInput) {
        dieInput = dieInput.trim("");
        
        if (!this.validateDieInput(dieInput)){
            return(null)
        }

        dieInput = dieInput.split(",");
        let trimmedInput = dieInput.map(x => x.trim())
        return(trimmedInput)
    }
}


module.exports = InputParser
