var View = require('./View');

BlankView = function() {};

BlankView.prototype = new View();

BlankView.prototype.getTemplate = function() {
    return "blank.jade";
};

module.exports = BlankView;