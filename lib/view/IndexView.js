var View = require('./View');

IndexView = function() {};

IndexView.prototype = new View();

IndexView.prototype.getTemplate = function() {
    return "index.jade";
};

module.exports = IndexView;