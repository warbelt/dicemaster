EventDispatcher = require("../eventDispatcher.js");

class GameView {
    constructor() {
        this.addDieEvent = new EventDispatcher(this);
        this.rollAllEvent = new EventDispatcher(this);
        this.saveResultsEvent = new EventDispatcher(this);
    }

    init() {
        this.createChildren();
        this.setupHandlers();
        this.attachListeners();
    }
 
    createChildren() {
        this.dom_faces = document.querySelector("#newDieFaces");
        this.dom_diceList = document.querySelector("#diceListUl");
        this.dom_addDieButton = document.querySelector("#addDieButton");
        this.dom_rollExperimentButton = document.querySelector("#rollExperimentButton");
        this.dom_saveResultsButton = document.querySelector("#saveResultsButton");
    }

    setupHandlers() {
        this.addDieButtonHandler = this.addDieButton.bind(this);
        this.rollExperimentButtonHandler = this.rollExperimentButton.bind(this);
        this.saveResultsButtonHandler = this.saveResultsButton.bind(this);
        this.addDieToListHandler = this.addDieToList.bind(this)
    }

    attachListeners() {
        this.dom_addDieButton.addEventListener("click", this.addDieButtonHandler);
        this.dom_rollExperimentButton.addEventListener("click", this.rollExperimentButtonHandler);
        this.dom_saveResultsButton.addEventListener("click", this.saveResultsButtonHandler);
    }

    addDieButton() {
        this.addDieEvent.notify({
            dieFaces: this.dom_faces.value
        });
    }

    rollExperimentButton() {
        this.rollAllEvent.notify({});
    }

    saveResultsButton() {
        this.saveResultsEvent.notify({});
    }

    addDieToList(args) {
        this.dom_diceList.appendChild(args.dieItem);
    }
}

module.exports = GameView;
