class Controller {
    constructor(view, model) {
        this.view = view;
        this.model = model;
    }

    init() {
        this.view.init();
        this.setupHandlers();
        this.enable();
    }

    setupHandlers() {
        this.addDieHandler = this.addDie.bind(this);
        this.rollExperimentHandler = this.rollExperiment.bind(this);
        this.saveResultsHandler = this.saveResults.bind(this);
        this.editDieHandler = this.editDie.bind(this);
        this.removeDieHandler = this.removeDie.bind(this);
        this.saveDiceListHandler = this.saveDiceList.bind(this);
        this.loadDiceListHandler = this.loadDiceList.bind(this);
    }

    enable() {
        this.view.addDieEvent.attach(this.addDieHandler);
        this.view.rollAllEvent.attach(this.rollExperimentHandler);
        this.view.saveResultsEvent.attach(this.saveResultsHandler);
        this.view.editDieEvent.attach(this.editDieHandler);
        this.view.removeDieEvent.attach(this.removeDieHandler);
        this.view.saveDiceListEvent.attach(this.saveDiceListHandler);
        this.view.loadDiceListEvent.attach(this.loadDiceListHandler);

    }

    addDie(args) {
        this.model.addDie(args);
    }

    rollExperiment() {
        this.model.rollExperiment();
    }

    saveResults() {
        this.model.saveResults();
    }

    editDie(args) {
        this.model.editDie(args);
    }

    removeDie(args) {
        this.model.removeDie(args);
    }

    saveDiceList(args) {
        this.model.saveDiceList();
    }

    loadDiceList(args) {
        this.model.loadDiceList();
    }
}

module.exports = Controller;
