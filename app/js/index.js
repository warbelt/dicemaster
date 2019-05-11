const Controller = require("./controller/controller.js");
const Model = require("./model/model.js");
const View = require("./view/view.js");

var controller;

document.addEventListener("DOMContentLoaded", initialize);

function initialize() {
    var view = new View();
    var model = new Model();
    var controller = new Controller(view, model);

    // Activate tooltips
    $('[data-toggle="tooltip"]').tooltip();

    controller.init();
}
