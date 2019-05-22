const inlineSVG = require("inline-svg");
const remote = require("electron").remote;

const Controller = require("./controller/controller.js");
const Model = require("./model/model.js");
const View = require("./view/view.js");
const InputParser = require("./inputParser.js");

document.addEventListener("DOMContentLoaded", initialize);

function initialize() {
    document.querySelector(".close").addEventListener("click", function (e) {
        var window = remote.getCurrentWindow();
        window.close();
   }); 

    var inputParser = new InputParser();
    var model = new Model(inputParser);
    var view = new View(model);
    var controller = new Controller(view, model);

    // Activate tooltips
    $('[data-toggle="tooltip"]').tooltip();
    // Inline SVG
    inlineSVG.init({
        svgSelector: "img.button-icon"
    });

    controller.init();
}
