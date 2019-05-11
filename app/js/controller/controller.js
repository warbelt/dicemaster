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
        this.addDieToListHandler = this.addDieToList.bind(this);
    }

    enable() {
        this.view.addDieEvent.attach(this.addDieHandler);
        this.view.rollAllEvent.attach(this.rollExperimentHandler);
        this.view.saveResultsEvent.attach(this.saveResultsHandler);

        this.model.addDieEvent.attach(this.addDieToListHandler);
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

    addDieToList(args) {
        this.view.addDieToListHandler(args);
    }
}

module.exports = Controller;
