class Die {
    constructor (faces_list) {
        this.faces_list = faces_list
    }

    roll() {
        var number = Math.floor(Math.random() * this.faces_list.length)
        return(this.faces_list[number])
    }
}

module.exports = Die
