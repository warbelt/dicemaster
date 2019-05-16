const Controller = require("./controller/controller.js");
const Model = require("./model/model.js");
const View = require("./view/view.js");
const InputParser = require("./inputParser.js");

document.addEventListener("DOMContentLoaded", initialize);

function initialize() {
    var inputParser = new InputParser();
    var model = new Model(inputParser);
    var view = new View(model);
    var controller = new Controller(view, model);

    // Activate tooltips
    $('[data-toggle="tooltip"]').tooltip();

    controller.init();
}
