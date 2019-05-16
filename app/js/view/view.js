const EventDispatcher = require("../eventDispatcher.js");

class GameView {
    constructor(model) {
        this.model = model;
        this.addDieEvent = new EventDispatcher(this);
        this.rollAllEvent = new EventDispatcher(this);
        this.saveResultsEvent = new EventDispatcher(this);
    }

    init() {
        this.createChildren();
        this.setupHandlers();
        this.enable();
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
        this.addDieToListHandler = this.addDieToList.bind(this);

        this.addDieToListHandler = this.addDieToList.bind(this);
        this.notifyInvalidDieHandler = this.notifyInvalidDie.bind(this);
        this.enableRollExperimentHandler = this.enableRollExperiment.bind(this);
        this.enableSaveResultsHandler = this.enableSaveResults.bind(this);

    }

    enable() {
        this.dom_addDieButton.addEventListener("click", this.addDieButtonHandler);
        this.dom_rollExperimentButton.addEventListener("click", this.rollExperimentButtonHandler);
        this.dom_saveResultsButton.addEventListener("click", this.saveResultsButtonHandler);

        this.model.dieAddedEvent.attach(this.addDieToListHandler);
        this.model.invalidDieInputEvent.attach(this.notifyInvalidDieHandler);
        this.model.experimentEndEvent.attach(this.enableRollExperimentHandler);
        this.model.experimentEndEvent.attach(this.enableSaveResultsHandler);
    }

    addDieButton() {
        this.addDieEvent.notify({
            dieFaces: this.dom_faces.value
        });
    }

    rollExperimentButton() {
        this.dom_rollExperimentButton.setAttribute("disabled", true);
        $("#rollExperimentButton").tooltip("show");
        
        this.rollAllEvent.notify({});
    }

    saveResultsButton() {
        this.saveResultsEvent.notify({});
    }

    addDieToList(args) {
        this.dom_diceList.appendChild(args.dieItem);
    }

    notifyInvalidDie() {
        $("#newDieFaces").tooltip("show");
        setTimeout(() => $("#newDieFaces").tooltip("hide"), 2000);
    }

    enableRollExperiment() {
        this.dom_rollExperimentButton.removeAttribute("disabled"); 
        $("#rollExperimentButton").tooltip("hide");
    }

    enableSaveResults() {
        this.dom_saveResultsButton.removeAttribute("disabled");
    }
}

module.exports = GameView;
