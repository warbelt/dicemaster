const EventDispatcher = require("../eventDispatcher.js");

class GameView {
    constructor(model) {
        this.model = model;
        this.addDieEvent = new EventDispatcher(this);
        this.editDieEvent = new EventDispatcher(this);
        this.removeDieEvent = new EventDispatcher(this);
        this.rollAllEvent = new EventDispatcher(this);
        this.saveResultsEvent = new EventDispatcher(this);
        this.saveDiceListEvent = new EventDispatcher(this);
        this.loadDiceListEvent = new EventDispatcher(this);
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
        this.dom_editDieButton = document.querySelector("#editDieButton");
        this.dom_removeDieButton = document.querySelector("#removeDieButton");
        this.dom_rollExperimentButton = document.querySelector("#rollExperimentButton");
        this.dom_saveResultsButton = document.querySelector("#saveResultsButton");
        this.dom_saveDiceListButton = document.querySelector("#saveDiceListButton");
        this.dom_loadDiceListButton = document.querySelector("#loadDiceListButton");

    }

    setupHandlers() {
        this.addDieButtonHandler = this.addDieButton.bind(this);
        this.editDieButtonHandler = this.editDieButton.bind(this);
        this.removeDieButtonHandler = this.removeDieButton.bind(this);

        this.rollExperimentButtonHandler = this.rollExperimentButton.bind(this);
        this.saveResultsButtonHandler = this.saveResultsButton.bind(this);
        this.renderDiceListHandler = this.renderDiceList.bind(this);

        this.saveDiceListButtonHandler = this.saveDiceListButton.bind(this);
        this.loadDiceListButtonHandler = this.loadDiceListButton.bind(this);

        // Coming from model
        this.notifyInvalidDieHandler = this.notifyInvalidDie.bind(this);
        this.enableRollExperimentHandler = this.enableRollExperiment.bind(this);
        this.enableSaveResultsHandler = this.enableSaveResults.bind(this);
        this.toggleDieSelectionHandler = this.toggleDieSelection.bind(this);
        this.dieAddedHandler = this.dieAdded.bind(this);
        this.dieEditedHandler = this.dieEdited.bind(this);
        this.dieRemovedHandler = this.dieRemoved.bind(this);
    }

    enable() {
        this.dom_addDieButton.addEventListener("click", this.addDieButtonHandler);
        this.dom_editDieButton.addEventListener("click", this.editDieButtonHandler);
        this.dom_removeDieButton.addEventListener("click", this.removeDieButtonHandler);

        this.dom_rollExperimentButton.addEventListener("click", this.rollExperimentButtonHandler);
        this.dom_saveResultsButton.addEventListener("click", this.saveResultsButtonHandler);

        this.dom_saveDiceListButton.addEventListener("click", this.saveDiceListButtonHandler);
        this.dom_loadDiceListButton.addEventListener("click", this.loadDiceListButtonHandler);

        this.model.dieAddedEvent.attach(this.dieAddedHandler);
        this.model.invalidDieInputEvent.attach(this.notifyInvalidDieHandler);
        this.model.experimentEndEvent.attach(this.enableRollExperimentHandler);
        this.model.experimentEndEvent.attach(this.enableSaveResultsHandler);
        this.model.dieEditedEvent.attach(this.dieEditedHandler);
        this.model.dieRemovedEvent.attach(this.dieRemovedHandler);
    }

    addDieButton() {
        this.addDieEvent.notify({
            dieFaces: this.dom_faces.value
        });
    }

    editDieButton() {
        var selectedNodes = this.dom_diceList.querySelectorAll(".active");
        if (selectedNodes.length != 1) {
            throw new RangeError();
        }
        else {
            let element = selectedNodes[0];
            let idx = Array.from(element.parentNode.children).indexOf(element);

            this.editDieEvent.notify({
                index: idx,
                dieFaces: this.dom_faces.value
            });
        }
    }

    removeDieButton() {
        var selectedNodes = this.dom_diceList.querySelectorAll(".active");
        if (selectedNodes.length != 1) {
            throw new RangeError();
        }
        else {
            let element = selectedNodes[0];
            let idx = Array.from(element.parentNode.children).indexOf(element);

            this.removeDieEvent.notify({
                index: idx
            });
        }
    }

    rollExperimentButton() {
        this.dom_rollExperimentButton.setAttribute("disabled", true);
        $("#rollExperimentButton").tooltip("show");
        
        this.rollAllEvent.notify({});
    }

    saveResultsButton() {
        this.saveResultsEvent.notify({});
    }

    saveDiceListButton() {
        this.saveDiceListEvent.notify({});
    }

    loadDiceListButton() {
        this.loadDiceListEvent.notify({});        
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

    toggleDieSelection(ev) {
        var button = ev.target;
        if (button.classList.contains("active")) {
            button.classList.remove("active");
            this.dom_editDieButton.setAttribute("disabled", true);
            this.dom_removeDieButton.setAttribute("disabled", true);
        }
        else {
            button.parentElement.querySelectorAll("li").forEach(
                node => node.classList.remove("active")
            );
            button.classList.add("active");
            this.dom_faces.value = button.innerHTML;
            this.dom_editDieButton.removeAttribute("disabled");
            this.dom_removeDieButton.removeAttribute("disabled");
        }
    }

    dieAdded() {
        this.renderDiceListHandler();
    }

    dieEdited() {
        this.renderDiceListHandler();
    }

    dieRemoved() {
        this.renderDiceListHandler();
    }

    renderDiceList() {
        // Empty dice list
        while (this.dom_diceList.firstElementChild !== null) {
            this.dom_diceList.removeChild(this.dom_diceList.firstElementChild);
        }

        // Disable edit/remove buttons
        this.dom_editDieButton.setAttribute("disabled", true);
        this.dom_removeDieButton.setAttribute("disabled", true);
        
        // Add every die from dice list
        this.model.dice_list.forEach(die => {
            let dieLi = document.createElement("li");
            dieLi.innerHTML = die.faces_list;
            dieLi.classList.add("list-group-item", "list-group-item-action", "text-truncate");
            dieLi.addEventListener("click", this.toggleDieSelectionHandler);

            this.dom_diceList.appendChild(dieLi);

            // If list item has overflown content, add tooltip
            if (dieLi.scrollHeight > dieLi.clientHeight || 
                dieLi.scrollWidth > dieLi.clientWidth) 
            {
                dieLi.setAttribute("data-toggle", "tooltip");
                dieLi.setAttribute("data-placement", "top");
                dieLi.setAttribute("title", die.faces_list);
            }              
        });
    }
}

module.exports = GameView;
