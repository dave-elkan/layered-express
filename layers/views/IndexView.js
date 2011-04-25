var AbstractView = require('./AbstractView');

IndexView = function() {};

IndexView.prototype = new AbstractView();

IndexView.prototype.getTemplate = function() {
    return "index.jade";
};

module.exports = IndexView;