var View = require('./View').View;

IndexView = function() {};

IndexView.prototype = new View();

IndexView.prototype.getTemplate = function() {
    return "index.jade";
};

exports.IndexView = IndexView;