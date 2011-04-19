var View = require('./View');

BookView = function() {};

BookView.prototype = new View();

BookView.prototype.getType = function() {
    return "book";
};

BookView.prototype.getTemplate = function() {
    return "book.jade";
};

module.exports = BookView;