var View = require('./AbstractView');

BlankView = function() {};

BlankView.prototype = new AbstractView();

BlankView.prototype.getTemplate = function() {
    return "blank.jade";
};

module.exports = BlankView;